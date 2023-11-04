"use server"
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connect_to_db } from "../mongoose"


interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string
}
export async function create_thread({text,author,communityId,path}:Params){
    try {
        connect_to_db();
        const createdThread = await Thread.create({
            text,
            author,
            // todo implement community logic to store it in db....
            community: null,
        })
        await User.findByIdAndUpdate(author,{
            $push:{ threads: createdThread._id}
        })
        revalidatePath(path)
    } catch (error:any) {
        throw new Error(`OOps during create_thread: ${error.message}`)
    }   
}
export async function fetch_threads(page_number=1, page_size=20){
    try {
        connect_to_db();
        // Calculate the number of threads we need to skip
        const skip_amount = (page_number - 1) * page_size;
        //Threads that does not have parent
        const threads_query = Thread.find({ parent: { $in: [null, undefined]}})
        .sort({createdAt:'desc'}).skip(skip_amount).limit(page_size)
        .populate({ path:'author', model: User })
        .populate({
            path:'children',
            populate:{
                path:'author',
                model:User,
                select:"_id name parent image"
            }
        })

        const total_thread_count = await Thread.countDocuments({
            parent:{$in:[null, undefined]}
        })
        const threads = await threads_query.exec()

        const is_next = total_thread_count > skip_amount + threads.length;

        return {threads, is_next}
        // revalidatePath(path)
    } catch (error:any) {
        throw new Error(`OOps during create_thread: ${error.message}`)
    }   
}