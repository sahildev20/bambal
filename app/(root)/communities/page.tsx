import ThreadCard from "@/components/cards/ThreadCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { fetch_threads } from "@/lib/actions/thread.actions";
import { fetch_user } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {

    const user = await currentUser();
    if (!user) return null;
    const userInfo = await fetch_user(user.id);
    if (!userInfo?.onboarded) return redirect("/");
    const result = await fetch_threads(1, 30);


    return (
        <section>
            <ProfileHeader
                accountId={userInfo.userId}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imageUrl={userInfo.image}
                bio={userInfo.bio}
            />
            <h1 className="mt-4 text-heading2-bold text-light-1">Suggested Communities</h1>
            <p className="my-4 text-subtle-medium text-gray-1">No can only subscribe to communities.Only verified users can create communities. <Link href="/docs/verified-user-features" className="text-purple-500">Learn more</Link></p>
                <div className="flex flex-col gap-6">
                {result.threads.length === 0 ? (
                    <p className="no-result">No threads found at the moment...</p>
                ) : (
                    <>
                        {result.threads.map((thread) => (
                                <ThreadCard
                                    key={thread._id}
                                    id={thread._id}
                                    current_user_id={userInfo._id}
                                    author={thread.author}
                                    parent={thread.parent}
                                    content={thread.text}
                                    community={thread.community}
                                    createdAt={thread.createdAt}
                                    comments={thread.children}
                                    username={thread.author.username} />
                                    ))}
                    </>
                )}
                </div>
        </section>
    )

}