"use client";
import { motion } from "framer-motion";
export function FloatingLetters(){
 const items = Array.from({length:9});
 return <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>{items.map((_,i)=><motion.div key={i} className="absolute h-14 w-20 rounded-[4px] border border-white/70 bg-white/45 shadow-soft backdrop-blur-sm" style={{left:`${8+i*11}%`, top:`${12+(i%4)*18}%`}} animate={{y:[0,-18,0], rotate:[-4+i%3, 4-i%2, -4+i%3], opacity:[.35,.72,.35]}} transition={{duration:7+i, repeat:Infinity, ease:"easeInOut"}}><span className="mx-auto mt-3 block h-px w-12 bg-ease-mist"/><span className="mx-auto mt-2 block h-px w-8 bg-ease-mist"/></motion.div>)}</div>
}
