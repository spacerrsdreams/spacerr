"use server";

import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";

import { signIn, signOut } from "@/lib/auth";
import { db } from "@/lib/db";
import { saltAndHashPassword } from "@/lib/utils";
import { signUpFormSchema } from "@/components/sign-out/schema";

export async function authenticate(_: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
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
      name: formData.get("name"),
    });

    if (credentials.success) {
      const { email, password, name } = credentials.data;
      const hashedPassword = saltAndHashPassword(password);

      await db.user.create({
        data: {
          email,
          hashedPassword,
          name,
        },
      });

      return "";
    } else {
      return "Invalid credentials";
    }
  } catch (error) {
    if (error instanceof AuthError) {
      console.error(error);
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
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
    await signIn("google", { redirectTo: "/" });
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  await signOut({ redirectTo: "/" });
};
