import * as z from 'zod';

// thread validation

export const ThreadValidation = z.object({
    thread:z.string().min(3, {message:"Minimum 3 characters!"}),
    author:z.string(),
})

export const CommentValidation = z.object({
    thread:z.string().min(3, {message:"Minimum 3 characters!"})
})