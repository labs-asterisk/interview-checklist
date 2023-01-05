import { atom } from "jotai";
import problems from "../data/problem_data.json";
import filterTags from "../data/filter_tags.json";

export const problemsAtom = atom(problems);
export const filterTopicsAtom = atom<string[]>(
  Object.entries(filterTags.topicWise).map(([tag, occ], j) => tag)
);
export const filterDifficultyAtom = atom<string[]>(
  Object.entries(filterTags.difficulty).map(([tag, occ], j) => tag)
);
