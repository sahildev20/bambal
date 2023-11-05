import mongoose from "mongoose"

const communiy_schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: String,
    bio: String,
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread",
        },
    ],
    members: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, {timestamps:true})

const Community = mongoose.models.Community || mongoose.model("Community", communiy_schema)
export default Community
