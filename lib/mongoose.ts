import mongoose from 'mongoose'

let isConnected = false;

export const connect_to_db = async()=>{
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URI) return console.log("mongodb url not found!");

    if(isConnected) return console.log("Already connected to mongodb");

    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        isConnected = true;
        console.log("Connected to mongodb!");
        
    } catch (error) {
        console.log("error connecting mongodb: ", error)
    }
}
