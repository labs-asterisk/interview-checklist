import { Select } from "@chakra-ui/react";

import filterTags from "../data/real/filter_tags.json";

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

const FilterMenu = () => {
  return (
    <Select placeholder="Filter" borderColor="gray.200">
      {Object.entries(filterTags).map(([category, tags], i) => (
        <optgroup label={toPascalCase(category)} key={i}>
          {Object.entries(tags).map(([tag, occ], j) => (
            <option value={tag} key={j}>{`${toPascalCase(
              tag
            )} (${occ})`}</option>
          ))}
        </optgroup>
      ))}
    </Select>
  );
};

export default FilterMenu;
