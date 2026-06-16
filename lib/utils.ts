import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function clampText(text:string, n=80){ return text.length>n ? text.slice(0,n)+"..." : text; }
