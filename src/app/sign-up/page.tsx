import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import SignUpForm from "@/components/sign-out/SignUpForm";

export default async function SignUp() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return <SignUpForm />;
}