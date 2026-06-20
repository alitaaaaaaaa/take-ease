"use client";

import { ChevronDown, Info } from "lucide-react";
import { initialAttributes } from "@/lib/data";

const dimensions = [
  ["自我认同", "能否区分自己的需要、价值与外部评价。表达真实意愿、选择适合自己的方向时提高。"],
  ["心理韧性", "面对压力、失败和不确定时继续行动与恢复的能力。准备、复盘、坚持和承担反馈时提高。"],
  ["表达能力", "能否把感受、需要和观点说出来。主动沟通、求助、表达喜欢或练习面试时提高。"],
  ["探索欲", "是否愿意尝试新环境、新路径和保留兴趣。主动尝试、探索方向或保护兴趣时提高。"],
  ["关系信任", "是否相信关系可以提供支持，并愿意靠近、求助和合作。主动进入关系或向可信任的人求助时提高。"],
  ["情绪觉察", "能否识别情绪、理解焦虑来源和看见自己的保护方式。暂停、反思和重新理解过去时提高。"],
] as const;

export function RadarMethodology() {
  return (
    <details className="group mt-5 rounded-[8px] border border-ease-mist bg-ease-paper/65 p-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-ease-ink">
        <span className="inline-flex items-center gap-2">
          <Info size={16} className="text-ease-blue" />
          查看指标与计分依据
        </span>
        <ChevronDown
          size={16}
          className="transition-transform duration-300 group-open:rotate-180"
        />
      </summary>
      <div className="mt-4 space-y-4 border-t border-ease-mist/70 pt-4 text-sm leading-7 text-ease-ink/72">
        <p>
          初始分不是能力测验结果，而是叙事中的中性起点：自我认同 {initialAttributes.identity}、心理韧性 {initialAttributes.resilience}、表达能力 {initialAttributes.expression}、探索欲 {initialAttributes.curiosity}、关系信任 {initialAttributes.trust}、情绪觉察 {initialAttributes.awareness}。
        </p>
        <div className="space-y-3">
          {dimensions.map(([name, description]) => (
            <p key={name}>
              <strong className="text-ease-ink">{name}：</strong>
              {description}
            </p>
          ))}
        </div>
        <div className="rounded-[8px] bg-white/75 p-4">
          <p className="font-semibold text-ease-ink">计分规则</p>
          <ul className="mt-2 space-y-2 pl-5 [list-style:disc]">
            <li>36 个正式选项均有独立赋分，每次主要影响 3 个最相关指标。</li>
            <li>主动表达、探索、行动或求助通常增加对应指标；回避或压抑可能使表达、信任或探索小幅下降，但仍可能增加情绪觉察。</li>
            <li>同一场景重新选择时，会先撤销旧选项分数，再应用新选项，避免重复叠加。</li>
            <li>最终分数限制在 0-100，仅用于叙事反馈，不属于心理测量、诊断或能力排名。</li>
          </ul>
        </div>
      </div>
    </details>
  );
}
