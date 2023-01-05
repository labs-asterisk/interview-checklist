// @ts-nocheck
import { Select } from "@chakra-ui/react";
import { MultiSelect, useMultiSelect } from "chakra-multiselect";
import { useAtom } from "jotai";
import { useState } from "react";

import filterTags from "../data/filter_tags.json";
import {
  problemsAtom,
  filterTopicsAtom,
  filterDifficultyAtom,
} from "../utils/store";

import problems from "../data/problem_data.json";

function toPascalCase(s: string) {
  return `${s}`
    .toLowerCase()
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w*)/, "g"),
      ($1, $2, $3) => `${$2.toUpperCase() + $3}`
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
}

const filterTopicsOptions = Object.entries(filterTags.topicWise).map(
  ([tag, occ], j) => ({
    label: `${toPascalCase(tag)} (${occ})`,
    value: tag,
  })
);

const TopicFilterMenu = () => {
  const [_, setProblems] = useAtom(problemsAtom);
  const [filterTopics, setFilterTopics] = useAtom(filterTopicsAtom);
  const [filterDifficulties] = useAtom(filterDifficultyAtom);
  const [value, setValue] = useState<string[]>([]);

  return (
    <MultiSelect
      onChange={(_value) => {
        const _topics =
          _value.length === 0
            ? filterTopicsOptions.map((option) => option.value)
            : _value;
        console.log({ _topics });
        setProblems({
          sections: problems.sections.map((section) => ({
            ...section,
            problems: section.problems.filter(
              (problem) =>
                problem.tags.some((tag) => _topics.includes(tag)) &&
                filterDifficulties.includes(problem.difficulty)
            ),
          })),
        });
        setFilterTopics(_topics);
        setValue(_value);
      }}
      value={value}
      label="Filter Topicwise"
      borderColor="gray.200"
      backgroundColor="black"
      textColor="black"
      options={filterTopicsOptions}
    />
  );
};

export default TopicFilterMenu;
