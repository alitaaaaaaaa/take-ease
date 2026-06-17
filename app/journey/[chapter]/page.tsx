"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, Home, Sparkles } from "lucide-react";
import { JourneyProgress } from "@/components/JourneyProgress";
import { Button } from "@/components/ui/button";
import { loadSave, persistSave, recordWordChoice } from "@/lib/storage";
import { attributeLabels } from "@/lib/data";
import { scoreWordChoice } from "@/lib/scoring";
import { getTeenChoiceParagraphs } from "@/lib/teenCopy";
import { ChapterId, SaveState, WordChoice, WordScene } from "@/lib/types";
import { wordChapterMap, wordChapters } from "@/lib/wordData";

export default function ChapterPage() {
  const params = useParams<{ chapter: string }>();
  const router = useRouter();
  const chapter = wordChapterMap[params.chapter];
  const [save, setSave] = useState<SaveState | null>(null);
  const [activeSceneId, setActiveSceneId] = useState<string | null>(null);
  const [picked, setPicked] = useState<WordChoice | null>(null);

  useEffect(() => setSave(loadSave()), []);

  const activeScene = useMemo(
    () => chapter?.scenes.find((scene) => scene.id === activeSceneId) ?? null,
    [chapter, activeSceneId],
  );

  if (!chapter) {
    return (
      <main className="grid min-h-screen place-items-center bg-ease-paper px-6 text-center text-ease-ink">
        <div>
          <p className="font-serif text-3xl">这封信暂时没有寄到</p>
          <Link href="/" className="mt-6 inline-block">
            <Button>回到首页</Button>
          </Link>
        </div>
      </main>
    );
  }

  const choose = (scene: WordScene, choice: WordChoice) => {
    if (!save) return;
    const next = recordWordChoice(save, chapter.id, scene.id, scene.title, choice);
    persistSave(next);
    setSave(next);
    setPicked(choice);
  };

  const backToHub = () => {
    setPicked(null);
    setActiveSceneId(null);
  };

  const currentIndex = wordChapters.findIndex((item) => item.id === chapter.id);
  const nextChapter = wordChapters[currentIndex + 1];
  const previousChapters = wordChapters.slice(0, Math.max(0, currentIndex));

  if (!save) {
    return (
      <main className="grid min-h-screen place-items-center bg-ease-paper text-ease-ink">
        正在打开你的故事...
      </main>
    );
  }

  const completedCurrentChapter = hasCompletedChapter(save, chapter.id);
  const canGoNext = Boolean(nextChapter && completedCurrentChapter);
  const canViewReport = hasCompletedChapter(save, "childhood");
  const canAccessChapter = previousChapters.every((item) =>
    hasCompletedChapter(save, item.id),
  );

  if (!canAccessChapter) {
    const requiredChapter =
      previousChapters.find((item) => !hasCompletedChapter(save, item.id)) ??
      wordChapters[0];
    return (
      <main className="min-h-screen bg-ease-paper text-center text-ease-ink">
        <JourneyProgress current={requiredChapter.id} save={save} />
        <section className="mx-auto mt-24 max-w-xl rounded-[8px] border border-ease-mist bg-white/72 p-7 shadow-soft">
          <p className="text-sm tracking-[.16em] text-ease-blue">
            旅程需要按顺序展开
          </p>
          <h1 className="mt-3 font-serif text-3xl">
            请先完成{requiredChapter.subtitle}中的一个场景
          </h1>
          <p className="mt-4 text-sm leading-7 text-ease-ink/64">
            Take Ease 会从当下开始，再慢慢回到更早的时刻。每个副本至少完成一个场景后，下一站才会开启。
          </p>
          <Link href={`/journey/${requiredChapter.id}`} className="mt-6 inline-block">
            <Button>前往{requiredChapter.subtitle}</Button>
          </Link>
        </section>
      </main>
    );
  }

  if (activeScene) {
    return (
      <SceneReader
        chapterId={chapter.id}
        save={save}
        scene={activeScene}
        picked={picked}
        completed={save.completedScenes.includes(activeScene.id)}
        onPick={(choice) => choose(activeScene, choice)}
        onBack={backToHub}
      />
    );
  }

  return (
    <main className="min-h-screen bg-ease-paper text-ease-ink">
      <JourneyProgress current={chapter.id} save={save} />
      <section className="relative overflow-hidden border-b border-ease-mist/70 bg-gradient-to-br from-[#FAF8F4] via-[#F5EEDC] to-[#E8F0EE] px-4 py-10 md:px-8">
        <div className="absolute inset-0 opacity-20 [background-image:url('/assets/paper-grain.png')]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link href="/">
              <Button variant="paper">
                <Home size={17} />
                首页
              </Button>
            </Link>
            {canViewReport && (
              <Link href="/report">
                <Button variant="ghost">
                  <Sparkles size={17} />
                  查看成长轨迹
                </Button>
              </Link>
            )}
          </div>
          <p className="mt-8 text-sm tracking-[.18em] text-ease-blue">
            {chapter.emoji} {chapter.subtitle}
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-6xl">
            {chapter.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-9 text-ease-ink/70">
            {chapter.intro}
          </p>
          <div className="mt-7 max-h-44 max-w-4xl overflow-auto rounded-[8px] border border-white/70 bg-white/45 p-4 text-sm leading-7 text-ease-ink/68 shadow-soft backdrop-blur">
            {chapter.overview.map((paragraph, index) => (
              <p key={index} className="mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-ease-ink/55">选择一个场景进入</p>
            <h2 className="mt-1 text-2xl font-semibold">多场景窗口</h2>
          </div>
          {canGoNext && nextChapter && (
            <button
              onClick={() => router.push(`/journey/${nextChapter.id}`)}
              className="hidden rounded-[8px] border border-ease-mist bg-white/60 px-4 py-2 text-sm text-ease-ink/70 transition hover:bg-white md:block"
            >
              前往{nextChapter.subtitle}
            </button>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {chapter.scenes.map((scene) => {
            const completed = save.completedScenes.includes(scene.id);
            return (
              <button
                key={scene.id}
                onClick={() => {
                  setPicked(null);
                  setActiveSceneId(scene.id);
                }}
                className="group overflow-hidden rounded-[8px] border border-ease-mist bg-white/70 text-left shadow-soft transition hover:-translate-y-0.5 hover:bg-white"
              >
                <div
                  className="aspect-[4/3] bg-cover bg-center"
                  style={{ backgroundImage: `url(${scene.image})` }}
                />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-3xl">{scene.emoji}</span>
                    {completed && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-ease-sage/20 px-3 py-1 text-xs text-ease-ink/70">
                        <Check size={14} />
                        已体验
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-2xl font-bold leading-9 text-[#5f7f88] md:text-[28px]">
                    {getSimpleSceneTitle(scene.title)}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-7 text-ease-ink/62">
                    {getDisplayParagraphs(scene.intro).join(" ")}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        {canGoNext && nextChapter && (
          <div className="mt-8 md:hidden">
            <Button
              variant="paper"
              className="w-full"
              onClick={() => router.push(`/journey/${nextChapter.id}`)}
            >
              前往{nextChapter.subtitle}
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}

function hasCompletedChapter(save: SaveState, chapterId: ChapterId) {
  return save.choices.some((choice) => choice.chapterId === chapterId);
}

function SceneReader({
  chapterId,
  save,
  scene,
  picked,
  completed,
  onPick,
  onBack,
}: {
  chapterId: ChapterId;
  save: SaveState;
  scene: WordScene;
  picked: WordChoice | null;
  completed: boolean;
  onPick: (choice: WordChoice) => void;
  onBack: () => void;
}) {
  return (
    <main className="min-h-screen bg-ease-paper text-ease-ink">
      <JourneyProgress current={chapterId} save={save} />
      <section className="mx-auto max-w-5xl px-4 py-6 md:px-8">
        <Button variant="paper" onClick={onBack}>
          <ArrowLeft size={17} />
          返回当前副本
        </Button>
        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(280px,0.9fr)_minmax(360px,1.1fr)] lg:items-stretch">
          <div
            className="min-h-[260px] overflow-hidden rounded-[8px] border border-ease-mist bg-cover bg-center shadow-soft lg:min-h-[430px]"
            style={{ backgroundImage: `url(${scene.image})` }}
            aria-hidden
          />
          <div className="min-w-0 rounded-[8px] border border-ease-mist bg-white/88 p-5 shadow-soft md:flex md:flex-col md:justify-center md:p-8">
              <div className="flex items-center gap-3">
                <p className="text-4xl">{scene.emoji}</p>
                {completed && (
                  <p className="inline-flex items-center gap-2 rounded-full bg-ease-sage/20 px-3 py-1 text-sm text-ease-ink/70">
                    <Check size={15} />
                    已体验
                  </p>
                )}
              </div>
              <h1 className="mt-4 break-words font-serif text-4xl font-bold leading-tight text-[#5f7f88] md:text-5xl">
                {getSimpleSceneTitle(scene.title)}
              </h1>
              <div className="mt-5 text-sm leading-7 text-ease-ink/72 md:text-base md:leading-8">
                <TextBlock paragraphs={getDisplayParagraphs(scene.intro)} />
              </div>
          </div>
        </div>
      </section>
      <section className="mx-auto mt-6 max-w-5xl px-4 pb-12 md:px-8">
        {!picked ? (
          <div className="space-y-6">
            <aside className="mx-auto max-w-2xl rounded-[8px] border border-ease-mist bg-white/72 p-5 shadow-soft md:p-6">
              <p className="text-center text-sm text-ease-ink/55">选项</p>
              <div className="mt-4 space-y-4">
                {scene.choices.map((choice) => {
                  const split = splitChoice(choice);
                  const preview = splitOptionPreview(split.description);
                  return (
                    <button
                      key={choice.id}
                      onClick={() =>
                        onPick({
                          ...choice,
                          paragraphs: getTeenChoiceParagraphs(choice),
                        })
                      }
                      className="group w-full overflow-hidden rounded-[8px] border border-ease-mist bg-ease-paper/70 p-5 text-left transition hover:-translate-y-0.5 hover:border-ease-blue hover:bg-white hover:shadow-soft focus:border-ease-blue focus:bg-white focus:shadow-soft focus:outline-none"
                    >
                      <span className="block text-xl font-bold leading-8 text-[#5f7f88] md:text-2xl">
                        {getSimpleChoiceTitle(choice.title)}
                      </span>
                      {preview.lead && (
                        <span className="mt-2 block text-sm font-medium leading-7 text-ease-ink/70">
                          {preview.lead}
                        </span>
                      )}
                      {preview.rest.length > 0 && (
                        <span className="block max-h-0 space-y-2 overflow-hidden text-sm leading-7 text-ease-ink/68 opacity-0 transition-all duration-700 ease-out group-hover:mt-4 group-hover:max-h-[28rem] group-hover:opacity-100 group-focus:mt-4 group-focus:max-h-[28rem] group-focus:opacity-100">
                          {preview.rest.map((paragraph, index) => (
                            <span key={index} className="block whitespace-pre-line">
                              {paragraph}
                            </span>
                          ))}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>
        ) : (
          <ResultView
            chapterId={chapterId}
            scene={scene}
            choice={picked}
            onBack={onBack}
          />
        )}
      </section>
    </main>
  );
}

function ResultView({
  chapterId,
  scene,
  choice,
  onBack,
}: {
  chapterId: ChapterId;
  scene: WordScene;
  choice: WordChoice;
  onBack: () => void;
}) {
  const split = splitChoice(choice);
  const resultParagraphs = split.result.length ? split.result : choice.paragraphs;
  const resultCopy = splitResultLead(resultParagraphs);
  const score = scoreWordChoice(chapterId, "", choice);
  const isChildhoodFinal = chapterId === "childhood";
  return (
    <article className="rounded-[8px] border border-ease-mist bg-white/78 p-5 shadow-soft md:p-8">
      <p className="text-sm text-ease-ink/55">可能的结果</p>
      <h2 className="mt-2 text-3xl font-bold leading-10 text-[#5f7f88]">
        {choice.title}
      </h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(280px,0.9fr)_minmax(360px,1.1fr)] lg:items-start">
        <div
          className="min-h-[260px] rounded-[8px] border border-ease-mist bg-cover bg-center shadow-soft lg:min-h-[380px]"
          style={{ backgroundImage: `url(${scene.image})` }}
          aria-hidden
        />
        <div className="min-w-0 rounded-[8px] border border-ease-mist bg-[#FFF8E8] p-5 shadow-soft md:p-6">
          {resultCopy.lead && (
            <p className="mb-5 break-words text-2xl font-bold leading-9 text-[#5f7f88] md:text-3xl md:leading-10">
              {resultCopy.lead}
            </p>
          )}
          <div className="max-w-prose">
            <TextBlock paragraphs={resultCopy.rest} />
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-[8px] border border-ease-mist bg-ease-paper/70 p-5">
        <p className="text-sm font-medium text-ease-ink">本次选择影响</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(score.effects).map(([key, value]) => (
            <span
              key={key}
              className="rounded-full bg-white px-3 py-1 text-xs text-ease-ink/72"
            >
              {attributeLabels[key as keyof typeof attributeLabels]}{" "}
              {Number(value) > 0 ? `+${value}` : value}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm leading-7 text-ease-ink/62">{score.reason}</p>
      </div>
      {isChildhoodFinal ? (
        <div className="mt-7 rounded-[8px] border border-ease-mist bg-ease-paper/70 p-5 text-center md:p-6">
          <p className="text-sm tracking-[.16em] text-ease-blue">童年副本已完成</p>
          <h3 className="mt-2 font-serif text-2xl text-ease-ink">
            现在，你可以回看这一站，也可以整理完整的成长轨迹。
          </h3>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Button className="min-h-12 px-6" onClick={onBack}>
              回到童年副本
            </Button>
            <Link href="/report">
              <Button variant="paper" className="min-h-12 w-full px-6 sm:w-auto">
                <Sparkles size={17} />
                查看成长轨迹
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <Button className="mt-7" onClick={onBack}>
          回到当前副本场景窗口
        </Button>
      )}
    </article>
  );
}

function splitChoice(choice: WordChoice) {
  const paragraphs = getTeenChoiceParagraphs(choice);
  const resultIndex = paragraphs.findIndex((paragraph) => {
    const text = paragraph.trim();
    return (
      text.startsWith("可能的结果") ||
      text.startsWith("结果") ||
      text.startsWith("来自未来的信")
    );
  });

  if (resultIndex === -1) {
    return { description: paragraphs, result: [] };
  }

  return {
    description: paragraphs.slice(0, resultIndex),
    result: paragraphs.slice(resultIndex),
  };
}

function splitResultLead(paragraphs: string[]) {
  const clean = paragraphs
    .map((paragraph) =>
      paragraph.replace(/^(可能的结果|结果)\s*[:：]?\s*/, "").trim(),
    )
    .filter(Boolean);

  if (clean.length === 0) {
    return { lead: "", rest: [] };
  }

  const first = clean[0];
  const match = first.match(/^(.+?[。！？!?])\s*([\s\S]*)$/);

  if (!match) {
    return { lead: first, rest: clean.slice(1) };
  }

  const rest = [match[2], ...clean.slice(1)].filter((paragraph) =>
    paragraph.trim(),
  );

  return { lead: match[1], rest };
}

function splitOptionPreview(paragraphs: string[]) {
  const clean = paragraphs.map((paragraph) => paragraph.trim()).filter(Boolean);

  if (clean.length === 0) {
    return { lead: "", rest: [] };
  }

  const first = clean[0];
  const match = first.match(/^(.+?[。！？!?])\s*([\s\S]*)$/);

  if (!match) {
    return { lead: first, rest: clean.slice(1) };
  }

  const rest = [match[2], ...clean.slice(1)].filter((paragraph) =>
    paragraph.trim(),
  );

  return { lead: match[1], rest };
}

function getSimpleSceneTitle(title: string) {
  const normalized = title
    .replace(/^📌\s*/, "")
    .replace(/^场景[一二三四五六七八九十]+[:：]\s*/, "")
    .trim();

  const custom: Array<[string, string]> = [
    ["保研", "保研-边缘焦虑"],
    ["实习", "实习-面试焦虑"],
    ["留学", "留学-离开与选择"],
    ["就业", "就业-求职焦虑"],
    ["转学", "转学后不适应"],
    ["坐在角落", "转学后不适应"],
    ["成绩单", "中考出成绩"],
    ["中考", "中考出成绩"],
    ["走廊", "暗恋心事"],
    ["暗恋", "暗恋心事"],
    ["我是谁", "高三的思考"],
    ["高三", "高三的思考"],
    ["试卷", "不敢展示的成绩"],
    ["小朋友", "上台表演的机会"],
    ["操场", "加入新圈子"],
    ["画笔", "被收起的兴趣"],
  ];

  const found = custom.find(([keyword]) => normalized.includes(keyword));
  if (found) return found[1];

  return normalized
    .replace(/[（(].*?[）)]/g, "")
    .replace(/——/g, "-")
    .slice(0, 16);
}

function getSimpleChoiceTitle(title: string) {
  return title.replace(/^.*?选项[一二三四五六七八九十]+[:：]\s*/, "").trim();
}

function getDisplayParagraphs(paragraphs: string[]) {
  return paragraphs.filter((paragraph) => {
    const text = paragraph.replace(/^>\s*/, "").trim();
    return text !== "进场旁白";
  });
}

function TextBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 text-[15px] leading-8 text-ease-ink/76">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="whitespace-pre-line">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
