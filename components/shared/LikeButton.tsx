"use client"

import { is_loved_thread, like_the_thread } from "@/lib/actions/user.actions";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LikeButtonProps } from "@/types";



export default function LikeButton({ thread_id, user_id }: LikeButtonProps) {
    const [liked, setLiked] = useState(false)

    useEffect(() => {
      async function likeStatus(){
        const result = await is_loved_thread(thread_id, user_id)
        setLiked(result)
      }
      likeStatus()
    }, [])

    const handleLikeClick = async() =>{
        if(!liked){
            await like_the_thread(thread_id, user_id)
            setLiked(true)
        }
    }
    
    
    return (
            <div onClick={handleLikeClick}>
            {liked ? (
                <Image src="/assets/heart-filled.svg" alt="heart" width={24}
                    height={24} className="cursor-pointer object-contain" />
            ) : (
                <div>
                    <Image src="/assets/heart-gray.svg" alt="heart" width={24}
                        height={24} className="cursor-pointer object-contain" />
                </div>

            )}
            </div>
    )
}