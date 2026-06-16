"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeartPulse, Volume2, VolumeX } from "lucide-react";
import { Choice, Scene } from "@/lib/types";
import { Button } from "./ui/button";
import { LetterModal } from "./LetterModal";
import { Typewriter } from "./Typewriter";

export function NarrativeScene({
  scene,
  index,
  total,
  onChoose,
  onNext,
}: {
  scene: Scene;
  index: number;
  total: number;
  onChoose: (choice: Choice) => void;
  onNext: () => void;
}) {
  const [line, setLine] = useState(0);
  const [picked, setPicked] = useState<Choice | null>(null);
  const [sound, setSound] = useState(false);
  const text = scene.narration[Math.min(line, scene.narration.length - 1)];
  const done = line >= scene.narration.length - 1;
  const progress = useMemo(
    () => Math.round(((index + 1) / total) * 100),
    [index, total],
  );

  const choose = (choice: Choice) => {
    setPicked(choice);
    onChoose(choice);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-ease-ink text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${scene.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/60" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-5 md:px-8">
        <header className="flex items-center justify-between gap-3 text-xs text-white/80">
          <span>
            {scene.time} · {progress}%
          </span>
          <button
            onClick={() => setSound(!sound)}
            className="rounded-full bg-white/15 p-2 backdrop-blur"
            aria-label="背景音乐开关"
          >
            {sound ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>
        </header>
        <div className="mt-auto grid gap-4 md:grid-cols-[1fr_330px]">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[8px] border border-white/25 bg-[#2f2c28]/72 p-5 shadow-soft backdrop-blur-md md:p-7"
          >
            <div className="mb-3 flex flex-wrap gap-2">
              {scene.emotion.map((emotion) => (
                <span
                  key={emotion}
                  className="rounded-full bg-white/15 px-3 py-1 text-xs text-white/85"
                >
                  {emotion}
                </span>
              ))}
            </div>
            <h1 className="text-2xl font-semibold md:text-4xl">
              {scene.title}
            </h1>
            <p className="mt-5 min-h-24 text-lg leading-9 text-white/90">
              <Typewriter text={text} />
            </p>
            {!done ? (
              <Button
                className="mt-5"
                variant="ghost"
                onClick={() => setLine(line + 1)}
              >
                继续
              </Button>
            ) : (
              <div className="mt-6 space-y-3">
                <p className="flex gap-2 text-sm text-white/75">
                  <HeartPulse size={18} />
                  {scene.worry}
                </p>
                {scene.choices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => choose(choice)}
                    className="block w-full rounded-[8px] border border-white/20 bg-white/12 p-4 text-left transition hover:bg-white/22"
                  >
                    <span className="text-sm font-medium">{choice.text}</span>
                    <span className="mt-1 block text-xs text-white/62">
                      {choice.tag}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </motion.section>
          <aside className="rounded-[8px] border border-white/20 bg-white/14 p-5 backdrop-blur-md">
            <p className="text-sm text-white/68">章节进度</p>
            <div className="mt-3 h-2 rounded-full bg-white/20">
              <div
                className="h-2 rounded-full bg-ease-sage"
                style={{ width: `${progress}%` }}
              />
            </div>
            {scene.npc && (
              <div className="mt-6">
                <p className="text-sm font-medium">
                  {scene.npc.name} 的内心
                </p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  表面：{scene.npc.surface}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  心里：{scene.npc.inner}
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
      <AnimatePresence>
        {picked && (
          <LetterModal
            letter={`${picked.outcome}\n\n${picked.letter}`}
            onClose={() => setPicked(null)}
            onNext={() => {
              setPicked(null);
              onNext();
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
