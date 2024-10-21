"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { authenticate, loginWithGoogle } from "@/actions/user-actions";
import { siteConfig } from "@/config/siteConfig";
import { mapErrorToMessage } from "@/lib/error";
import { routes } from "@/lib/routes";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import ExclamationIcon from "@/components/ui/icons/ExclamationIcon";
import GoogleIcon from "@/components/ui/icons/GoogleIcon";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SignInForm() {
  const router = useRouter();
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === "EmailVerificationError") {
      console.log("ok");
      router.push(routes.verifyEmail);
    }
  }, [state]);

  return (
    <div className="h-screen">
      <div className="flex h-full w-full items-center justify-center">
        <Card className="min-w-96">
          <CardHeader>
            <div className="flex w-full items-center justify-center pb-4">
              <Image src="/static/favicon-32x32.png" alt="company icon" width={36} height={36} />
            </div>
            <h2 className="pb-1 text-center text-lg font-bold">Sign in to {siteConfig.name}</h2>
            <CardDescription className="text-center">
              Welcome back! Please sign in to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={loginWithGoogle}>
              <Button variant="outline" type="submit" className="w-full">
                <GoogleIcon className="size-4" />
                <span className="ml-4 text-xs text-muted-foreground">Continue with Google</span>
              </Button>
            </form>
            <div className="flex items-center justify-center py-6">
              <Separator className="flex-1" />
              <span className="px-4">or</span>
              <Separator className="flex-1" />
            </div>
            <form className="space-y-4 text-xs" action={dispatch}>
              <div>
                <label className="text-xs text-muted-foreground">Email Address</label>
                <Input name="email" placeholder="example@email.com" />
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Password</label>
                <Input autoComplete="" type="password" name="password" placeholder="password" />
              </div>

              <SubmitButton>Continue</SubmitButton>
              <div className="flex items-center justify-center">
                <Link
                  href={routes.recoverPassword}
                  className="text-muted-foreground text-purple-500 underline"
                >
                  Forgot Password?
                </Link>
              </div>
              {state && state !== "success" && (
                <div className="flex h-8 items-end space-x-1">
                  <ExclamationIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{mapErrorToMessage(state)}</p>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-xs text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href={routes.signUp} className="text-purple-500 underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
