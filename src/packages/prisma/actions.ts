"use server";

import { db } from "@/packages/prisma";
import { isBefore } from "date-fns";

export const storeEmailVerificationToken = async (email: string, token: string, expires: Date) => {
  return db.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });
};

export const verifyEmailVerificationToken = async (email: string, token: string) => {
  return await db.$transaction(async (prisma) => {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: email,
          token: token,
        },
      },
    });

    if (!verificationToken) {
      return "Invalid Token";
    }

    if (isBefore(verificationToken.expires, new Date())) {
      return "Verification Link Expired";
    }

    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() },
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
};
