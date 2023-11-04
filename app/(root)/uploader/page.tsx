"use client"
import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { useUploadThing } from "@/lib/uploadthing";
import { useCallback, useState } from "react";

export default function Page() {
    const [files, setFiles] = useState<File[]>([]);
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFiles(acceptedFiles);
    }, []);

    const { startUpload, permittedFileInfo } = useUploadThing(
        "media",
        {
            onClientUploadComplete: () => {
                alert("uploaded successfully!");
            },
            onUploadError: () => {
                alert("error occurred while uploading");
            },
            onUploadBegin: () => {
                alert("upload has begun");
            },
        },
    );

    const fileTypes = permittedFileInfo?.config
        ? Object.keys(permittedFileInfo?.config)
        : [];

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    });

    return (
        <div className="z-10 bg-dark-2" {...getRootProps()}>
            <input {...getInputProps()} />
            <div>
                {files.length > 0 && (
                    <button onClick={() => startUpload(files)} >
                        <p className="text-light-2">Upload {files.length} files</p>
                    </button>
                )}
            </div>
            <p className="text-light-2">Drop files here!</p>
        </div>
    );
}