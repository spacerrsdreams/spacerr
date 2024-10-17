import { auth } from "@/lib/auth";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <Avatar className="shimmer fixed right-4 top-2 size-8 cursor-pointer">
      <AvatarImage src={session.user.image || "https://github.com/shadcn.png"} />
    </Avatar>
  );
}
