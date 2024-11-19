import { createTokenAndSendVeriticationLink } from "@/packages/auth/actions";
import { signInFormSchema } from "@/packages/auth/schemas";
import { db } from "@/packages/database";
import { createAccountAndLinkGoogle, findUserByEmail } from "@/packages/database/actions";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { AuthError } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import type { CustomErrorType, NextAuthErrorType } from "@/lib/error";

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
        if (!success) throw new CustomAuthError("CredentialsSignin");

        const { email, password } = parsedData;

        const user = await db.user.findFirst({ where: { email } });
        if (!user) throw new CustomAuthError("CredentialsSignin");

        if (!user.emailVerified) {
          await createTokenAndSendVeriticationLink(email);
          throw new CustomAuthError("CredentialsSignin", { type: "EmailVerificationError" });
        }

        const isValidPassword = await bcrypt.compare(password, user.hashedPassword || "");
        if (!isValidPassword) throw new CustomAuthError("CredentialsSignin");

        return { id: user.id, name: user.name, email: user.email, image: user.image };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "google") {
          const email = user.email;
          if (!email) throw new CustomAuthError("CredentialsSignin");

          const existingUser = await findUserByEmail(email);

          if (!existingUser) {
            await createAccountAndLinkGoogle(
              {
                email,
                name: user.name || profile?.name || "",
                image: user.image || profile?.picture,
              },
              {
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
            );
          }

          return true;
        }

        return true;
      } catch (error) {
        console.error("Error in Google sign-in callback:", error);
        throw new CustomAuthError("CredentialsSignin");
      }
    },
  },
});
