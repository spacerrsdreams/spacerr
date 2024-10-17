import { PrismaAdapter } from "@auth/prisma-adapter";
// import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { db } from "@/lib/db";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId,
      clientSecret,
    }),
  ],
});
