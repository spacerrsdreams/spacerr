import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { siteConfig } from "@/config/site-config";
import AuthProvider from "@/providers/auth-provider";
import QueryClientProviderWrapper from "@/providers/query-client-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import ScreenSizeIndicator from "@/components/shared/screen-size-indicator";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <QueryClientProviderWrapper>
              {/* DO NOT REMOVE h-1 its a trick for CSS.
             check for more : https://stackoverflow.com/questions/8468066/child-inside-parent-with-min-height-100-not-inheriting-height 
             */}
              <main className="relative flex h-1 min-h-screen flex-col">{children}</main>
              <ScreenSizeIndicator />
              <ReactQueryDevtools />
              <Toaster />
            </QueryClientProviderWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
