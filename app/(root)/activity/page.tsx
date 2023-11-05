import { fetch_user, get_activities } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"



export default async function Page() {

    const user = await currentUser()
    if(!user) return null
    const userInfo = await fetch_user(user.id)
    if(!userInfo?.onboarded) redirect('/onboarding')
    const activities = await get_activities(userInfo._id)
    console.log(activities)

    return(
        <section className="">
            <h1 className="head-text text-light-1">Activity</h1>
            <section className="flex flex-col gap-4 mt-6">
                {activities.length > 0 ? (
                    <>
                    {activities.map((activity)=> (
                        <Link key={activity._id} href={`/thread/${activity.parent}`}>
                            <article className="activity-card">
                                <Image
                                src={activity.author.image}
                                alt="User Image"
                                width={20}
                                height={20}
                                className="rounded-full object-cover" />
                                <p className="!text-small-regular text-light-1">
                                    <span className="mr-1 text-primary-500">
                                        {activity.author.name}
                                    </span>{"  "}
                                    replied to you thread
                                </p>

                            </article>
                        </Link>
                    ))}
                    </>
                ) : <p className="no-result">no activities to show please use the app and get back here!</p>}
            </section>

        </section>
    )
}