"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site-config";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/button";

export default function MobileHeader() {
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
  const width = useTransform(scrollY, [0, 100], ["100%", "90%"]);
  const translateY = useTransform(scrollY, [0, 100], ["translateY(0px)", "translateY(20px)"]);
  const padding = useTransform(scrollY, [0, 100], ["0", "12px"]);

  return (
    <motion.div
      className="relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between rounded-xl px-0 py-4 lg:hidden"
      style={{
        backgroundColor: bgColor,
        backdropFilter: backdropBlur,
        boxShadow: boxShadow,
        width: width,
        transform: translateY,
        paddingLeft: padding,
        paddingRight: padding,
      }}
    >
      <div className="flex w-full flex-row items-center justify-between">
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
        <Button variant="ghost">
          <Menu />
        </Button>
      </div>
    </motion.div>
  );
}
