import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: String,
    bio: String,
    onboarded: { type: Boolean, default: false },
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        },
    ],
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community'
        }
    ]
}, {timestamps:true});

const User = mongoose.models.User || mongoose.model('User', user_schema);
export default User;