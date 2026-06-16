"use client";

import { initialAttributes } from "./data";
import { scoreWordChoice } from "./scoring";
import { Attributes, ChapterId, Choice, SaveState, WordChoice } from "./types";

const KEY = "take-ease-save-v1";

export function emptySave(): SaveState {
  return {
    currentChapter: "university",
    completedScenes: [],
    choices: [],
    attributes: initialAttributes,
    unlockedReport: false,
    updatedAt: new Date().toISOString(),
  };
}

export function loadSave(): SaveState {
  if (typeof window === "undefined") return emptySave();
  try {
    return normalizeSave({
      ...emptySave(),
      ...JSON.parse(localStorage.getItem(KEY) || "{}"),
    });
  } catch {
    return emptySave();
  }
}

export function persistSave(save: SaveState) {
  localStorage.setItem(
    KEY,
    JSON.stringify({ ...save, updatedAt: new Date().toISOString() }),
  );
}

export function resetSave() {
  localStorage.removeItem(KEY);
}

export function applyChoice(
  save: SaveState,
  chapterId: ChapterId,
  sceneId: string,
  sceneTitle: string,
  choice: Choice,
): SaveState {
  const attrs = applyEffects(save.attributes, choice.effects);
  const previous = save.choices.filter((item) => item.sceneId !== sceneId);
  const completed = Array.from(new Set([...save.completedScenes, sceneId]));

  return {
    ...save,
    completedScenes: completed,
    attributes: attrs,
    choices: [
      ...previous,
      {
        sceneId,
        chapterId,
        title: sceneTitle,
        choiceId: choice.id,
        choice: choice.text,
        tag: choice.tag,
        letter: choice.letter,
        effects: choice.effects,
      },
    ],
    unlockedReport: completed.length >= 6,
  };
}

export function recordWordChoice(
  save: SaveState,
  chapterId: ChapterId,
  sceneId: string,
  sceneTitle: string,
  choice: WordChoice,
): SaveState {
  const previousChoice = save.choices.find((item) => item.sceneId === sceneId);
  const previous = save.choices.filter((item) => item.sceneId !== sceneId);
  const completed = Array.from(new Set([...save.completedScenes, sceneId]));
  const score = scoreWordChoice(chapterId, sceneId, choice);
  const attrs = applyEffects(save.attributes, score.effects, previousChoice?.effects);

  return {
    ...save,
    currentChapter: chapterId,
    completedScenes: completed,
    attributes: attrs,
    choices: [
      ...previous,
      {
        sceneId,
        chapterId,
        title: sceneTitle,
        choiceId: choice.id,
        choice: choice.title,
        tag: score.reason,
        letter: choice.paragraphs.join("\n\n"),
        effects: score.effects,
      },
    ],
    unlockedReport: completed.length >= 3,
  };
}

function applyEffects(
  attributes: Attributes,
  next: Partial<Attributes>,
  previous?: Partial<Attributes>,
) {
  const attrs = { ...attributes };

  if (previous) {
    Object.entries(previous).forEach(([key, value]) => {
      attrs[key as keyof Attributes] = clamp(
        attrs[key as keyof Attributes] - Number(value),
      );
    });
  }

  Object.entries(next).forEach(([key, value]) => {
    attrs[key as keyof Attributes] = clamp(
      attrs[key as keyof Attributes] + Number(value),
    );
  });

  return attrs;
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

function normalizeSave(save: SaveState): SaveState {
  const choices = save.choices.map((choice) => {
    if (choice.effects && Object.keys(choice.effects).length > 0) {
      return choice;
    }
    const score = scoreWordChoice(choice.chapterId, choice.sceneId, {
      id: choice.choiceId,
      title: choice.choice,
      paragraphs: choice.letter ? choice.letter.split("\n\n") : [],
    });
    return { ...choice, tag: score.reason, effects: score.effects };
  });

  const attributes = choices.reduce(
    (attrs, choice) => applyEffects(attrs, choice.effects),
    { ...initialAttributes },
  );

  return { ...save, choices, attributes };
}
