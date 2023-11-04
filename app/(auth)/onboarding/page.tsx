import AccountProfile from "@/components/forms/AccountProfile";
import { fetch_user } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if(!user) redirect('/sign-in')
  const userInfo = await fetch_user(user.id);
  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: user?.username || userInfo.username,
    name: user?.firstName || userInfo.name || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl
  };
  return (
    <main className="mx-auto flex flex-col max-w-3xl justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="text-light-2 mt-3">
        You can enjoy Bambal after completing your profile !
      </p>
      <section className="mt-10 bg-dark-2 p-10">
        <AccountProfile user={userData} buttonTitle="Continue" />
      </section>
    </main>
  );
}
