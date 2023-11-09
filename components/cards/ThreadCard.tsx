import Image from "next/image";
import Link from "next/link";
import LikeButton from "../shared/LikeButton";
import { ThreadProps } from "@/types";
import { is_loved_thread } from "@/lib/actions/user.actions";

const ThreadCard = async ({
    id,
    current_user_id,
    content,
    author,
    comments,
    username,
    isComment,
    clickEnabled,
}: ThreadProps) => {

    const is_loved = await is_loved_thread(id, current_user_id)

    // const loveTheThread = async() =>{
    //     if(!is_loved){
    //         await like_the_thread(thread_id, user_id)

    //     }
    // }

    return (
        <article className={`flex w-full flex-col rounded-xl  ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-5'}`}>
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link href={`/profile/${author.userId}`} className="relative h-11 w-11">
                            <Image src={author.image} fill alt="Profile Picture" className="cusror-pointer rounded-full" />
                        </Link>
                        {/* thread bar to enhance ux */}
                        <div className="thread-card_bar" />
                    </div>
                    <div className="flex w-full flex-col">
                        <Link href={`/profile/${author.userId}`} className="flex gap-3">
                            <h4 className="cursor-pointer text-base-semibold text-light-1">
                                {author.name}
                            </h4>
                            <p className="text-gray-1 tiny-medium">@{username}</p>
                        </Link>
                        {clickEnabled ? (
                            <Link href={`/thread/${id}`}>
                                <p className="text-small-regular text-light-2">{content}</p>
                            </Link>
                        ) : (
                            <p className="text-small-regular text-light-2">{content}</p>

                        )}

                        <div className={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3`}>
                            <div className="flex items-center gap-3.5 w-fit">
                                <LikeButton thread_id={id.toString()} user_id={current_user_id.toString()} />
                                <Link href={`/thread/${id}`}>
                                    <Image src="/assets/reply.svg" alt="reply" width={24} height={24}
                                        className="cursor-pointer object-contain" />
                                </Link>
                                <Image src="/assets/repost.svg" alt="repost" width={24} height={24}
                                    className="cursor-pointer object-contain" />
                                <Image src="/assets/share.svg" alt="share" width={24} height={24}
                                    className="cursor-pointer object-contain" />
                            </div>

                            {isComment && comments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className="mt-1 text-subtel-medium text-gray-1">{comments.length} replies</p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </article>
    )
}
export default ThreadCard