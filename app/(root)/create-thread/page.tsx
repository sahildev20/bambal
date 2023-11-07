import PostThread from "@/components/forms/PostThread";
import { fetch_user } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
    const user = await currentUser();
    if (!user) return null;
    const userInfo = await fetch_user(user.id);
    if (!userInfo?.onboarded) return redirect("/");
    return (
        <>
            <h1 className="text-light-1 text-heading1-bold">Create Post</h1>
            <PostThread userId={userInfo._id.toString()} />
        </>
    );
}

export default Page;
