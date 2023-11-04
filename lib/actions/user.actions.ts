"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connect_to_db } from "../mongoose"

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