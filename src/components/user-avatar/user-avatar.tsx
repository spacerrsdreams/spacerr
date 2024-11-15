import { auth } from "@/packages/auth";

import UserAvatarActions from "@/components/user-avatar/user-avatar-actions";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return <UserAvatarActions user={session.user} />;
}
