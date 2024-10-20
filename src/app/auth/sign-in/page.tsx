import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { routes } from "@/lib/routes";
import SignInForm from "@/components/auth/SignInForm";

export default async function SignIn() {
  const session = await auth();

  if (session?.user) {
    redirect(routes.root);
  }

  return <SignInForm />;
}
