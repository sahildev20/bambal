import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function is_base64_image(image_data: string){
  const pattern = /^data:image\/(\w+);base64,([A-Za-z0-9+/=]+)$/;

  return pattern.test(image_data);
}
