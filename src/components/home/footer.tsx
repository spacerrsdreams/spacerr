import Image from "next/image";
import React from "react";

import { siteConfig } from "@/config/site-config";

const homePages = ["Home", "Features", "Pricing", "Contact"];
const socials = ["Facebook", "Instagram", "Twitter", "LinkedIn"];
const legal = ["Privacy Policy", "Terms of Service", "Cookie Policy"];
const register = ["Sign Up", "Login", "Book a demo"];

export default function Footer() {
  return (
    <div className="relative w-full overflow-hidden border-t border-neutral-100 bg-white px-8 py-20 dark:border-white/[0.1] dark:bg-neutral-950">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between text-sm text-neutral-500 sm:flex-row md:px-8">
        <div>
          <div className="mb-4 mr-0 md:mr-4 md:flex">
            <a
              className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
              href="/"
            >
              <Image
                alt="logo"
                loading="lazy"
                width={32}
                height={32}
                decoding="async"
                src="/static/favicon-32x32.png"
              />
              <span className="font-medium text-black dark:text-white">Startup</span>
            </a>
          </div>
          <div className="ml-2 mt-2">© copyright Startup 2024. All rights reserved.</div>
        </div>
        <div className="mt-10 grid grid-cols-2 items-start gap-10 sm:mt-0 md:mt-0 lg:grid-cols-4">
          <div className="flex w-full flex-col justify-center space-y-4">
            <p className="hover:text-text-neutral-800 font-bold text-neutral-600 transition-colors dark:text-neutral-300">
              Pages
            </p>
            <ul className="hover:text-text-neutral-800 list-none space-y-4 text-neutral-600 transition-colors">
              {homePages.map((page) => (
                <li key={page} className="list-none">
                  <a className="hover:text-text-neutral-800 transition-colors" href="#">
                    {page}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <p className="hover:text-text-neutral-800 font-bold text-neutral-600 transition-colors dark:text-neutral-300">
              Socials
            </p>
            <ul className="hover:text-text-neutral-800 list-none space-y-4 text-neutral-600 transition-colors dark:text-neutral-300">
              {socials.map((social) => (
                <li key={social} className="list-none">
                  <a className="hover:text-text-neutral-800 transition-colors" href="#">
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <p className="hover:text-text-neutral-800 font-bold text-neutral-600 transition-colors dark:text-neutral-300">
              Legal
            </p>
            <ul className="hover:text-text-neutral-800 list-none space-y-4 text-neutral-600 transition-colors dark:text-neutral-300">
              {legal.map((legal) => (
                <li key={legal} className="list-none">
                  <a className="hover:text-text-neutral-800 transition-colors" href="#">
                    {legal}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <p className="hover:text-text-neutral-800 font-bold text-neutral-600 transition-colors dark:text-neutral-300">
              Register
            </p>
            <ul className="hover:text-text-neutral-800 list-none space-y-4 text-neutral-600 transition-colors dark:text-neutral-300">
              {register.map((register) => (
                <li key={register} className="list-none">
                  <a className="hover:text-text-neutral-800 transition-colors" href="#">
                    {register}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="inset-x-0 mt-20 bg-gradient-to-b from-neutral-50 to-neutral-200 bg-clip-text text-center text-5xl font-bold uppercase text-transparent dark:from-neutral-950 dark:to-neutral-800 md:text-9xl lg:text-[12rem] xl:text-[13rem]">
        {siteConfig.name}
      </p>
    </div>
  );
}
