import { AudioWaveform } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function FavIcon({ className }: Props) {
  return (
    <div
      className={cn(
        "dark:bg-sidebar-primary dark flex aspect-square size-4 items-center justify-center rounded-lg",
        className,
      )}
    >
      <AudioWaveform className="size-full" />
    </div>
  );
}
