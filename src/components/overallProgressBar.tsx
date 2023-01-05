// @ts-nocheck
import React from "react";
import {
  Flex,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody
} from "@chakra-ui/react";
import { trpc } from "../utils/trpc";
import * as _ from "lodash";

import data from "../data/real/final_final_data.json";

type OverallProgressBarProps = {
    userId?: string;
  };

  
const OverallProgressBar: React.FC<OverallProgressBarProps> = ({userId}) => {
  const solvedProblemsQuery = trpc.view.getSolvedSlugs.useQuery({ userId });
  const [solvedSlugs, setSolvedSlugs] = React.useState<
    { problemSlug: string; status: string }[]
  >([]);
  const tempCompanySlugs = data.sections.map((s) => (s.problems.map((x) => x.slug)));
  const companySlugs = [].concat.apply([], tempCompanySlugs);

  React.useEffect(() => {
    const ss = (solvedProblemsQuery.data ?? [])
      .filter((x) => companySlugs.includes(x.problemSlug))
      .map((x) => ({ problemSlug: x.problemSlug, status: x.attemptingState }));
    setSolvedSlugs(ss);
    // const solvedSlugs = solvedProblemsQuery.data.filter(x => companySlugs.includes(x));
  }, [solvedProblemsQuery.data]);
  console.log(solvedSlugs);
  console.log(companySlugs);
  return (
    <>
      {/* <pre>{JSON.stringify(solvedSlugs, null, 2)}</pre> */}
      <Flex justifyContent="space-evenly">
        <Text fontSize="2xl" fontWeight="bold" color="gray.700">
            {"Total Solved: " + String(solvedSlugs.filter((x) => (x.status === "Solved" || x.status === "Unimplemented")).length)}
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="gray.700">
            {"Total Attempting: " + String(solvedSlugs.filter((x) => (x.status === "Attempting")).length)}
        </Text>
      </Flex>
    </>
  );
};

export default OverallProgressBar;
