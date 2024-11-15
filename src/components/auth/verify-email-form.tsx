"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { routes } from "@/lib/routes";
import { useToast } from "@/hooks/use-toast";
import { useVerifyEmail } from "@/hooks/use-verify-email";
import AuthFormBranding from "@/components/auth/auth-form-branding";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

export default function VerifyEmailForm() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>("");
  const { mutateAsync, data } = useVerifyEmail();
  const [progressText, setProgressText] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    setToken(token);
    setEmail(email);
  }, [searchParams]);

  useEffect(() => {
    const comesFromSession = sessionStorage.getItem("session") === "auth";

    if (token && email) {
      setProgressText(" Verifying your email address...");
      mutateAsync({ token: token, email }).then((res) => {
        if (res === "success") {
          toast({
            title: "Email Verified",
            description:
              "Your email has been verified successfully. You will be redirected soon to the sign in page.",
          });

          sessionStorage.removeItem("session");

          setTimeout(() => {
            router.push(routes.signIn);
          }, 3000);
        }
      });
    } else if (comesFromSession && !token && !email) {
      setProgressText(
        "We have sent you an email with a verification link. Please check your email and click on the link to verify your email address.",
      );
    } else {
      setProgressText("Email Verification Failed. Please try again.");
    }
  }, [email, token]);

  useEffect(() => {
    if (data === "success") {
      setProgressText("Email Verified Successfully. Redirecting to sign in page...");
      setTimeout(() => {
        router.push(routes.signIn);
      }, 2000);
    } else {
      setProgressText("Email Verification Failed. Please try again.");
    }
  }, [data]);

  return (
    <div className="h-screen">
      <div className="flex h-full items-center justify-center">
        <Card className="relative h-44 w-96">
          <CardHeader>
            <AuthFormBranding />
            <h2 className="pb-1 text-center text-lg font-bold">Email Verification</h2>
            <CardDescription className="text-center">{progressText}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
