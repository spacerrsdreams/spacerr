"use server";

import { PrismaClient } from "@prisma/client";
import { addHours } from "date-fns"; // To set token expiry
import { v4 as uuidv4 } from "uuid";
import z from "zod";

import { resend } from "@/lib/resend";
import { hashPassword } from "@/lib/utils";
import SpacerrResetPasswordEmail from "@/components/emails/SpacerrResetPasswordEmail";

const sendPasswordRecoveryEmailSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z
  .object({
    email: z.string().email(),
    token: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const prisma = new PrismaClient();

export const sendPasswordRecoveryEmail = async (_: string | undefined, formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const parsedSchema = sendPasswordRecoveryEmailSchema.safeParse({ email });

    if (!parsedSchema.success) {
      return "Invalid email";
    }

    const to = parsedSchema.data.email;

    const user = await prisma.user.findUnique({
      where: { email: to },
    });

    if (!user) {
      return "User not found";
    }

    const token = uuidv4();
    const expires = addHours(new Date(), 1);

    await prisma.verificationToken.create({
      data: {
        identifier: to,
        token,
        expires,
      },
    });

    const resetPasswordLink = `https://${process.env.VERCEL_URL}/auth/reset-password?token=${token}&email=${to}`;

    const { error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to,
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
    const parsedSchema = resetPasswordSchema.safeParse({
      token: formData.get("token"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"),
      email: formData.get("email"),
    });

    if (!parsedSchema.success) {
      return parsedSchema.error.errors?.[0]?.message;
    }

    const { token, email, password } = parsedSchema.data;
    console.log({ token, email });

    const verificationToken = await prisma.verificationToken.findUnique({
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

    return "success";
  } catch (error) {
    console.error(error);
    return "error";
  }
};
