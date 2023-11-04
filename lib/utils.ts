import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function is_base64_image(image_data: string){
  const base64Regx = /^data:image\/(png|jpg?g|gif|webp);base64,/;
  return base64Regx.test(image_data);
}

