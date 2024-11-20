export { auth as middleware } from "@/packages/auth";

//! This middleware will run for all requests EXCEPT:
// 1. Paths starting with "api" (used for API routes).
// 2. Paths starting with "_next/static" (Next.js static files).
// 3. Paths starting with "_next/image" (Next.js image optimization routes).
// 4. Files ending in common image formats: ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".ico".
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|webp|gif|svg|ico)$).*)"],
};
