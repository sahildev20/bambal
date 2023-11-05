
import { generateComponents } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/lib/server/uploadthing";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();