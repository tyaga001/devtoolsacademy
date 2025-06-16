import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export function formatDate(date: Date | string): string {
  if (date)
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  else {
    return ""
  }
}

export function formatTime(date: Date | string): string {
  if (date)
    return new Date(date).toLocaleDateString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  else {
    return ""
  }
}
