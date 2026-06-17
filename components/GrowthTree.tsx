"use client";

import { SaveState } from "@/lib/types";
import { GitBranch } from "lucide-react";

export function GrowthTree({ save }: { save: SaveState }) {
  return (
    <div className="space-y-3">
      {save.choices.map((choice, index) => (
        <div key={choice.sceneId} className="grid grid-cols-[32px_1fr] gap-3">
          <div className="flex flex-col items-center">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ease-sage/25 text-ease-ink">
              <GitBranch size={15} />
            </span>
            {index < save.choices.length - 1 && (
              <span className="h-12 w-px bg-ease-mist" />
            )}
          </div>
          <div className="rounded-[8px] border border-ease-mist/80 bg-white/45 p-3">
            <p className="text-sm font-medium">{getSimpleSceneTitle(choice.title)}</p>
            <p className="mt-1 text-xs leading-5 text-ease-ink/65">
              {getSimpleChoiceTitle(choice.choice)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
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
    ["不适应", "转学后不适应"],
    ["坐在角落", "转学后不适应"],
    ["成绩单", "中考出成绩"],
    ["中考", "中考出成绩"],
    ["被评价", "中考出成绩"],
    ["走廊", "暗恋心事"],
    ["暗恋", "暗恋心事"],
    ["少年的情愫", "暗恋心事"],
    ["我是谁", "高三的思考"],
    ["高三", "高三的思考"],
    ["未来方向", "高三的思考"],
    ["试卷", "不敢展示的成绩"],
    ["成绩-不完美", "不敢展示的成绩"],
    ["小朋友", "上台表演的机会"],
    ["表现-被看见", "上台表演的机会"],
    ["操场", "加入新圈子"],
    ["同伴-想加入", "加入新圈子"],
    ["画笔", "被收起的兴趣"],
    ["兴趣-被收起", "被收起的兴趣"],
  ];

  const found = custom.find(([keyword]) => normalized.includes(keyword));
  if (found) return found[1];

  return normalized.replace(/[（(].*?[）)]/g, "").replace(/——/g, "-");
}

function getSimpleChoiceTitle(title: string) {
  return title.replace(/^.*?选项[一二三四五六七八九十]+[:：]\s*/, "").trim();
}
