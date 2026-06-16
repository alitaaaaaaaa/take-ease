"use client";
import { useEffect, useState } from "react";
export function Typewriter({text, speed=22}:{text:string; speed?:number}){
 const [shown,setShown]=useState("");
 useEffect(()=>{ setShown(""); let i=0; const id=setInterval(()=>{ i++; setShown(text.slice(0,i)); if(i>=text.length) clearInterval(id); }, speed); return ()=>clearInterval(id); },[text,speed]);
 return <span className={shown.length<text.length?"type-caret":""}>{shown}</span>;
}
