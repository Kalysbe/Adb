import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string, language = "ru") {
  const date = new Date(dateString)

  if (language === "ru") {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  } else {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }
}

export function truncateText(text: string, maxLength = 150): string {
  // Remove markdown formatting
  const plainText = text.replace(/#|##|###|_|\*\*|\[|\]|$$|$$/g, "")

  if (plainText.length <= maxLength) return plainText

  return plainText.substring(0, maxLength) + "..."
}
