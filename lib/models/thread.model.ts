// import { Timestamp } from "mongodb";
import mongoose from "mongoose";
import { boolean } from "zod";

const thread_schema = new mongoose.Schema({
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    text: {
        type:String,
        required:true,
    },
    likes_count: {
        type:Number,
        default:0
    },
    replies_count:{
        type:Number,
        default:0
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Community'
    },
    parent: {
        type:String
    },
    children: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Thread'
        }
    ],
},{timestamps:true});

const Thread = mongoose.models.Thread || mongoose.model('Thread', thread_schema);
export default Thread;