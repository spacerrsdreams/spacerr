"use client";

import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import { sendPasswordRecoveryEmail } from "@/actions/user-actions";
import { routes } from "@/lib/routes";
import { useToast } from "@/hooks/use-toast";
import AuthFormBranding from "@/components/auth/auth-form-branding";
import { SubmitButton } from "@/components/shared/submit-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RecoverPasswordForm() {
  const { toast } = useToast();
  const [state, dispatch] = useFormState(sendPasswordRecoveryEmail, undefined);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (state === "success") {
      toast({
        title: "Success",
        description: "Password recovery email sent successfully",
      });
      setIsButtonDisabled(true);
      setCountdown(60);
    }
  }, [state]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isButtonDisabled) {
      setIsButtonDisabled(false);
    }
  }, [countdown, isButtonDisabled]);

  return (
    <div className="h-screen">
      <div className="flex h-full w-full items-center justify-center">
        <Card className="relative min-w-96 max-w-sm">
          <CardHeader>
            <AuthFormBranding />
            <h2 className="pb-1 text-center text-lg font-bold">Recover Password</h2>
            <CardDescription className="text-center">
              Enter your email address to receive instructions for resetting your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4 text-xs" action={dispatch}>
              <div>
                <Label className="text-xs text-muted-foreground">Email Address</Label>
                <Input name="email" placeholder="example@email.com" />
              </div>
              <SubmitButton disabled={isButtonDisabled} className="w-full">
                Continue
              </SubmitButton>
              {isButtonDisabled && (
                <p className="text-center text-xs text-muted-foreground">
                  Didn&apos;t receive the email? Check your spam folder or try again in {countdown}s
                </p>
              )}
              {state && state !== "success" && (
                <div className="flex h-8 items-end space-x-1">
                  <CircleAlert className="size-5 text-red-500" />
                  <p className="text-sm text-red-500">{state}</p>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-xs text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href={routes.signIn} className="text-purple-500 underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
