"use client";

import { verifyUserEmail } from "@/packages/auth/actions";
import { useMutation } from "@tanstack/react-query";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async ({ token, email }: { token: string; email: string }) =>
      verifyUserEmail(token, email),
  });
};
