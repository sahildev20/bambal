import ThreadsTab from "../tabs/ThreadsTab";
import RepliesTab from "../tabs/RepliesTab";
import TaggedTab from "../tabs/TaggedTab";


interface Props {
    currentUserId: string;
    accountId: string;
    username: string;
    accountType: string;
    tabValue: string;
}
export default async function ProfileTabs({ currentUserId, accountId, username, accountType, tabValue }: Props) {
    if (tabValue === 'threads') {
        return (
            <ThreadsTab
                currentUserId={currentUserId} accountId={accountId}
                username={username} accountType={accountType} />
        )
    } else if (tabValue === 'replies') {
        return (
            <RepliesTab />
        )
    } else if (tabValue === 'tagged') {
        return (
            <TaggedTab />
        )
    } else {
        return null
    }
}