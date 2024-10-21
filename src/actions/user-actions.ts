"use server";

import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";

import { signIn, signOut } from "@/lib/auth";
import { db } from "@/lib/db";
import { createZodError, type CustomErrorType } from "@/lib/error";
import { routes } from "@/lib/routes";
import { type ActionsResponse } from "@/lib/types";
import { hashPassword } from "@/lib/utils";
import { signUpFormSchema } from "@/components/auth/schema";

export async function authenticate(
  _: string | undefined,
  formData: FormData,
): Promise<ActionsResponse> {
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
          return "CredentialsSignin";
        default:
          return "UnknownError";
      }
    }

    throw error;
  }
}

export const signUpUser = async (
  _: string | undefined,
  formData: FormData,
): Promise<ActionsResponse> => {
  try {
    const credentials = signUpFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirm-password"),
      name: formData.get("name"),
    });

    if (!credentials.success) {
      return createZodError(credentials.error.errors?.[0]?.message);
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

    return "success";
  } catch (error) {
    if (error instanceof AuthError) {
      console.error(error);
      switch (error.type) {
        case "CredentialsSignin":
          return "CredentialsSignin";
        default:
          return "UnknownError";
      }
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(error);
      if (error.code === "P2002") {
        return "P2002";
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
