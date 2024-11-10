import { siteConfig } from "@/config/site-config";
import FavIcon from "@/components/shared/FavIcon";

export default function AuthFormBranding() {
  return (
    <div className="absolute right-96 top-16 -z-50 flex translate-x-9 -rotate-90 items-center gap-1 rounded-t-sm bg-black px-4 text-white dark:bg-white dark:text-black">
      <FavIcon className="size-3" />
      <span className="text-xs font-semibold"> {siteConfig.name}</span>
    </div>
  );
}
