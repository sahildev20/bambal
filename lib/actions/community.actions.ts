"use server"

import Thread from "../models/thread.model"
import User from "../models/user.model"
import Community from "../models/community.model"
import { connect_to_db } from "../mongoose"
import { FilterQuery, SortOrder } from "mongoose"

export async function create_community(
    id: string,
    name:string,
    username: string,
    image: string,
    bio: string,
    creator: string
){
    try {
        connect_to_db();
        //
        const user = await User.findOne({id:creator});

        if(!user) throw new Error(`User not Found! in create_community()`);

        const new_community = new Community({
            id,
            name,
            username,
            image,
            bio,
            creator: user._id
        });

        const saved_community = await new_community.save();
        user.communities.push(saved_community);
        await user.save();
        return saved_community;
    } catch (error:any) {
        throw new Error(`Error creating community ${error.message}`)
    }
}

export async function fetch_community_threads(id: string){
    try {
        connect_to_db();

        const community_threads = await Community.findById(id).populate({
            path: "threads",
            model: Thread,
            populate: [
                {
                    path:"author",
                    model: "User",
                    select: "name image userId username"
                },
                {
                    path: "children",
                    model: Thread,
                    populate:{
                        path: "author",
                        model: "User",
                        select: "image _id username"
                    }
                }
            ]
        });

        return community_threads;

    } catch (error : any) {
        throw new Error(`Error getting community_threads() ${error.message}`)
    }
}

export async function fetch_community_by_id(id: string){
    connect_to_db();
    try {
        const community = Community.findOne({id})
        return community
    } catch (error:any) {
        throw new Error(`Error at fetch_community_by_id : ${error.message}`)
    }
}

export async function fetch_communities({
    search_string= "",
    page_number = 1,
    page_size = 20,
    sort_by = "desc",

}:{
    search_string?: string;
    page_number?: number;
    page_size?: number;
    sort_by?: SortOrder;
}){
    connect_to_db();
    try {
        const skip_amount = (page_number-1)*page_size

        const regex = new RegExp(search_string, "i");

        const query: FilterQuery<typeof Community> = {}

        if (search_string.trim() !== ""){
            query.$or = [
                {username: {$regex:regex}},
                {name: {$regex:regex}}
            ]
        }

        const sort_options = {createdAt : sort_by}

        const communities_query = Community.find(query).sort(sort_options).skip(skip_amount).limit(page_size).populate("followers");

        const total_communities = await Community.countDocuments(query);

        const communities = await communities_query.exec();

        const is_next = total_communities > skip_amount + communities.length

        return {communities, is_next}

    } catch (error:any) {
        throw new Error(`Error at fetch_community_by_id : ${error.message}`)
    }
}

//recieve objectId of community and user and add user to communnity and return community
export async function follow_community(community_id:string, user_id:string){
    connect_to_db();
    try {
        const community = await Community.findById(community_id)
        if(!community) throw new Error(`Community not found so failed to follow_community`);

        const user = await User.findById(user_id);
        if(!user) throw new Error(`User not found at so failed to follow_community`);

        if(community.follwers.includes(user_id)){
            throw new Error(`User is already a follower of that community!`)
        }
        community.followers.push(user_id)
        await community.save()

        user.communities.push(community._id)
        await user.save()

        return community

    } catch (error) {
        console.error(`Error at follow_community: ${error}`)
        throw error
    }
}

export async function unfollow_community(community_id:string, user_id:string){
    try {
        connect_to_db();
        await Community.updateOne(
            {_id: community_id},
            {$pull : {followers: user_id}}
        )

        await User.updateOne(
            {_id:user_id},
            {$pull: {communites: community_id}}
        )

        return {success : true}
    } catch (error) {
        console.error(`Error at unfollow_community: ${error}`);
        throw error;
    }
}


