import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { AuthError } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { db } from "@/lib/db";
import type { CustomErrorType, NextAuthErrorType } from "@/lib/error";
import { signInFormSchema } from "@/components/auth/schema";

export class CustomAuthError extends AuthError {
  constructor(type: NextAuthErrorType, cause?: { type: CustomErrorType | undefined }) {
    super();
    this.stack = undefined;
    this.type = type;
    this.cause = cause;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const { success, data: parsedData } = signInFormSchema.safeParse(credentials);

        if (!success) {
          throw new CustomAuthError("CredentialsSignin");
        }

        const { email, password } = parsedData;

        try {
          const user = await db.user.findFirst({ where: { email } });

          if (!user) {
            throw new CustomAuthError("CredentialsSignin");
          }

          if (!user.emailVerified) {
            fetch(`${process.env.FULL_SITE_URL}/api/email`, {
              headers: { "Content-Type": "application/json" },
              method: "POST",
              body: JSON.stringify({ email }),
            });

            throw new CustomAuthError("CredentialsSignin", {
              type: "EmailVerificationError",
            });
          }

          const isValidPassword = await bcrypt.compare(password, user.hashedPassword || "");

          if (!isValidPassword) {
            throw new CustomAuthError("CredentialsSignin");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          if (error instanceof CustomAuthError) {
            const cause = {
              type: error?.cause?.type as CustomErrorType,
            };

            throw new CustomAuthError(error.type, cause);
          }

          throw new CustomAuthError("CredentialsSignin");
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "google") {
          const email = user.email as string;

          if (!email) {
            throw new CustomAuthError("CredentialsSignin");
          }

          const existingUser = await db.user.findUnique({ where: { email } });

          if (existingUser) {
            const linkedAccount = await db.account.findFirst({
              where: {
                userId: existingUser.id,
                provider: "google",
              },
            });

            // Link account if it doesn't exist
            if (!linkedAccount) {
              await db.account.create({
                data: {
                  userId: existingUser.id,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  type: account.type || "oauth",
                  refresh_token: account.refresh_token ?? null,
                  access_token: account.access_token ?? null,
                  expires_at: account.expires_at ?? null,
                  token_type: account.token_type ?? null,
                  scope: account.scope ?? null,
                  id_token: account.id_token ?? null,
                  session_state:
                    typeof account.session_state === "string" ? account.session_state : null,
                },
              });
            }
          } else {
            await db.$transaction(async (prisma) => {
              const newUser = await prisma.user.create({
                data: {
                  email,
                  name: user.name || profile?.name || "",
                  emailVerified: new Date(),
                  image: user.image || profile?.picture || null,
                },
              });

              await prisma.account.create({
                data: {
                  userId: newUser.id,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  type: account.type || "oauth",
                  refresh_token: account.refresh_token ?? null,
                  access_token: account.access_token ?? null,
                  expires_at: account.expires_at ?? null,
                  token_type: account.token_type ?? null,
                  scope: account.scope ?? null,
                  id_token: account.id_token ?? null,
                  session_state:
                    typeof account.session_state === "string" ? account.session_state : null,
                },
              });
            });
          }

          return true;
        }

        return true;
      } catch {
        throw new CustomAuthError("CredentialsSignin");
      }
    },
  },
});
