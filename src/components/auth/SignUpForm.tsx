"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { loginWithGoogle, signUpUser } from "@/actions/user-actions";
import { siteConfig } from "@/config/siteConfig";
import { routes } from "@/lib/routes";
import { useToast } from "@/hooks/use-toast";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import ExclamationIcon from "@/components/ui/icons/ExclamationIcon";
import GoogleIcon from "@/components/ui/icons/GoogleIcon";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [state, dispatch] = useFormState(signUpUser, undefined);

  useEffect(() => {
    if (state === "success") {
      toast({
        title: "Email Verification",
        description: "Please verify your email address to continue",
      });

      sessionStorage.setItem("session", "auth");

      setTimeout(() => {
        router.push(routes.verifyEmail);
      }, 2000);
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
            <h2 className="pb-1 text-center text-lg font-bold">Sign up to {siteConfig.name}</h2>
            <CardDescription className="text-center">
              Happy to see you! Please sign up to continue
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
                <label className="text-xs text-muted-foreground">Name</label>
                <Input name="name" placeholder="name" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Email Address</label>
                <Input autoComplete="current-email" name="email" placeholder="example@email.com" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Password</label>
                <Input
                  autoComplete="current-password"
                  name="password"
                  placeholder="*****"
                  type="password"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Confirm Password</label>
                <Input
                  autoComplete="current-password"
                  name="confirm-password"
                  placeholder="*****"
                  type="password"
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
          <CardFooter className="flex justify-between">
            <p className="text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link href={routes.signIn} className="text-purple-500 underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
