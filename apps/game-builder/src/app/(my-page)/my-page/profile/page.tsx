import { me } from "@/actions/user/me";
import TopNav from "../_components/TopNav";
import EditUser from "./_components/EditUser";

export default async function Page() {
  const user = await me();

  return (
    <div className="h-full flex flex-col pb-20">
      <TopNav title="프로필 수정" hasBackButton page="/my-page" />
      {user && <EditUser user={user} />}
    </div>
  );
}
