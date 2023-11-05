"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { usePathname, useRouter } from "next/navigation";
import { CommentValidation } from "@/lib/validations/thread";
import { add_reply_to_thread, create_thread } from "@/lib/actions/thread.actions";
import Image from "next/image";




interface Props {
    threadId:string;
    currentUserImage:string,
    currentUserId: string
}


export default function Comment({threadId, currentUserImage, currentUserId}:Props) {
;
    const router = useRouter();
    const pathname = usePathname();


    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread:'',
        },
    });

    const onSubmit = async(values:z.infer<typeof CommentValidation>)=>{
        await add_reply_to_thread(
            threadId,
            values.thread,
            currentUserId,
            pathname
        );

        form.reset();
    }

    return(
            <Form {...form}>
            <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)} >
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex w-full items-center gap-3 ">
                            <FormLabel>
                                <Image src={currentUserImage} alt="profile picture" width={36} height={36}
                                className="rounded-full object-cover"/>
                            </FormLabel>
                            <FormControl className="border-none bg-transparent">
                                <Input
                                    type="text"
                                    placeholder="Relply..."
                                    className="no-focus text-light-1 outline-none"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="comment-form_btn" >
                    Reply
                </Button>
            </form>
        </Form>
    )
}