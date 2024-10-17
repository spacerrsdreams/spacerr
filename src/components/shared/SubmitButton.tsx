import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-400">
      {pending ? <Loader2 className="animate-spin" /> : <span>{children}</span>}
    </Button>
  );
}
