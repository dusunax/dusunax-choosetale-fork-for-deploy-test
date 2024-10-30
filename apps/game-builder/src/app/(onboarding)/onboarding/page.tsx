import { me } from "@/actions/user/me";
import OnboardingContent from "./_components/OnboardingContent";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await me();

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col px-5 py-10">
      {user && <OnboardingContent user={user} />}
    </div>
  );
}
