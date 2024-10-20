"use server";

import { addHours } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import { siteConfig } from "@/config/siteConfig";
import { db } from "@/lib/db";
import { resend } from "@/lib/resend";
import { hashPassword } from "@/lib/utils";
import { recoverPasswordSchema, resetPasswordSchema } from "@/components/auth/schema";
import SpacerrResetPasswordEmail from "@/components/emails/SpacerrResetPasswordEmail";

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
      return "User not found";
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
      return "error";
    }

    return "success";
  } catch (error) {
    console.error(error);
    return "error";
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
      return "Invalid or expired token";
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
    return "error";
  }
};
