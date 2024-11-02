//! This is temporary workaround and needs to be deprecated after this issue will be resolved https://github.com/resend/react-email/issues/1105,
import { addMinutes } from "date-fns";
import { NextResponse, type NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { siteConfig } from "@/config/site-config";
import { db } from "@/lib/db";
import { resend } from "@/lib/resend";
import VerifyEmail from "@/components/emails/verify-email";

export async function POST(request: NextRequest) {
  const token = uuidv4();
  const expires = addMinutes(new Date(), 60);

  try {
    const payload = await request.json();
    const email = payload?.email;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await db.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    const verifyEmailLink = `https://${process.env.VERCEL_URL}/auth/verify-email?token=${token}&email=${email}`;

    const { error } = await resend.emails.send({
      from: `${siteConfig.name} <onboarding@resend.dev>`,
      to: email,
      subject: "Verify Your Email Address",
      react: VerifyEmail({
        verifyEmailLink,
      }),
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
