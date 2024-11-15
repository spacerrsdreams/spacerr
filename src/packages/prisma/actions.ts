"use server";

import { db } from "@/packages/prisma";

export const storeEmailVerificationToken = async (email: string, token: string, expires: Date) => {
  return db.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });
};
