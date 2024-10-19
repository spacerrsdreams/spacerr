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
        const parsedCredentials = signInFormSchema.safeParse(credentials);

        try {
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;

            const user = await db.user.findFirst({
              where: { email },
            });

            if (user) {
              const isValid = await bcrypt.compare(password, user.hashedPassword || "");

              if (isValid) {
                return {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  image: user.image,
                };
              } else {
                throw new CustomAuthError("Invalid Credentials");
              }
            } else {
              throw new CustomAuthError("User not found");
            }
          } else {
            throw new CustomAuthError("Invalid Credentials");
          }
        } catch {
          throw new CustomAuthError("Invalid Credentials");
        }
      },
    }),
  ],
});
