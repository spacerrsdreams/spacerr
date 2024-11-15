"use server";

import { resend } from "@/packages/resend";
import ResetPasswordTemplate from "@/packages/resend/templates/reset-password-template";
import { EmailVerificationTemplate } from "@/packages/resend/templates/verify-email-template";

import { siteConfig } from "@/config/site-config";

type SendResetPasswordEmail = {
  email: string;
  token: string;
  name: string;
};

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

export const sendPasswordResetEmailLink = async ({
  email,
  token,
  name,
}: SendResetPasswordEmail) => {
  const resetPasswordLink = `https://${process.env.VERCEL_URL}/auth/reset-password?token=${token}&email=${email}`;

  return await resend.emails.send({
    from: `${siteConfig.name} <onboarding@resend.dev>`,
    to: email,
    subject: "Password Recovery",
    react: ResetPasswordTemplate({
      userFirstname: name || "User",
      resetPasswordLink,
    }),
  });
};
