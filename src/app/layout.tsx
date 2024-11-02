import type { Metadata } from "next";

import "./globals.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { siteConfig } from "@/config/site-config";
import AuthProvider from "@/providers/auth-provider";
import QueryClientProviderWrapper from "@/providers/query-client-provider";
import Footer from "@/components/footer";
import GridBackground from "@/components/shared/grid-background";
import ScreenSizeIndicator from "@/components/shared/screen-size-indicator";
import { Toaster } from "@/components/ui/toaster";
import UserAvatar from "@/components/user-avatar/user-avatar";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <QueryClientProviderWrapper>
            <GridBackground />
            <UserAvatar />
            {/* DO NOT REMOVE h-1 its a trick for CSS.
             check for more : https://stackoverflow.com/questions/8468066/child-inside-parent-with-min-height-100-not-inheriting-height 
             */}
            <main className="relative flex h-1 min-h-screen flex-col">
              {children}
              <Footer />
            </main>
            <ScreenSizeIndicator />
            <ReactQueryDevtools />
            <Toaster />
          </QueryClientProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
