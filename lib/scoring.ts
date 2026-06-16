import { AttributeKey, Attributes, ChapterId, WordChoice } from "./types";

type ScoreRule = {
  effects: Partial<Attributes>;
  reason: string;
};

const rules: Record<string, ScoreRule> = {
  "university-s1-c1": {
    effects: { resilience: 7, awareness: 3, identity: 2 },
    reason: "你选择长期投入并持续准备，把焦虑转化成稳定行动。",
  },
  "university-s1-c2": {
    effects: { resilience: 6, awareness: 5, curiosity: 4 },
    reason: "你选择两手准备，在不确定中保留行动空间。",
  },
  "university-s1-c3": {
    effects: { identity: 8, curiosity: 6, expression: 2 },
    reason: "你选择承认真实意愿，把别人的标准和自己的方向区分开。",
  },
  "university-s2-c1": {
    effects: { resilience: 7, identity: 4, awareness: 3 },
    reason: "你用长期积累面对实习机会，增强了对自己能力的确认。",
  },
  "university-s2-c2": {
    effects: { resilience: 8, expression: 4, awareness: 3 },
    reason: "你选择从现在开始冲刺，并通过复盘和面试练习提升表达。",
  },
  "university-s2-c3": {
    effects: { curiosity: 6, resilience: 4, identity: 3 },
    reason: "你选择过渡方案，同时保留自我提升和探索空间。",
  },
  "university-s3-c1": {
    effects: { curiosity: 7, resilience: 5, expression: 3 },
    reason: "你选择进入陌生环境，锻炼跨文化表达和适应能力。",
  },
  "university-s3-c2": {
    effects: { identity: 6, awareness: 5, curiosity: 4 },
    reason: "你选择更适合自己的方案，而不是只追逐排名和光环。",
  },
  "university-s3-c3": {
    effects: { awareness: 8, identity: 6, curiosity: 5 },
    reason: "你允许自己暂停，先弄清楚为什么出发。",
  },
  "university-s4-c1": {
    effects: { resilience: 7, expression: 4, identity: 3 },
    reason: "你选择主动求职并持续复盘，提升了承压和表达能力。",
  },
  "university-s4-c2": {
    effects: { identity: 6, awareness: 5, trust: 3 },
    reason: "你选择适合自己生活节奏的道路，体现了清晰的自我定位。",
  },
  "university-s4-c3": {
    effects: { curiosity: 8, identity: 5, resilience: 4 },
    reason: "你选择自由职业或创业，强调探索和自我驱动。",
  },
  "teen-s1-c1": {
    effects: { trust: 8, expression: 3, identity: 3 },
    reason: "你选择安全地靠近别人，建立了关系信任。",
  },
  "teen-s1-c2": {
    effects: { awareness: 5, resilience: 3, trust: -1 },
    reason: "你用独处保护自己，也开始看见这种保护可能带来的距离。",
  },
  "teen-s1-c3": {
    effects: { expression: 6, resilience: 4, curiosity: 3 },
    reason: "你主动进入人群，即使不一定合适，也练习了承受反馈。",
  },
  "teen-s2-c1": {
    effects: { expression: 8, trust: 5, awareness: 4 },
    reason: "你选择把压力说出来，让问题从沉默变成可以沟通的内容。",
  },
  "teen-s2-c2": {
    effects: { resilience: 5, awareness: 5, expression: -1 },
    reason: "你先保护自己并独自消化情绪，但表达暂时没有发生。",
  },
  "teen-s2-c3": {
    effects: { awareness: 8, trust: 5, identity: 4 },
    reason: "你用成年后的视角重新理解家庭沉默，提升了情绪觉察。",
  },
  "teen-s3-c1": {
    effects: { expression: 8, resilience: 4, identity: 3 },
    reason: "你选择表达喜欢，练习把真实感受说出口。",
  },
  "teen-s3-c2": {
    effects: { awareness: 6, resilience: 3, expression: -1 },
    reason: "你承认自己还没准备好，用更安全的方式保护感受。",
  },
  "teen-s3-c3": {
    effects: { awareness: 8, identity: 4, trust: 2 },
    reason: "你重新理解过去的遗憾，把未完成的情绪放回人生经验里。",
  },
  "teen-s4-c1": {
    effects: { identity: 8, awareness: 5, curiosity: 4 },
    reason: "你认真追问自己喜欢什么，增强了自我认同。",
  },
  "teen-s4-c2": {
    effects: { resilience: 5, awareness: -1, identity: -1 },
    reason: "你优先处理眼前压力，但暂时压下了对自我的探索。",
  },
  "teen-s4-c3": {
    effects: { trust: 6, expression: 6, awareness: 4 },
    reason: "你选择向可信任的人表达困惑，获得关系支持。",
  },
  "childhood-s1-c1": {
    effects: { resilience: 6, expression: 5, identity: 4 },
    reason: "你选择主动面对不完美，练习把错误和自我价值分开。",
  },
  "childhood-s1-c2": {
    effects: { awareness: 4, trust: -2, expression: -2 },
    reason: "你用回避换取安全感，也看见自己当时很害怕被责备。",
  },
  "childhood-s1-c3": {
    effects: { awareness: 7, trust: -1, expression: -1 },
    reason: "你敏感地观察大人反应，情绪觉察增强，但表达被压低。",
  },
  "childhood-s2-c1": {
    effects: { expression: 7, resilience: 5, curiosity: 3 },
    reason: "你选择站上舞台，练习在害怕中完成表达。",
  },
  "childhood-s2-c2": {
    effects: { resilience: 3, curiosity: -2, expression: -2 },
    reason: "你选择安全和稳定，但探索与展示暂时被放下。",
  },
  "childhood-s2-c3": {
    effects: { trust: 8, expression: 5, resilience: 3 },
    reason: "你选择求助，形成了困难时可以伸手的经验。",
  },
  "childhood-s3-c1": {
    effects: { trust: 5, expression: 6, resilience: 3 },
    reason: "你主动靠近同伴，练习面对关系中的不确定。",
  },
  "childhood-s3-c2": {
    effects: { awareness: 5, curiosity: 2, trust: -2 },
    reason: "你用独处保护自己，也看见自己其实有加入的需要。",
  },
  "childhood-s3-c3": {
    effects: { trust: 7, expression: 4, awareness: 3 },
    reason: "你通过熟悉的人进入关系，建立了更温和的信任方式。",
  },
  "childhood-s4-c1": {
    effects: { resilience: 3, curiosity: -2, identity: -1 },
    reason: "你选择先满足外部期待，但喜欢被暂时放轻。",
  },
  "childhood-s4-c2": {
    effects: { curiosity: 8, identity: 5, resilience: 3 },
    reason: "你保护自己的兴趣，同时兼顾责任。",
  },
  "childhood-s4-c3": {
    effects: { expression: 7, identity: 6, trust: 3 },
    reason: "你为自己的喜欢争取空间，提升了表达和自我认同。",
  },
};

export function scoreWordChoice(
  chapterId: ChapterId,
  sceneId: string,
  choice: WordChoice,
): ScoreRule {
  return (
    rules[choice.id] ?? {
      effects: inferEffects(chapterId, sceneId, choice),
      reason: "系统根据你的选择行为倾向，估算了本次成长属性变化。",
    }
  );
}

function inferEffects(
  chapterId: ChapterId,
  _sceneId: string,
  choice: WordChoice,
): Partial<Attributes> {
  const text = `${choice.title}\n${choice.paragraphs.join("\n")}`;
  const effects: Partial<Attributes> = {};
  add(effects, "awareness", 2);

  if (/说|表达|讲|问|告诉|递出去|叫住/.test(text)) {
    add(effects, "expression", 5);
    add(effects, "awareness", 2);
  }
  if (/靠近|一起|朋友|同学|父母|老师|求助|陪|关系/.test(text)) {
    add(effects, "trust", 4);
  }
  if (/试|探索|喜欢|兴趣|自由|留学|创业|Gap|方向|选择/.test(text)) {
    add(effects, "curiosity", 4);
    add(effects, "identity", 2);
  }
  if (/坚持|准备|复习|冲|面对|完成|承受|继续/.test(text)) {
    add(effects, "resilience", 4);
  }
  if (/自己|真正|想要|不想|适合|是谁|自我/.test(text)) {
    add(effects, "identity", 4);
  }
  if (/躲|压下|沉默|假装|拒绝|回避/.test(text)) {
    add(effects, "awareness", 3);
    add(effects, "expression", -1);
  }
  if (chapterId === "childhood") add(effects, "awareness", 1);
  return effects;
}

function add(
  effects: Partial<Attributes>,
  key: AttributeKey,
  value: number,
) {
  effects[key] = Math.max(-4, Math.min(10, (effects[key] ?? 0) + value));
}
