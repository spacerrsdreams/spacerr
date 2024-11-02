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
            <div className="flex flex-col">
              <UserAvatar />
              {children}
              <Footer />
            </div>
            <ScreenSizeIndicator />
            <ReactQueryDevtools />
            <Toaster />
          </QueryClientProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
