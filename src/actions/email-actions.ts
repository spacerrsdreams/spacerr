"use server";

import z from "zod";

import { resend } from "@/lib/resend";
import SpacerrResetPasswordEmail from "@/components/emails/SpacerrResetPasswordEmail";

const emailSchema = z.object({
  email: z.string().email(),
});

export const sendPasswordRecoveryEmail = async (_: string | undefined, formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const parsedSchema = emailSchema.safeParse({ email });

    if (!parsedSchema.success) {
      return "Invalid email";
    }

    const to = parsedSchema.data.email;

    const { error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to,
      subject: "Password Recovery",
      react: SpacerrResetPasswordEmail({
        userFirstname: "Tester",
        resetPasswordLink: "http://localhost:3000",
      }),
    });

    if (error) {
      console.error(error);
      return "error";
    }

    return "success";
  } catch (error) {
    console.error(error);

    return "error";
  }
};
