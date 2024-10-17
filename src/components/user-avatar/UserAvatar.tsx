import { auth } from "@/lib/auth";
import SignInInitiator from "@/components/user-avatar/SignInInitiator";
import UserAvatarActions from "@/components/user-avatar/UserAvatarActions";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) {
    return <SignInInitiator />;
  }

  return <UserAvatarActions user={session.user} />;
}
