
import Image from "next/image";


interface Props {
  name: string;
  username: string;
  imageUrl: string;
  bio: string;
  isFollowing:boolean;
}

export default function ProfileHeader({
  name,
  username,
  imageUrl,
  bio,
  isFollowing,
}: Props) {
  //frontend-part
  return (
    <div id="main" className="flex flex-col justify-start">
      <div className="w-full absolute top-0 left-0 h-64 bg-purple-500 z-0" />
      <div>
        <Image
          src={imageUrl}
          alt="Profile Pic"
          width={84}
          height={84}
          className="rounded-full mt-24 object-cover relative top-0 left-0"
        />
      </div>
      <div id="back0" className="z-10 w-full -mt-6 flex justify-end">
        <button className="bg-white text-black font-bold px-6 rounded-full mr-4">
          Follow
        </button>
        <button className="outline outline-2 outline-slate-500 text-white font-bold px-6 rounded-full">
          Edit
        </button>
      </div>
      <div className="mt-2 flex flex-col items-start">
        <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
        <p className="text-small-semibold text-slate-500">@{username}</p>
        <div className="flex items-center justify-between"></div>
        <p className="mt-4 max-w-lg text-base-regular text-light-2">{bio}</p>
        <div className="mt-4 h-0.5 w-full bg-dark-3" />
      </div>
    </div>
  );
}
