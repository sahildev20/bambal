import ThreadCard from "@/components/cards/ThreadCard"
import Comment from "@/components/forms/Comment";
import { fetch_thread_by_id } from "@/lib/actions/thread.actions";
import { fetch_user } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
    if (!params.id) return null;

    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetch_user(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');

    const thread = await fetch_thread_by_id(params.id);
    return (
        <section className="relative">
            <div>
                <p className="head-text mb-6">Post</p>
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    current_user_id={user?.id}
                    author={thread.author}
                    parent={thread.parent}
                    content={thread.text}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                    username={thread.author.username}
                    clickEnabled={false}
                />
            </div>
            <div className="mt-6">
                <Comment
                    threadId={thread.id}
                    currentUserImage={userInfo.image}
                    currentUserId={userInfo._id}
                />
            </div>
            <div className="mt-6">
                {thread.children.map((comment: any) => (
                    <ThreadCard
                        key={comment._id}
                        id={comment._id}
                        current_user_id={user?.id}
                        author={comment.author}
                        parent={comment.parent}
                        content={comment.text}
                        community={comment.community}
                        createdAt={comment.createdAt}
                        comments={comment.children}
                        isComment
                        username={comment.author.username}
                        clickEnabled
                    />
                ))}
            </div>
        </section>
    )
}


export default Page;