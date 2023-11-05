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
import { Textarea } from "../ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
import { create_thread } from "@/lib/actions/thread.actions";


export default function PostThread({ userId }: { userId: string }) {


    // todo adding image in thread

    // const [files, setFiles] = useState<File[]>([]);
    // const {startUpload} = useUploadThing("media");
    const router = useRouter();
    const pathname = usePathname();


    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: '',
            author: userId
        },
    });

    const onSubmit = async(values:z.infer<typeof ThreadValidation>)=>{
        await create_thread({
            text:values.thread,
            author:userId,
            communityId:null,
            path:pathname,
        });
        
        router.push("/");
    }
    return (
        <Form {...form}>
            <form
                className="flex flex-col justify-start gap-10"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full mt-10">
                            <FormControl className="no-focus border border-dark-3 text-light-1">
                                <Textarea
                                    rows={10}
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-secondary-500 w-fit">
                    Post
                </Button>
            </form>
        </Form>
    )

}