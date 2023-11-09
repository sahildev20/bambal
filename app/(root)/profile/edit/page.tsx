import AccountProfile from "@/components/forms/AccountProfile";
import { fetch_user } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
// import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";



// TODO : COMPLETE EDIT PROFILE
const Page = async () => {
  const user = await currentUser();
  if (!user) redirect('/sign-in')
  const userInfo = await fetch_user(user.id);
  if (!userInfo) return redirect('/onboarding')
  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: user?.username || userInfo?.username,
    name: user?.firstName || userInfo?.name || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl
  }
  return (
    <main className="mx-auto flex flex-col max-w-3xl justify-start px-4">
      <h1 className="head-text">Edit Profile</h1>
      <p className="text-light-2 mt-3">
        More account customizations coming soon !
      </p>
      <section className="mt-6 bg-dark-2 p-10">
        <AccountProfile
          id={userData.id}
          objectId={userData.objectId}
          username={userData.username}
          name={userData.name}
          bio={userData.bio}
          image={userData.image}
          buttonTitle="Continue" />
      </section>
    </main>
  );
};

export default Page;
