"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site-config";
import { routes } from "@/lib/routes";
import { links } from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
      className="relative z-50 mx-auto flex max-w-[calc(100vw-2rem)] flex-col items-center justify-between rounded-xl px-0 py-4 lg:hidden"
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
          <span className="font-medium text-black">{siteConfig.name}</span>
        </Link>
        <Popover>
          <PopoverTrigger>
            <Menu />
          </PopoverTrigger>
          <PopoverContent className="w-[100vw] border-none bg-transparent bg-none px-4 shadow-none">
            <div className="rounded-md border bg-white px-4 py-8">
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <Link key={link.name} href={link.href} className="text-sm text-gray-700">
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="mt-6 space-y-4">
                <Button className="w-full font-bold shadow-md" variant="outline">
                  Login
                </Button>
                <Button className="w-full font-bold shadow-md" variant="outline">
                  Contact Us
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </motion.div>
  );
}
