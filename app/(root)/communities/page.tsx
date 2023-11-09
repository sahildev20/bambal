import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetch_threads } from "@/lib/actions/thread.actions";
import { fetch_user } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {

    const current_user = await currentUser();
    if (!current_user) return null;
    const current_userInfo = await fetch_user(current_user.id);
    if (!current_userInfo?.onboarded) return redirect("/");

    return (
        <section>
            <ProfileHeader
                authId={current_user.id}
                son_id={current_userInfo._id}
                dad_id={current_userInfo._id}
                name={current_userInfo.name}
                username={current_userInfo.username}
                imageUrl={current_userInfo.image}
                bio={current_userInfo.bio}
                same_user
            />
            <h1 className="mt-4 text-heading2-bold text-light-1">Suggested Communities</h1>
            <p className="my-4 text-subtle-medium text-gray-1">No can only subscribe to communities.Only verified users can create communities. <Link href="/docs/verified-user-features" className="text-purple-500">Learn more</Link></p>
            <div className="flex flex-col gap-6">
            </div>
        </section>
    )

}