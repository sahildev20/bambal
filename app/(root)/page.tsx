import ThreadCard from "@/components/cards/ThreadCard";
import { fetch_threads } from "@/lib/actions/thread.actions";
import { fetch_user, fetch_user_identity, is_loved_thread } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ThreadSkeleton from "@/components/skeleton/ThreadSkeleton";

export default async function Home() {
  const user = await currentUser();
  if (!user) return redirect('/sign-in');
  const userInfo = await fetch_user_identity(user.id);
  if (!userInfo?.onboarded) return redirect('/onboarding');
  const result = await fetch_threads(1, 30);
  return (
    <>
      <h1 className="head-text text-left">For You</h1>
      <Suspense fallback={<ThreadSkeleton />}>
      <section className="mt-6 flex flex-col gap-6">
        {result.threads.length === 0 ? (
          <p className="no-result">No threads found at the moment...</p>
        ) : (
          <>
            {result.threads.map((thread) =>(
            <ThreadCard
              key={thread._id}
              id={thread._id}
              current_user_id={userInfo._id}
              author={thread.author}
              content={thread.text}
              comments={thread.children}
              username={thread.author.username}
            />
            ))}
          </>

        )}
      </section>
      </Suspense>
    </>
  );
}
