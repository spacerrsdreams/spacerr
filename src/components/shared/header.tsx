"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site-config";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import HoverEffect from "@/components/ui/hover-effect";

const links = [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Contact", href: "/#contact" },
];

export default function Header() {
  const { scrollY } = useScroll();

  const bgColor = useTransform(scrollY, [0, 100], ["transparent", "hsla(0,0%,100%,.8)"]);
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(10px"]);
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    [
      "rgba(34, 42, 53, 0.06) 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px",
      "rgba(34, 42, 53, 0.06) 0px 0px 24px, rgba(0, 0, 0, 0.05) 0px 1px 1px",
    ],
  );
  const width = useTransform(scrollY, [0, 100], ["100%", "40%"]);
  const translateY = useTransform(scrollY, [0, 100], ["translateY(0px)", "translateY(20px)"]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      <motion.div
        className="relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-4 py-2 transition-all duration-700 lg:flex"
        style={{
          backgroundColor: bgColor,
          backdropFilter: backdropBlur,
          boxShadow: boxShadow,
          width: width,
          transform: translateY,
          minWidth: 800,
        }}
      >
        <Link
          href={routes.root}
          className="relative z-20 flex items-center space-x-2 px-2 py-1 text-sm"
        >
          <Image
            alt="logo"
            loading="lazy"
            width={32}
            height={32}
            decoding="async"
            src="/static/favicon-32x32.png"
          />
          <span className="font-medium text-black dark:text-white">{siteConfig.name}</span>
        </Link>
        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2">
          {links.map((link, index) => (
            <NavLink key={index} link={link.href} label={link.name} />
          ))}
        </div>
        <div className="z-50 flex items-center gap-4">
          <div>
            <a
              className="button relative hidden cursor-pointer rounded-md bg-transparent px-4 py-2 text-center text-sm font-bold text-black shadow-none transition duration-200 hover:-translate-y-0.5 dark:text-white md:block"
              href="/login"
            >
              Login
            </a>
          </div>
          <HoverEffect>
            <Button variant="outline" className="cursor-pointer font-bold shadow-md">
              Book a call
            </Button>
          </HoverEffect>
        </div>
      </motion.div>
    </header>
  );
}

type NavLinkProps = {
  link: string;
  label: string;
};

const NavLink = ({ link, label }: NavLinkProps) => {
  return (
    <Link className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300" href={link}>
      <span className="relative z-20">{label}</span>
    </Link>
  );
};