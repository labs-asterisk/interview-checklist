export interface Checklist {
  sections: Section[];
}

export interface Section {
  sectionName: string;
  problems: Problem[];
}

export interface Problem {
  slug: string;
  name: string;
  link: string;
  otherCompanies: Array<Array<number | string>>;
  tags: string[];
  difficulty: Difficulty;
  occurence: number;
}

export enum Difficulty {
  Easy = "Easy",
  Hard = "Hard",
  Medium = "Medium",
}
