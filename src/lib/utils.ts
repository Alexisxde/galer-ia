import { $ } from "@/lib/dom-selector.ts"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const scrollToBottom = (selector: string) => {
	$(selector)?.scrollIntoView({ behavior: "smooth", block: "end" })
}
