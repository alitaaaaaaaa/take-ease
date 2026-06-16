import * as React from "react";
import { cn } from "@/lib/utils";
export function Button({className, variant="primary", ...props}: React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?:"primary"|"ghost"|"paper"}){
 const base="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] px-5 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-ease-blue disabled:opacity-50";
 const variants={primary:"bg-ease-ink text-white shadow-soft hover:bg-[#242424]",ghost:"bg-white/25 text-ease-ink backdrop-blur hover:bg-white/45",paper:"border border-ease-mist bg-ease-paper text-ease-ink hover:bg-white"};
 return <button className={cn(base,variants[variant],className)} {...props}/>;
}
