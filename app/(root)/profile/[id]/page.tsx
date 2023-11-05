import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetch_user } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { TabsList, TabsContent,TabsTrigger, Tabs} from "@/components/ui/tabs";
import { profile_tabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadTab";

export default async function Page(
    {params}:{params:{id:string}} ): Promise<any> {

    const user = await currentUser();
    if (!user) return null;
    const userInfo = await fetch_user(params.id);
    if (!userInfo?.onboarded) return redirect("/");

    return(
        <section>
            <ProfileHeader
            accountId={userInfo.userId}
            authUserId={user.id}
            name={userInfo.name}
            username={userInfo.username}
            imageUrl={userInfo.image}
            bio={userInfo.bio}
            />
            <div className="mt-6">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {
                            profile_tabs.map((tab)=>(
                                <TabsTrigger key={tab.label} value={tab.value} className="tab">
                                    <Image src={tab.icon} alt={tab.label} width={24} height={24} />
                                    <p className="max-sm:hidden">{tab.label}</p>
                                    { tab.label === 'Threads' && (
                                        <p className="rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">{userInfo.threads.length}</p>
                                    )}
                                </TabsTrigger>
                            ))
                        }
                    </TabsList>
                    {
                        profile_tabs.map((tab)=>(
                            <TabsContent key={`content-${tab.label}`} value={tab.value} className="text-light-1 w-full">
                                {/* @ts-ignore */}
                                <ThreadsTab
                                currentUserId={user.id}
                                accountId={userInfo.userId}
                                username={userInfo.username}
                                accountType='User'
                                />
                                {/* TODO : RepliesTab and TaggedTab implementation */}
                            </TabsContent>
                        ))
                    }
                </Tabs>
            </div>
        </section>
    )

}