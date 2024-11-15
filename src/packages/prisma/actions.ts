"use server";

import { db } from "@/packages/prisma";
import { addMinutes, isBefore } from "date-fns";

import { hashPassword } from "@/lib/utils";

type CreateUserT = {
  email: string;
  password: string;
  name: string;
};

type UpdatePasswordT = {
  email: string;
  password: string;
  token: string;
  identifier: string;
};

type VerifyEmailVerificationTokenT = {
  identifier: string;
  token: string;
};

export const storeEmailVerificationToken = async (email: string, token: string) => {
  const expires = addMinutes(new Date(), 60);

  return db.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });
};

export const verifyEmailVerificationToken = async ({
  identifier,
  token,
}: VerifyEmailVerificationTokenT) => {
  const data: { error: null | string } = { error: null };

  await db.$transaction(async (prisma) => {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier,
          token,
        },
      },
    });

    if (!verificationToken) {
      data.error = "invalidCredentials";
      return;
    }

    if (isBefore(verificationToken.expires, new Date())) {
      data.error = "verificationTokenExpired";
      return;
    }

    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier,
          token,
        },
      },
    });
  });

  return data;
};

export const createUser = async ({ email, password, name }: CreateUserT) => {
  const hashedPassword = await hashPassword(password);

  return db.user.create({
    data: {
      email,
      hashedPassword,
      name,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return db.user.findUnique({
    where: { email },
  });
};

export const findVerificationToken = async (email: string, token: string) => {
  return db.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier: email,
        token: token,
      },
    },
  });
};

export const updatePassword = async ({ password, email, token, identifier }: UpdatePasswordT) => {
  const hashedPassword = await hashPassword(password);

  return db.$transaction(async (prisma) => {
    await prisma.user.update({
      where: { email: identifier },
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
};
