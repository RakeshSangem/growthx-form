import { create } from "zustand";
import questions from "../app/questions.json";

interface Progress {
  progress: number;
  setProgress: (progress: number) => void;
}

const questionsLength = questions.filter(
  (question) => question.type !== "welcome",
).length;

export const useProgress = create<Progress>((set) => ({
  progress: 0,
  setProgress: (progress) =>
    set({ progress: (progress / questionsLength) * 100 }),
}));
