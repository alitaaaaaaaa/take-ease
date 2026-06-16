export type AttributeKey = "identity" | "resilience" | "expression" | "curiosity" | "trust" | "awareness";
export type Attributes = Record<AttributeKey, number>;
export type ChapterId = "university" | "teen" | "childhood";
export type Choice = { id:string; text:string; outcome:string; letter:string; effects: Partial<Attributes>; tag:string };
export type Scene = { id:string; title:string; time:string; image:string; emotion:string[]; narration:string[]; worry:string; npc?: { name:string; surface:string; inner:string }; choices: Choice[] };
export type Chapter = { id:ChapterId; order:number; title:string; subtitle:string; theme:string; intro:string; next?:ChapterId; scenes:Scene[] };
export type SaveState = { currentChapter: ChapterId; completedScenes: string[]; choices: { sceneId:string; choiceId:string; chapterId:ChapterId; title:string; choice:string; tag:string; letter:string; effects: Partial<Attributes> }[]; attributes: Attributes; unlockedReport:boolean; updatedAt:string };

export type WordChoice = {
  id: string;
  title: string;
  paragraphs: string[];
};

export type WordScene = {
  id: string;
  title: string;
  emoji: string;
  image: string;
  intro: string[];
  choices: WordChoice[];
  raw: string[];
};

export type WordChapter = {
  id: ChapterId;
  subtitle: string;
  title: string;
  emoji: string;
  intro: string;
  overview: string[];
  scenes: WordScene[];
};
