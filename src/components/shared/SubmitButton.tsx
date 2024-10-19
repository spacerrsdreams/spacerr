import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button, type ButtonProps } from "@/components/ui/button";

export function SubmitButton({
  children,
  ...rest
}: {
  children: React.ReactNode;
} & ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={`w-full bg-purple-500 hover:bg-purple-400 ${rest.className}`}
      {...rest}
    >
      {pending ? <Loader2 className="animate-spin" /> : <span>{children}</span>}
    </Button>
  );
}
