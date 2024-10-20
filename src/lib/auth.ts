import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { AuthError } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { db } from "@/lib/db";
import { signInFormSchema } from "@/components/auth/schema";

export class CustomAuthError extends AuthError {
  constructor(msg: string) {
    super();
    this.message = msg;
    this.stack = undefined;
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
          console.error("Invalid credentials schema");
          throw new CustomAuthError("Invalid Credentials");
        }

        const { email, password } = parsedData;

        try {
          const user = await db.user.findFirst({ where: { email } });

          if (!user) {
            console.error("User not found");
            throw new CustomAuthError("Invalid Credentials");
          }

          const isValidPassword = await bcrypt.compare(password, user.hashedPassword || "");

          if (!isValidPassword) {
            console.error("Pasword Invalid");
            throw new CustomAuthError("Invalid Credentials");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (err) {
          console.error(err);
          throw new CustomAuthError("Invalid Credentials");
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
            console.error("Email not found in Google account");
            throw new CustomAuthError("Invalid Credentials");
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
            // Create new user and account
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
      } catch (err) {
        console.error(err);
        throw new CustomAuthError("Invalid Credentials");
      }
    },
  },
});
