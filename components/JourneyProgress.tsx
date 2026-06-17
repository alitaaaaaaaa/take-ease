"use client";

import Link from "next/link";
import { Check, Circle, Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChapterId, SaveState } from "@/lib/types";
import { wordChapters } from "@/lib/wordData";

type StageId = ChapterId | "report";

type JourneyProgressProps = {
  current: StageId;
  save: SaveState;
};

const reportStep = {
  id: "report" as const,
  subtitle: "成长轨迹",
  title: "最后一封信",
  emoji: "✨",
};

export function JourneyProgress({ current, save }: JourneyProgressProps) {
  const steps = [...wordChapters, reportStep];
  const activeIndex = steps.findIndex((step) => step.id === current);

  return (
    <nav className="sticky top-0 z-30 border-b border-ease-mist/70 bg-[#FAF8F4]/88 px-4 py-3 text-ease-ink shadow-[0_12px_35px_rgba(58,58,58,.06)] backdrop-blur-xl md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-xs font-medium tracking-[.18em] text-ease-blue">
            TAKE EASE JOURNEY
          </p>
          <p className="text-xs text-ease-ink/55">
            {Math.max(activeIndex + 1, 1)} / {steps.length}
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-4 right-4 top-5 hidden h-px bg-ease-mist md:block" />
          <div
            className="absolute left-4 top-5 hidden h-px bg-ease-blue transition-all duration-500 md:block"
            style={{
              width:
                activeIndex <= 0
                  ? "0%"
                  : `${(activeIndex / Math.max(steps.length - 1, 1)) * 100}%`,
            }}
          />
          <ol className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
            {steps.map((step, index) => {
              const completed = isCompleted(step.id, save);
              const active = step.id === current;
              const unlocked = isUnlocked(step.id, save);
              const status = active
                ? "正在体验"
                : completed
                  ? "已完成"
                  : unlocked
                    ? "待进入"
                    : "未解锁";
              const node = (
                <div
                  className={cn(
                    "relative rounded-[8px] border p-3 transition",
                    active
                      ? "border-ease-blue bg-white shadow-soft ring-2 ring-ease-blue/25"
                      : completed
                        ? "border-ease-sage/50 bg-white/75"
                        : unlocked
                          ? "border-ease-mist bg-white/58 hover:bg-white"
                          : "border-ease-mist/70 bg-white/35 opacity-65",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid h-10 w-10 shrink-0 place-items-center rounded-full border text-sm font-semibold",
                        active
                          ? "border-ease-blue bg-ease-blue text-white"
                          : completed
                            ? "border-ease-sage bg-ease-sage/20 text-ease-ink"
                            : unlocked
                              ? "border-ease-mist bg-ease-paper text-ease-ink/70"
                              : "border-ease-mist bg-white text-ease-ink/45",
                      )}
                    >
                      {completed ? (
                        <Check size={17} />
                      ) : step.id === "report" ? (
                        <Sparkles size={16} />
                      ) : unlocked ? (
                        <Circle size={14} />
                      ) : (
                        <Lock size={15} />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">
                        {step.emoji} {step.subtitle}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 block truncate text-xs",
                          active ? "text-ease-blue" : "text-ease-ink/55",
                        )}
                      >
                        {status}
                      </span>
                    </span>
                  </div>
                  {active && (
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ease-mist/55">
                      <div className="h-full w-2/3 rounded-full bg-ease-blue" />
                    </div>
                  )}
                </div>
              );

              return (
                <li key={step.id} className="relative">
                  {unlocked && !active ? (
                    <Link href={hrefFor(step.id)}>{node}</Link>
                  ) : (
                    node
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
}

function isCompleted(stageId: StageId, save: SaveState) {
  if (stageId === "report") return save.unlockedReport;
  return save.choices.some((choice) => choice.chapterId === stageId);
}

function isUnlocked(stageId: StageId, save: SaveState) {
  if (stageId === "university") return true;
  if (stageId === "report") return save.unlockedReport;
  const index = wordChapters.findIndex((chapter) => chapter.id === stageId);
  return wordChapters
    .slice(0, index)
    .every((chapter) => isCompleted(chapter.id, save));
}

function hrefFor(stageId: StageId) {
  return stageId === "report" ? "/report" : `/journey/${stageId}`;
}
