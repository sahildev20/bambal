"use client";

import { follow_user, is_follower } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useEffect, useState } from "react";
import ShareCard from "../cards/ShareCard";
import { ProfileHeaderProps } from "@/types";
import Link from "next/link";

export default function ProfileHeader({
  authId,
  son_id,
  dad_id,
  name,
  username,
  imageUrl,
  bio,
  same_user
}: ProfileHeaderProps) {
  //frontend-part
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const fetch_status = async () => {
      const is_following = await is_follower(son_id, dad_id);
      console.log("son is following dad :", is_following);
      setFollowing(is_following);
    };
    fetch_status();
  }, [dad_id]);

  const toggleFollow = async () => {
    const result = await follow_user(son_id, dad_id);
    if (result == 'follow') {
      setFollowing(true)
    } else if (result == 'unfollow') {
      setFollowing(false)
    }
    console.log("follow resul", result)
    return
  };


  return (
    <div id="main" className="flex flex-col justify-start">
      <div className="w-full absolute top-0 left-0 h-40 bg-purple-500 z-0" />
      <div>
        <div className="rounded-full mt-24 object-cover relative top-0 left-0 w-20 h-20">
          <Image
            src={imageUrl}
            alt="Profile Pic"
            fill
            className="rounded-full object-cover"
          />
        </div>
      </div>
      <div id="back0" className="z-10 w-full -mt-6 sm:-mt-3 flex justify-end gap-2">
        {!same_user && (
          <div>
            {following ? (
              <button onClick={toggleFollow}
                className="outline outline-2 outline-slate-500 text-white font-bold px-6 rounded-full">
                Following..
              </button>
            ) : (
              <button onClick={toggleFollow}
                className="bg-white text-black font-bold px-6 rounded-full">
                Follow
              </button>
            )}
          </div>
        )}
        <ShareCard
          profile_url={`${process.env.NEXT_PUBLIC_APP_URL}profile/${username}`}
        />

        {same_user && (
          <Link href={`/profile/edit`}>
            <p className="outline outline-2 outline-slate-500 text-white font-bold px-6 rounded-full">Edit</p>
          </Link>
        )}
      </div>
      <div className="mt-2 flex flex-col items-start">
        <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
        <p className="text-small-semibold text-slate-500">@{username}</p>
        <div className="flex flex-1 mt-4">
          <p className=" text-base-regular text-light-2">{bio}</p>
        </div>
        <div className="mt-4 h-0.5 w-full bg-dark-3" />
      </div>
    </div>
  );
}
