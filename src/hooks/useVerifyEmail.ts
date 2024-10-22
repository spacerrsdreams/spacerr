"use client";

import { useMutation } from "@tanstack/react-query";

import { verifyEmail } from "@/actions/user-actions";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async ({ token, email }: { token: string; email: string }) =>
      verifyEmail(token, email),
  });
};
