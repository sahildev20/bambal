"use server"

import { revalidatePath } from "next/cache";
import { connect_to_db } from "../mongoose"
import User from "../models/user.model";
import Thread from "../models/thread.model";
import Community from "../models/community.model";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
    userId:string,
    username:string,
    name:string,
    bio:string,
    image:string,
    path:string
}

export async function update_user({
    userId,
    name,  
    username, 
    image,
    bio,
    path, 
}:Params):Promise<void> {
    connect_to_db();

    try {
        console.log("image url is :", image)
        await User.findOneAndUpdate(
            { userId},
            {
                username:username.toLowerCase(),
                name,
                bio,
                image,
                onboarded:true
            },
            { upsert: true }
        );
    
        if (path === 'profile/edit'){
            revalidatePath(path);
        }       
    } catch (error:any) {
        throw new Error(`Error while update_user: ${error.message}`)
    }
}
export async function fetch_user(userId:string){
    connect_to_db();
    try {
        return await User.findOne({userId})
        // .populate({
        //     path:'communities',
        //     model:'Community'
        // })
    } catch (error:any) {
        throw new Error(`Error while fetch_user: ${error.message}`)    
    }
}

export async function fetch_user_threads(userId:string){
    try {
        connect_to_db();
        const user_threads = await User.findOne({userId}).populate({
            path: "threads",
            model: Thread,
            populate: [
                {
                    path:"community",
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
    search_string="",
    page_number=1,
    page_size=20,
    sort_by="desc"
}:{
    userId: string;
    search_string: string;
    page_number: number;
    page_size: number;
    sort_by: SortOrder;

}){
    try {
        connect_to_db()

        const skip_amount = (page_number-1)*page_size
        const regex = new RegExp(search_string, "i")
        const sort_options = {createdAt : sort_by};
        const query:FilterQuery<typeof User> = {
            userId:{$ne : userId}
        }

        if(search_string.trim() !== ''){
            query.$or = [
                {username: {$regex : regex}},
                {name: {$regex : regex}}
            ]
        }

        const users_query = User.find(query).sort(sort_options).skip(skip_amount).limit(page_size)

        const total_users_count = await User.countDocuments(query)

        const users = await users_query.exec()

        const is_next = total_users_count > skip_amount + users.length

        return {users, is_next}

    } catch (error) {
        throw new Error(`Error while fetch_users(): ${error}`)
    }
}

export async function get_activities(userId:string){
    try {
        connect_to_db();
        // find all thread of user

        const user_threads = await Thread.find({author:userId})

        const child_thread_ids = user_threads.reduce((acc, user_thread)=>{
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