"use client";

import { verifyUserEmail } from "@/packages/auth/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

import { routes } from "@/lib/routes";
import { useToast } from "@/hooks/use-toast";
import AuthFormBranding from "@/components/auth/auth-form-branding";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

type FormData = {
  email: string | null;
  token: string | null;
};

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [progressText, setProgressText] = useState("");
  const [state, dispatch] = useFormState(verifyUserEmail, undefined);
  const [formData, setFormData] = useState<FormData>({
    email: null,
    token: null,
  });

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    setFormData({ email, token });
  }, [searchParams]);

  useEffect(() => {
    const comesFromSession = sessionStorage.getItem("session") === "auth";

    if (formData.token && formData.email) {
      buttonRef.current?.click();
      setProgressText(" Verifying your email address...");
    } else if (comesFromSession && !formData.token && !formData.email) {
      setProgressText(
        "We have sent you an email with a verification link. Please check your email and click on the link to verify your email address.",
      );
    } else {
      setProgressText("Email Verification Failed. Please try again.");
    }
  }, [formData]);

  useEffect(() => {
    if (!state) return;

    if (state === "success") {
      setProgressText("Email Verified Successfully. Redirecting to sign in page...");
      sessionStorage.removeItem("session");
      toast({
        title: "Success",
        description: "Email verified successfully. Please sign in to continue with your account.",
      });

      setTimeout(() => {
        router.push(routes.signIn);
      }, 3000);
    } else {
      setProgressText("Email Verification Failed. Please try again.");
    }
  }, [state]);

  return (
    <div className="h-screen">
      <div className="flex h-full items-center justify-center">
        <Card className="relative h-44 w-96">
          <form action={dispatch}>
            <CardHeader>
              <AuthFormBranding />
              <h2 className="pb-1 text-center text-lg font-bold">Email Verification</h2>
              <CardDescription className="text-center">{progressText}</CardDescription>

              <input type="hidden" name="token" value={formData.token || ""} />
              <input type="hidden" name="email" value={formData.email || ""} />
              <button ref={buttonRef} type="submit" className="hidden" />
            </CardHeader>
          </form>
        </Card>
      </div>
    </div>
  );
}
