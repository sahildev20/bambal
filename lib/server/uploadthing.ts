import { createUploadthing } from "uploadthing/next";
import type { FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
    media: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1,
        },
        video: {
            maxFileSize: "16MB",
        },
    })
        .middleware(({ req }) => {
            req;
            return { foo: "bar" as const };
        })
        .onUploadComplete(({ file, metadata }) => {
            metadata;
            console.log("upload completed", file.url);
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;