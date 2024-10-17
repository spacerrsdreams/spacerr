"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SignInInitiator() {
  const pathname = usePathname();

  if (pathname === "/sign-in") return null;

  return (
    <Link
      href="/sign-in"
      className="fixed right-4 top-2 cursor-pointer self-center rounded-xl bg-purple-500 px-3 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-purple-600"
    >
      Get Started
    </Link>
  );
}
