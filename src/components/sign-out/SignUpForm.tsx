"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { loginWithGoogle, signUpUser } from "@/actions/user-actions";
import { siteConfig } from "@/config/siteConfig";
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
    if (typeof state === "string" && state === "") {
      toast({
        title: "Account created",
        description: "Please sign in to continue, you will be redirected shortly",
      });

      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    }
  }, [state, router]);

  return (
    <div className="h-screen">
      <div className="flex h-full w-full items-center justify-center">
        <Card className="min-w-96">
          <CardHeader>
            <h2 className="pb-1 text-center text-lg font-bold">Sign up to {siteConfig.name}</h2>
            <CardDescription>Welcome back! Please sign in to continue</CardDescription>
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
                <Input name="email" placeholder="example@email.com" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Password</label>
                <Input name="password" placeholder="password" type="password" />
              </div>

              <SubmitButton>Continue</SubmitButton>
              {state && (
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
              <Link href="/sign-in" className="text-purple-500">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
