"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { FloatingLetters } from "@/components/FloatingLetters";
import { Button } from "@/components/ui/button";
import { resetSave } from "@/lib/storage";

const coverImages = [
  "/assets/scene-campus-board-v1.webp",
  "/assets/scene-interview-v1.webp",
  "/assets/scene-library-v1.webp",
  "/assets/scene-jobfair-v1.webp",
  "/assets/scene-cafeteria-v1.webp",
  "/assets/scene-dinner-table-v1.webp",
  "/assets/scene-school-corridor-v1.webp",
  "/assets/scene-drawing-desk-v1.webp",
];

export default function Home() {
  return (
    <main className="noise relative min-h-screen overflow-hidden bg-ease-paper">
      <CoverCollage />
      <FloatingLetters />
      <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-5 py-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm tracking-[.22em] text-ease-blue md:text-base"
        >
          给正在焦虑中的你的一封未来来信
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-5 font-serif text-7xl font-bold text-ease-ink md:text-9xl"
        >
          Take Ease
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="mt-7 max-w-3xl text-xl font-medium leading-10 text-ease-ink/80 md:text-3xl md:leading-[1.55]"
        >
          人生不会因为一次选择而毁掉。
          <br />
          但你可以通过一次体验，看见更多可能。
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="mt-12 flex flex-wrap justify-center gap-5"
        >
          <Link href="/journey/university">
            <Button className="min-h-14 px-8 text-base md:text-lg">
              <ArrowRight size={18} />
              开始我的旅程
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="min-h-14 px-8 text-base md:text-lg"
            onClick={() => {
              resetSave();
            }}
          >
            <RotateCcw size={16} />
            重新开始
          </Button>
        </motion.div>
        <div className="mt-20 flex max-w-2xl flex-col gap-3 text-sm leading-7 text-ease-ink/64 md:text-base md:leading-8">
          <p>从大三的焦虑开始，回到评价、比较和被看见的最初时刻。</p>
          <p>最终生成你的成长轨迹、属性图和最后一封来信。</p>
        </div>
      </section>
    </main>
  );
}

function CoverCollage() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 grid grid-cols-2 gap-2 p-2 opacity-55 md:grid-cols-4 md:gap-3 md:p-3">
        {coverImages.map((src, index) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.8 }}
            className="min-h-40 overflow-hidden rounded-[8px] border border-white/55 bg-white/35 shadow-soft"
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
            />
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F4]/96 via-[#FAF8F4]/88 to-[#FAF8F4]/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F4]/84 via-[#FAF8F4]/30 to-[#F5EEDC]/94" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(137,168,178,.28),transparent_28%),radial-gradient(circle_at_76%_70%,rgba(163,177,138,.22),transparent_30%)]" />
    </div>
  );
}
