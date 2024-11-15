"use server";

import { resend } from "@/packages/resend";
import { EmailVerificationTemplate } from "@/packages/resend/templates/verify-email";

import { siteConfig } from "@/config/site-config";

export const sendEmailVerificationLink = async (email: string, token: string) => {
  const emailVerificationLink = `https://${process.env.VERCEL_URL}/auth/verify-email?token=${token}&email=${email}`;

  return resend.emails.send({
    from: `${siteConfig.name} <onboarding@resend.dev>`,
    to: email,
    subject: "Verify Your Email Address",
    react: EmailVerificationTemplate({
      emailVerificationLink,
    }),
  });
};
