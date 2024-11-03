import React from "react";

import DesktopHeader from "@/components/header/desktop-header";
import MobileHeader from "@/components/header/mobile-header";

export const links = [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Contact", href: "/#contact" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      <DesktopHeader />
      <MobileHeader />
    </header>
  );
}
