import { auth } from "@/packages/auth";
import { redirect } from "next/navigation";

import { routes } from "@/lib/routes";
import Header from "@/components/shared/header/header";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session?.user) {
    redirect(routes.root);
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}
