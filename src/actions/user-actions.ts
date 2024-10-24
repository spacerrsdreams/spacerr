"use server";

import { Prisma } from "@prisma/client";
import { addHours, addMinutes, isBefore } from "date-fns";
import { AuthError } from "next-auth";
import { v4 as uuidv4 } from "uuid";

import { siteConfig } from "@/config/siteConfig";
import { signIn, signOut } from "@/lib/auth";
import { db } from "@/lib/db";
import { type CustomErrorType } from "@/lib/error";
import { resend } from "@/lib/resend";
import { routes } from "@/lib/routes";
import { hashPassword } from "@/lib/utils";
import {
  recoverPasswordSchema,
  resetPasswordSchema,
  signUpFormSchema,
} from "@/components/auth/schema";
import SpacerrResetPasswordEmail from "@/components/emails/SpacerrResetPasswordEmail";
import VerifyEmail from "@/components/emails/VerifyEmail";

export const sendEmailVerification = async (email: string) => {
  const token = uuidv4();
  const expires = addMinutes(new Date(), 60);

  await db.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  const verifyEmailLink = `https://${process.env.VERCEL_URL}/auth/verify-email?token=${token}&email=${email}`;

  return resend.emails.send({
    from: `${siteConfig.name} <onboarding@resend.dev>`,
    to: email,
    subject: "Verify Your Email Address",
    react: VerifyEmail({
      verifyEmailLink,
    }),
  });
};

export const verifyEmail = async (token: string, email: string) => {
  try {
    await db.$transaction(async (prisma) => {
      const verificationToken = await prisma.verificationToken.findUnique({
        where: {
          identifier_token: {
            identifier: email,
            token: token,
          },
        },
      });

      if (!verificationToken) {
        return "Invalid Token";
      }

      if (isBefore(verificationToken.expires, new Date())) {
        return "Verification Link Expired";
      }

      await prisma.user.update({
        where: { email: verificationToken.identifier },
        data: { emailVerified: new Date() },
      });

      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: email,
            token: token,
          },
        },
      });
    });

    return "success";
  } catch (error) {
    console.error("Email verification failed:", error);
    return "Email verification failed";
  }
};

export async function authenticate(_: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirectTo: routes.root,
    });

    return "success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          if ((error.cause?.type as CustomErrorType) === "EmailVerificationError") {
            return "EmailVerificationError";
          }
          return "Invalid Credentials";
        default:
          return "Invalid Credentials";
      }
    }

    throw error;
  }
}

export const signUpUser = async (_: string | undefined, formData: FormData) => {
  try {
    const credentials = signUpFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"),
      name: formData.get("name"),
    });

    if (!credentials.success) {
      return credentials.error.errors?.[0]?.message;
    }

    const { email, password, name } = credentials.data;

    const hashedPassword = await hashPassword(password);

    await db.user.create({
      data: {
        email,
        hashedPassword,
        name,
      },
    });

    const { error } = await sendEmailVerification(email);

    if (error) {
      console.error(error);
      throw new Error("UnknownError");
    }

    return "success";
  } catch (error) {
    if (error instanceof AuthError) {
      console.error(error);
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid Credentials";
        default:
          return "Invalid Credentials";
      }
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(error);
      if (error.code === "P2002") {
        return "User with this email already exists";
      }
    }

    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    await signIn("google", { redirectTo: routes.root });
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  await signOut({ redirectTo: routes.root });
};

export const sendPasswordRecoveryEmail = async (_: string | undefined, formData: FormData) => {
  try {
    const credentials = recoverPasswordSchema.safeParse({ email: formData.get("email") });

    if (!credentials.success) {
      return credentials.error.errors?.[0]?.message;
    }

    const { email } = credentials.data;

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return "Invalid Credentials";
    }

    const token = uuidv4();
    const expires = addHours(new Date(), 1);

    await db.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    const resetPasswordLink = `https://${process.env.VERCEL_URL}/auth/reset-password?token=${token}&email=${email}`;

    const { error } = await resend.emails.send({
      from: `${siteConfig.name} <onboarding@resend.dev>`,
      to: email,
      subject: "Password Recovery",
      react: SpacerrResetPasswordEmail({
        userFirstname: user.name || "User",
        resetPasswordLink,
      }),
    });

    if (error) {
      console.error(error);
      return "Invalid Credentials";
    }

    return "success";
  } catch (error) {
    console.error(error);
    return "Invalid Credentials";
  }
};

export const resetPassword = async (_: string | undefined, formData: FormData) => {
  try {
    const credentials = resetPasswordSchema.safeParse({
      token: formData.get("token"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"),
      email: formData.get("email"),
    });

    if (!credentials.success) {
      return credentials.error.errors?.[0]?.message;
    }

    const { token, email, password } = credentials.data;

    const verificationToken = await db.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: email,
          token: token,
        },
      },
    });

    if (!verificationToken || verificationToken.expires < new Date()) {
      return "Reset Link Expired";
    }

    const hashedPassword = await hashPassword(password);

    await db.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { email: verificationToken.identifier },
        data: { hashedPassword },
      });

      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: email,
            token: token,
          },
        },
      });
    });

    return "success";
  } catch (error) {
    console.error(error);
    return "Invalid Credentials";
  }
};
