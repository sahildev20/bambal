import UserCard from "@/components/cards/UserCard"
import { fetch_user, fetch_users } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { Sigmar } from "next/font/google"
import { redirect } from "next/navigation"



export default async function Page() {
    const user = await currentUser()
    if (!user) return null

    const userInfo = await fetch_user(user.id);

    if (!userInfo.onboarded) redirect('/onboarding')
    //Fetch users

    const result = await fetch_users({
        userId: user.id,
        search_string: "",
        page_number: 1,
        page_size: 20,
        sort_by: "desc"
    })


    return (
        <section className="">
            <h1 className="head-text mb-10">Search</h1>
            {/* TODO : render a search bar */}

            <div className="flex flex-col gap-4">
                {result.users.length === 0 ? (
                    <p className="no-result">No Users Found</p>

                ) : (
                    <>
                    {result.users.map((singleUser)=>(
                        <UserCard
                        key={singleUser.username}
                        id={singleUser.userId}
                        username={singleUser.username}
                        name={singleUser.name}
                        image={singleUser.image}
                        userType='User'
                        />
                    ))}
                    </>
                )}
            </div>
        </section>
    )
}