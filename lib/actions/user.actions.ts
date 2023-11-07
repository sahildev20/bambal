"use server"

import { revalidatePath } from "next/cache";
import { connect_to_db } from "../mongoose"
import User from "../models/user.model";
import Thread from "../models/thread.model";
import Community from "../models/community.model";
import { FilterQuery, SortOrder, startSession } from "mongoose";

interface Params {
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string
}

export async function update_user({
    userId,
    name,
    username,
    image,
    bio,
    path,
}: Params): Promise<void> {
    connect_to_db();

    try {
        await User.findOneAndUpdate(
            { userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true
            },
            { upsert: true }
        );

        if (path === 'profile/edit') {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Error while update_user: ${error.message}`)
    }
}
export async function fetch_user(userId: string) {
    connect_to_db();
    try {
        return await User.findOne({ userId })
        // .populate({
        //     path:'communities',
        //     model:'Community'
        // })
    } catch (error: any) {
        throw new Error(`Error while fetch_user: ${error.message}`)
    }
}

export async function fetch_user_threads(userId: string) {
    try {
        connect_to_db();
        const user_threads = await User.findOne({ userId }).populate({
            path: "threads",
            model: Thread,
            populate: [
                {
                    path: "community",
                    model: Community,
                    select: "name id image _id username"
                },
                {
                    path: "children",
                    model: Thread,
                    populate: {
                        path: "author",
                        model: User,
                        select: "name image userId username"
                    }
                }
            ],
        })
        return user_threads;
    } catch (error) {
        console.error(`Error while fetching user thread`)
        throw error
    }
}

export async function fetch_users({
    userId,
    search_string = "",
    page_number = 1,
    page_size = 20,
    sort_by = "desc"
}: {
    userId: string;
    search_string: string;
    page_number: number;
    page_size: number;
    sort_by: SortOrder;

}) {
    try {
        connect_to_db()

        const skip_amount = (page_number - 1) * page_size
        const regex = new RegExp(search_string, "i")
        const sort_options = { createdAt: sort_by };
        const query: FilterQuery<typeof User> = {
            userId: { $ne: userId }
        }

        if (search_string.trim() !== '') {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } }
            ]
        }

        const users_query = User.find(query).sort(sort_options).skip(skip_amount).limit(page_size)

        const total_users_count = await User.countDocuments(query)

        const users = await users_query.exec()

        const is_next = total_users_count > skip_amount + users.length

        return { users, is_next }

    } catch (error) {
        throw new Error(`Error while fetch_users(): ${error}`)
    }
}

export async function get_activities(userId: string) {
    try {
        connect_to_db();
        // find all thread of user

        const user_threads = await Thread.find({ author: userId })

        const child_thread_ids = user_threads.reduce((acc, user_thread) => {
            return acc.concat(user_thread.children);
        }, []);

        const replies = await Thread.find({
            _id: { $in: child_thread_ids },
            author: { $ne: userId }, // Exclude threads authored by the same user
        }).populate({
            path: "author",
            model: User,
            select: "name image _id",
        });

        return replies;
    } catch (error: any) {
        throw new Error(`Error while get_activities(): ${error.message}`)
    }
}

export async function like_the_thread(thread_id: string, user_id: string) {
    try {
        connect_to_db();

        const user = await User.findById(user_id)
        if (!user) throw new Error(`User not found so can not like_the_post`)
        const thread = await Thread.findById(thread_id)
        if (!thread) throw new Error(`Thread not found so can not like_the_post`)

        user.love_threads.push(thread_id)
        await user.save()
        const updated_thread = await Thread.findByIdAndUpdate(thread_id, { $inc: { likes_count: 1 } }, { new: true })

        return { liked: true, likes_count: updated_thread.likes_count }
    } catch (error) {
        console.log(`Error at like_the_thread : ${error}`)
        return { liked: false }
    }
}

export async function is_loved_thread(thread_id: string, user_id: string) {
    try {
        connect_to_db()
        const user = await User.findById(user_id)
        if (!user) throw new Error(`User not found so can not like_the_post`)
        const thread = await Thread.findById(thread_id)
        if (!thread) throw new Error(`Thread not found so can not like_the_post`)
        return user.love_threads.includes(thread_id)

    } catch (error) {
        console.error(`Error getting is_love_thread`)
        return false
    }

}

export async function follow_user(son_id: string, dad_id: string) {
    if (son_id === dad_id) {
        console.log("cannot follow yourself")
        throw new Error(`can not follow yourself`)
    }
    connect_to_db()
    const sonSession = await startSession()
    sonSession.startTransaction()
    try {
        const son = await User.findById(son_id)
        if (!son) throw new Error("son not found at follow_user()")
        const dad = await User.findById(dad_id)
        if (!dad) throw new Error("dad not found at follow_user()")

        const dad_index = son.followings.indexOf(dad_id)
        const son_index = dad.followers.indexOf(son_id)

        if (dad_index == -1 && son_index == -1) {
            son.followings.push(dad_id)
            dad.followers.push(son_id)
            await son.save(sonSession)
            await dad.save(sonSession)
            await sonSession.commitTransaction()
            sonSession.endSession()
            return 'follow'
        } else {

            son.followings.splice(dad_index, 1)
            dad.followers.splice(son_index, 1)
            await son.save(sonSession)
            await dad.save(sonSession)
            await sonSession.commitTransaction()
            sonSession.endSession()
            return 'unfollow'
        }




    } catch (error: any) {
        await sonSession.abortTransaction()
        sonSession.endSession()
        console.error(`Error at follow_user() : ${error.message}`)
        return 'error'


    }
}


export async function is_follower(son_id: string, dad_id: string, path: string) {
    connect_to_db()
    try {
        const son = await User.findById(son_id)
        return son.followings.includes(dad_id)
    } catch (error: any) {
        console.error(`Error at is_follower: ${error.message}`)

    }
}