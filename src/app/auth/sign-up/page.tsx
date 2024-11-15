import { auth } from "@/packages/auth";
import { redirect } from "next/navigation";

import { routes } from "@/lib/routes";
import SignUpForm from "@/components/auth/sign-up-form";

export default async function page() {
  const session = await auth();

  if (session?.user) {
    redirect(routes.root);
  }

  return <SignUpForm />;
}
