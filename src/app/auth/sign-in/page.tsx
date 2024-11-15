import { auth } from "@/packages/auth";
import { redirect } from "next/navigation";

import { routes } from "@/lib/routes";
import SignInForm from "@/components/auth/sign-in-form";

export default async function page() {
  const session = await auth();

  if (session?.user) {
    redirect(routes.root);
  }

  return <SignInForm />;
}
