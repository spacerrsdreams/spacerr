"use server";

import { signIn, signOut } from "@/lib/auth";

export const login = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const logOut = async () => {
  await signOut({ redirectTo: "/" });
};
