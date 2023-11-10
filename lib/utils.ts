import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function is_base64_image(image_data: string) {
  const pattern = /^data:image\/(\w+);base64,([A-Za-z0-9+/=]+)$/;

  return pattern.test(image_data);
}

export function format_date_string(date_string: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  const date = new Date(date_string)
  const formatted_date = date.toLocaleDateString(undefined, options)
  const time = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })
  return `${time} - ${formatted_date}`
}

export function format_thread_cnt(count: number): string {
  if (count === 0) {
    return "No Threads"
  } else {
    const threadCount = count.toString().padStart(2, '0');
    const threadWord = count === 1 ? "Thread" : "Threads";
    return `${threadCount} ${threadWord}`
  }
}