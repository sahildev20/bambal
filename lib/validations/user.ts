import * as z from 'zod';
export const  UserValidation = z.object({
    profile_photo: z.string().url().min(1),
    name: z.string().min(3, {message :"Name is too short!"}).max(30,{message:"Name is too long!"}),
    username: z.string().min(3).max(30),
    bio: z.string().min(10,{message:"Bio is too short : minimum 10 characters!"}).max(1000)
});