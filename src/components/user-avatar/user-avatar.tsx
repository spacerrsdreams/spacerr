import { auth } from "@/lib/auth";
import SignInInitiator from "@/components/user-avatar/sign-in-initiator";
import UserAvatarActions from "@/components/user-avatar/user-avatar-actions";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) {
    return <SignInInitiator />;
  }

  return <UserAvatarActions user={session.user} />;
}
