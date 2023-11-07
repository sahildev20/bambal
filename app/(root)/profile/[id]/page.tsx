import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetch_user, is_follower,follow_user } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect, usePathname, useRouter } from "next/navigation";
import { TabsList, TabsContent,TabsTrigger, Tabs} from "@/components/ui/tabs";
import { profile_tabs } from "@/constants";
import Image from "next/image";
import ProfileTabs from "@/components/shared/ProfileTabs";

export default async function Page(
    {params}:{params:{id:string}} ): Promise<any> {

    const current_user = await currentUser();
    if (!current_user) return null;
    const current_userInfo = await fetch_user(current_user.id);
    if (!current_userInfo?.onboarded) return redirect("/");

    const target_userInfo = await fetch_user(params.id)
    if(!target_userInfo) return null

    const pathname = '/profile'

    return(
        <section>
            <ProfileHeader
            son_id = {current_userInfo._id}
            dad_id = {target_userInfo._id}
            name={target_userInfo.name}
            username={target_userInfo.username}
            imageUrl={target_userInfo.image}
            bio= {target_userInfo.bio}
            path = {pathname}
            />
            <div className="mt-6">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {
                            profile_tabs.map((tab)=>(
                                <TabsTrigger key={tab.label} value={tab.value} className="tab-item">
                                    <Image src={tab.icon} alt={tab.label} width={24} height={24} className="max-sm:hidden mr-2"/>
                                    <p >{tab.label}</p>
                                    { tab.label === 'Threads' && (
                                        <p className="rounded-full bg-light-4 px-2 py-1 ml-2 !text-tiny-medium text-light-2">{target_userInfo.threads.length}</p>
                                    )}
                                </TabsTrigger>
                            ))
                        }
                    </TabsList>
                    {
                        profile_tabs.map((tab)=>(
                            <TabsContent key={`content-${tab.label}`} value={tab.value} className="text-light-1 w-full">
                                {/* @ts-ignore */}
                                <ProfileTabs
                                currentUserId={current_userInfo._id}
                                accountId={target_userInfo.userId}
                                username={target_userInfo.username}
                                accountType='User'
                                tabValue={tab.value}
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