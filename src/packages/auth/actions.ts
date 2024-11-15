"use server";

import { signIn, signOut } from "@/packages/auth";
import {
  recoverPasswordSchema,
  resetPasswordSchema,
  signUpFormSchema,
} from "@/packages/auth/schemas";
import {
  createUser,
  findUserByEmail,
  findVerificationToken,
  storeEmailVerificationToken,
  updatePassword,
  verifyEmailVerificationToken,
} from "@/packages/prisma/actions";
import { sendEmailVerificationLink, sendPasswordResetEmailLink } from "@/packages/resend/actions";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";
import { v4 as uuidv4 } from "uuid";

import { type CustomErrorType } from "@/lib/error";
import { routes } from "@/lib/routes";

export const createTokenAndSendVeriticationLink = async (email: string) => {
  const token = uuidv4();

  await storeEmailVerificationToken(email, token);
  return await sendEmailVerificationLink(email, token);
};

export const verifyUserEmail = async ({ email, token }: { email: string; token: string }) => {
  try {
    await verifyEmailVerificationToken({ identifier: email, token });
    return "success";
  } catch (error) {
    console.error("Email verification failed:", error);
    return "failed";
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

    await createUser({ email, password, name });

    const { error } = await createTokenAndSendVeriticationLink(email);

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

export const sendPasswordRecoveryEmail = async (_: string | undefined, formData: FormData) => {
  try {
    const credentials = recoverPasswordSchema.safeParse({ email: formData.get("email") });

    if (!credentials.success) {
      return credentials.error.errors?.[0]?.message;
    }

    const { email } = credentials.data;
    const user = await findUserByEmail(email);

    if (!user) {
      return "Invalid Credentials";
    }

    const token = uuidv4();

    await storeEmailVerificationToken(email, token);
    const { error } = await sendPasswordResetEmailLink({
      email,
      token,
      name: user?.name || "User",
    });

    if (error) {
      console.error(error);
      return "Invalid Credentials";
    }

    return "success";
  } catch (err) {
    console.error(err);
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

    const verificationToken = await findVerificationToken(email, token);

    if (!verificationToken || verificationToken.expires < new Date()) {
      return "expired";
    }

    await updatePassword({ email, password, token, identifier: verificationToken.identifier });

    return "success";
  } catch (error) {
    console.error(error);
    return "Invalid Credentials";
  }
};
