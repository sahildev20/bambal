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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { is_base64_image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { update_user } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { Bars } from 'react-loader-spinner'

interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    buttonTitle: string;
}
const AccountProfile = ({ user, buttonTitle }: Props) => {
    // states 
    const [uploading, setUploading] = useState(false)
    const [files, setFiles] = useState<File[]>([]);
    const router = useRouter();
    const pathname = usePathname();
    const { startUpload, permittedFileInfo } = useUploadThing(
        "media",
        {
            onClientUploadComplete: () => {
                setUploading(false)
            },
            onUploadError: () => {

                console.log("error occurred while uploading");
                alert("error uploading image please try again!");
                router.refresh()
            },
            onUploadBegin: () => {
                setUploading(true)
            },
        },
    );


    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image || "",
            name: user?.name || "",
            username: user?.username || "",
            bio: user?.bio || "",
        },
    });
    // handle image upload
    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();
        const fileReader = new FileReader();
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files));

            if (!file.type.includes('image')) return;
            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || '';
                fieldChange(imageDataUrl);
            }

            fileReader.readAsDataURL(file);
        }
    };
    const onSubmit = async (values: z.infer<typeof UserValidation>) => {

        const blob = values.profile_photo;
        const has_image_changed = await is_base64_image(blob);


        if (has_image_changed) {
            const imageRes = await startUpload(files);
            if (imageRes && imageRes[0].url) {
                values.profile_photo = imageRes[0].url;
                console.log(imageRes[0].url)
            }
        }

        // to do backend to upload imageurl to mongodb
        console.log(`Url to be uploaded : ${values.profile_photo}`)
        await update_user({
            name: values.name,
            username: values.username,
            image: values.profile_photo,
            bio: values.bio,
            userId: user.id,
            path: pathname,
        });

        if (pathname === '/profile/edit') {
            router.back();
        } else {
            router.push('/');
        }
    }

    return (
        <Form {...form}>
            <form
                className="flex flex-col justify-start gap-10"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                {/* first section for user profile picture */}
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel className="account-form_image-label">
                                {field.value ? (
                                    <img
                                        src={field.value}
                                        alt="profile picture"
                                        width={96}
                                        height={96}
                                        className="rounded-full object-contain"
                                    />
                                ) : (
                                    <img
                                        src="/assets/profile.svg"
                                        alt="profile picture"
                                        width={24}
                                        height={24}
                                        className="rounded-full object-contain"
                                    />
                                )}
                            </FormLabel>

                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    placeholder="Upload profile photo"
                                    className="account-form_image-input"
                                    onChange={(e) => handleImage(e, field.onChange)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* name section for user */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                                Name
                            </FormLabel>

                            <FormControl>
                                <Input
                                    type="text"
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* username section */}

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                                Username
                            </FormLabel>

                            <FormControl>
                                <Input
                                    type="text"
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* user bio section */}

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                                Bio
                            </FormLabel>

                            <FormControl>
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
                <Button type="submit" className="bg-secondary-500">
                    {buttonTitle}
                </Button>
                <div className="flex items-center justify-center">
                    <Bars
                        height="20"
                        width="20"
                        color="#4fa94d"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={uploading}
                    />
                </div>
            </form>
        </Form>
    );
};

export default AccountProfile;
