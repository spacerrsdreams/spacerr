import { PrismaAdapter } from "@auth/prisma-adapter";
// import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { db } from "@/lib/db";

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
  ],
});
