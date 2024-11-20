"use client";

import { verifyUserEmail } from "@/packages/auth/actions";
import { useMutation } from "@tanstack/react-query";

type VerifyEmailMutationT = {
  token: string;
  email: string;
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async ({ token, email }: VerifyEmailMutationT) => verifyUserEmail({ token, email }),
  });
};
