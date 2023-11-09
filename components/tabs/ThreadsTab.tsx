import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetch_community_threads } from "@/lib/actions/community.actions";
import { fetch_user_threads } from "@/lib/actions/user.actions";

interface Result {
    name: string;
    image: string;
    id: string;
    username: string;
    threads: {
        _id: string;
        text: string;
        parentId: string;
        author: {
            name: string;
            image: string;
            id: string;
            username: string;
        };
        community: {
            id: string;
            name: string;
            image: string;
        } | null;
        createdAt: string;
        children: {
            author: {
                image: string;
            };
        }[];
    }[];
}
interface Props {
    currentUserId: string;
    accountId: string;
    username: string;
    accountType: string;
}
export default async function ThreadsTab({ currentUserId, accountId, username, accountType }: Props) {
    let result: Result;
    if (accountType === 'Community') {
        result = await fetch_community_threads(accountId);
    } else {
        result = await fetch_user_threads(accountId);
    }

    if (!result) redirect('/')

    return (
        <section className="mt-6 flex flex-col gap-2">
            {result.threads.map((thread) => (
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    current_user_id={currentUserId}
                    parent={thread.parentId}
                    content={thread.text}
                    author={
                        accountType === "User" ? {
                            name: result.name,
                            image: result.image,
                            userId: result.id,
                            username: result.username
                        } : {
                            name: thread.author.name,
                            image: thread.author.image,
                            userId: thread.author.id,
                            username: thread.author.username
                        }
                    }
                    community={
                        accountType === "Community" ? {
                            name: result.name,
                            id: result.id,
                            image: result.image
                        } : thread.community
                    }
                    createdAt={thread.createdAt}
                    comments={thread.children}
                    username={username}
                    clickEnabled
                />
            ))}
        </section>
    )
}