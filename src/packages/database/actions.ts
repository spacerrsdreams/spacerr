"use server";

import { db } from "@/packages/database";
import type {
  CreateUserT,
  GoogleAccountDataT,
  NewUserDataT,
  UpdatePasswordT,
  VerifyEmailVerificationTokenT,
} from "@/packages/database/types";
import { addMinutes, isBefore } from "date-fns";

import { hashPassword } from "@/lib/utils";

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

export const findUserByUserIdAndProvider = async (userId: string, provider: string) => {
  return db.account.findFirst({
    where: {
      userId,
      provider,
    },
  });
};

export async function createAccountAndLinkGoogle(
  userData: NewUserDataT,
  accountData: Omit<GoogleAccountDataT, "userId">,
) {
  return await db.$transaction(async (prisma) => {
    // Create the user
    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name || "",
        emailVerified: new Date(),
        image: userData.image || null,
      },
    });

    // Link the Google account
    await prisma.account.create({
      data: {
        userId: newUser.id,
        provider: accountData.provider,
        providerAccountId: accountData.providerAccountId,
        type: accountData.type,
        refresh_token: accountData.refresh_token ?? null,
        access_token: accountData.access_token ?? null,
        expires_at: accountData.expires_at ?? null,
        token_type: accountData.token_type ?? null,
        scope: accountData.scope ?? null,
        id_token: accountData.id_token ?? null,
        session_state: accountData.session_state ?? null,
      },
    });

    return newUser;
  });
}
