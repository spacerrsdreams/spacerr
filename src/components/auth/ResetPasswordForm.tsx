"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import { resetPassword } from "@/actions/user-actions";
import { routes } from "@/lib/routes";
import { useToast } from "@/hooks/use-toast";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import ExclamationIcon from "@/components/ui/icons/ExclamationIcon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [resetFormData, setResetFormData] = useState({ token: "", email: "" });
  const [state, dispatch] = useFormState(resetPassword, undefined);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (token && email) {
      setResetFormData({ token, email });
    }
  }, [searchParams]);

  useEffect(() => {
    if (state === "success") {
      toast({
        title: "Success",
        description:
          "Password reset successfully. Please sign in to continue, you will be redirected shortly",
      });

      setTimeout(() => {
        router.push(routes.signIn);
      }, 2000);
    }
  }, [state]);

  return (
    <div className="h-screen">
      <div className="flex h-full w-full items-center justify-center">
        <Card className="min-w-96 max-w-sm">
          <CardHeader>
            <div className="flex w-full items-center justify-center pb-4">
              <Image src="/static/favicon-32x32.png" alt="company icon" width={36} height={36} />
            </div>
            <h2 className="pb-1 text-center text-lg font-bold">Reset Password</h2>
            <CardDescription className="text-center">
              Enter your new password to reset your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4 text-xs" action={dispatch}>
              <Input className="hidden" name="token" value={resetFormData.token} readOnly />
              <Input className="hidden" name="email" value={resetFormData.email} readOnly />
              <div>
                <Label className="text-xs text-muted-foreground">Password</Label>
                <Input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="*****"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Confirm Password</Label>
                <Input
                  type="password"
                  name="confirm-password"
                  autoComplete="current-password"
                  placeholder="*****"
                />
              </div>
              <SubmitButton>Continue</SubmitButton>
              {state && state !== "success" && (
                <div className="flex h-8 items-end space-x-1">
                  <ExclamationIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{state}</p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
