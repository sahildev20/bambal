import Image from "next/image";

interface Props {
    accountId: string;
    authUserId: string;
    name: string;
    username: string;
    imageUrl: string;
    bio: string;
}

export default function ProfileHeader({
    accountId,
    authUserId,
    name, username,
    imageUrl, bio }: Props) {

    //frontend-part
    return (
        <div className="flex flex-col justify-start">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative h-20 w-20 object-cover">
                        <Image src={imageUrl} alt="Profile Picture" fill
                            className="rounded-full object-cover shadow-2xl" />
                    </div>
                    <div className="flex-1">
                        <div className="flex gap-10">
                        <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
                        <button className="bg-secondary-500 px-6 rounded-full">Follow</button>
                        </div>
                        <p className="text-base-medium text-gray-1">@{username}</p>
                    </div>
                    
                </div>
            </div>
            {/* TODO: we need to add community functionality here! */}
            <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
            <div className="mt-6 h-0.5 w-full bg-dark-3" />
        </div>
    )
}