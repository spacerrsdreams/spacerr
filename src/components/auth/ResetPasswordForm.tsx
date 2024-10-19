"use client";

import Image from "next/image";
import { useFormState } from "react-dom";

import { sendPasswordRecoveryEmail } from "@/actions/email-actions";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import ExclamationIcon from "@/components/ui/icons/ExclamationIcon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordForm() {
  const [state, dispatch] = useFormState(sendPasswordRecoveryEmail, undefined);

  const isError = state === "error" || state === "Invalid email";

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
              <div>
                <Label className="text-xs text-muted-foreground">Password</Label>
                <Input type="password" name="password" placeholder="*****" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Confirm Password</Label>
                <Input type="password" name="confirmPassword" placeholder="*****" />
              </div>
              <SubmitButton>Continue</SubmitButton>
              {isError && (
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
