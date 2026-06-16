"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Download, Home, RotateCcw } from "lucide-react";
import { AttributeRadar } from "@/components/AttributeRadar";
import { GrowthTree } from "@/components/GrowthTree";
import { Button } from "@/components/ui/button";
import { attributeLabels } from "@/lib/data";
import { loadSave, resetSave } from "@/lib/storage";
import { ChapterId, SaveState } from "@/lib/types";
import { wordChapters } from "@/lib/wordData";

export default function Report() {
  const [save, setSave] = useState<SaveState | null>(null);

  useEffect(() => setSave(loadSave()), []);

  const top = useMemo(() => {
    if (!save) return [];
    return Object.entries(save.attributes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key]) => attributeLabels[key as keyof typeof save.attributes]);
  }, [save]);

  if (!save) return null;

  if (!save.unlockedReport) {
    const requiredChapter =
      wordChapters.find((chapter) => !hasCompletedChapter(save, chapter.id)) ??
      wordChapters[wordChapters.length - 1];

    return (
      <main className="grid min-h-screen place-items-center bg-ease-paper px-5 text-center text-ease-ink">
        <section className="max-w-xl rounded-[8px] border border-ease-mist bg-white/72 p-7 shadow-soft">
          <p className="text-sm tracking-[.16em] text-ease-blue">
            成长轨迹尚未生成
          </p>
          <h1 className="mt-3 font-serif text-3xl">
            请先完成{requiredChapter.subtitle}中的一个场景
          </h1>
          <p className="mt-4 text-sm leading-7 text-ease-ink/64">
            三个副本都完成后，系统才会整理你的选择路径、属性变化和最后一封未来来信。
          </p>
          <Link href={`/journey/${requiredChapter.id}`} className="mt-6 inline-block">
            <Button>继续当前旅程</Button>
          </Link>
        </section>
      </main>
    );
  }

  const final = `亲爱的你：

谢谢你走到这里。你从大学的未来焦虑出发，回到初高中被评价和比较的时刻，又走进童年最初的房间。你看见了：很多焦虑并不是你出了问题，而是过去的你在努力保护自己。

你的关键词是：${top.join("、")}。它们不是标签，而是你一路带来的能力。你可以继续努力，也可以慢一点；你可以做选择，也可以修改选择。

人生不是一道标准答案。你也不需要成为别人。`;

  return (
    <main className="noise relative min-h-screen bg-ease-paper px-4 py-8 text-ease-ink md:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1fr_380px]">
        <section className="rounded-[8px] border border-ease-mist bg-white/65 p-6 shadow-soft md:p-10">
          <p className="text-sm text-ease-blue">来自未来的最后一封信</p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl">
            你不是出了问题
          </h1>
          <div className="mt-8 whitespace-pre-wrap rounded-[8px] bg-[#f7edcf] p-6 font-serif text-lg leading-9 shadow-soft">
            {final}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {top.map((keyword) => (
              <div
                key={keyword}
                className="rounded-[8px] border border-ease-mist bg-ease-sand/60 p-4"
              >
                <p className="text-sm text-ease-ink/55">专属关键词</p>
                <p className="mt-2 text-2xl font-semibold">{keyword}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => window.print()}>
              <Download size={17} />
              保存这封信
            </Button>
            <Link href="/">
              <Button variant="paper">
                <Home size={17} />
                回到首页
              </Button>
            </Link>
            <Button
              variant="ghost"
              onClick={() => {
                resetSave();
                location.href = "/";
              }}
            >
              <RotateCcw size={16} />
              重新体验
            </Button>
          </div>
        </section>
        <aside className="space-y-5">
          <div className="rounded-[8px] border border-ease-mist bg-white/65 p-5 shadow-soft">
            <p className="text-sm text-ease-ink/55">动态成长雷达</p>
            <AttributeRadar attributes={save.attributes} />
          </div>
          <div className="rounded-[8px] border border-ease-mist bg-white/65 p-5 shadow-soft">
            <p className="mb-4 text-sm text-ease-ink/55">人生轨迹树</p>
            <GrowthTree save={save} />
          </div>
        </aside>
      </div>
    </main>
  );
}

function hasCompletedChapter(save: SaveState, chapterId: ChapterId) {
  return save.choices.some((choice) => choice.chapterId === chapterId);
}
