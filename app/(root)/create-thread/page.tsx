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
            <p className="head-text">Create Post</p>
            <PostThread userId={userInfo._id.toString()} />
        </>
    );
}

export default Page;
