"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./ui/button";

export function LetterModal({
  letter,
  onClose,
  onNext,
}: {
  letter: string;
  onClose: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 grid place-items-center bg-[#3A3A3A]/35 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="noise relative max-h-[86vh] w-full max-w-2xl overflow-auto rounded-[8px] border border-[#d7c7aa] bg-[#f7edcf] p-6 shadow-soft md:p-10"
      >
        <button
          aria-label="关闭"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-2 hover:bg-white/40"
        >
          <X size={18} />
        </button>
        <p className="font-serif text-2xl text-ease-ink">来自未来的信</p>
        <div className="mt-6 whitespace-pre-wrap font-serif text-lg leading-9 text-ease-ink/85">
          {letter}
        </div>
        <div className="mt-8 flex justify-end">
          <Button onClick={onNext}>收好这封信</Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
