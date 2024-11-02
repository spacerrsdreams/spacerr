import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { routes } from "@/lib/routes";
import SignUpForm from "@/components/auth/sign-up-form";

export default async function SignUp() {
  const session = await auth();

  if (session?.user) {
    redirect(routes.root);
  }

  return <SignUpForm />;
}
