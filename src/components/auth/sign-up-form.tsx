"use client";

import { loginWithGoogle, signUpUser } from "@/packages/auth/actions";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { siteConfig } from "@/config/site-config";
import { routes } from "@/lib/routes";
import { useToast } from "@/hooks/use-toast";
import AuthFormBranding from "@/components/auth/auth-form-branding";
import { SubmitButton } from "@/components/shared/submit-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import GoogleIcon from "@/components/ui/icons/google-icon";
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
        <Card className="relative min-w-96">
          <CardHeader>
            <AuthFormBranding />
            <h2 className="pb-1 text-center text-lg font-bold">Sign up to {siteConfig.name}</h2>
            <CardDescription className="text-center">
              Happy to see you! Please sign up to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={loginWithGoogle}>
              <SubmitButton
                variant="outline"
                className="flex w-full items-center justify-center gap-2"
              >
                <GoogleIcon className="size-4" />
                <span className="ml-4 text-xs text-muted-foreground">Continue with Google</span>
              </SubmitButton>
            </form>

            <div className="flex items-center justify-center pb-3 pt-6">
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

              <SubmitButton className="w-full">Continue</SubmitButton>
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
