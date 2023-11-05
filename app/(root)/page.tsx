import ThreadCard from "@/components/cards/ThreadCard";
import { fetch_threads } from "@/lib/actions/thread.actions";
import { fetch_user } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const result = await fetch_threads(1, 30);
  // console.log(result.threads)


  // check out this later
  const user = await currentUser();
  if (!user) return redirect('/sign-in');
  const userInfo = await fetch_user(user.id);
  if (!userInfo.onboarded) return redirect('/onboarding');
  return (
    <>
      <h1 className="head-text text-left">For You</h1>
      <section className="mt-6 flex flex-col gap-6">
        {result.threads.length === 0 ? (
          <p className="no-result">No threads found at the moment...</p>
        ) : (
          <>
            {result.threads.map((thread) => 
              <ThreadCard
                key={thread._id}
                id={thread._id}
                current_user_id={ user?.id}
                author={thread.author}
                parent={thread.parent}
                content={thread.text}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
                username={thread.author.username}
              />
            )}
          </>

        )}
      </section>
    </>
  );
}
