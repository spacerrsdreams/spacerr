import { login } from "@/actions/auth";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default async function SignIn() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <form action={login}>
      <Button type="submit">Signin with Google</Button>
    </form>
  );
}
