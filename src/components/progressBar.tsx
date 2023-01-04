// @ts-nocheck
import React from "react";
import { Flex } from "@chakra-ui/react";
import { trpc } from "../utils/trpc";
import * as _ from "lodash";

import data from "../data/real/final_final_data.json";

type ProgressBarProps = {
  company: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ company }) => {
  const solvedProblemsQuery = trpc.view.getSolvedSlugs.useQuery();
  const [solvedSlugs, setSolvedSlugs] = React.useState<
    { problemSlug: string; status: string }[]
  >([]);
  const companySlugs = data.sections
    .find((s) => s.sectionName === company)
    .problems.map((x) => x.slug);

  React.useEffect(() => {
    const ss = (solvedProblemsQuery.data ?? [])
      .filter((x) => companySlugs.includes(x.problemSlug))
      .map((x) => ({ problemSlug: x.problemSlug, status: x.attemptingState }));
    setSolvedSlugs(ss);
    // const solvedSlugs = solvedProblemsQuery.data.filter(x => companySlugs.includes(x));
  }, [solvedProblemsQuery.data]);

  return (
    <>
      {/* <pre>{JSON.stringify(solvedSlugs, null, 2)}</pre> */}
      <Flex
        bg="gray.200"
        my={4}
        height="15px"
        width="100%"
        rounded="full"
        overflow="hidden"
      >
        <Flex
          bg="#49a75e"
          height="100%"
          width={
            String(
              (solvedSlugs.filter((x) => x.status === "Solved").length /
                companySlugs.length) *
                100
            ) + "%"
          }
        />
        <Flex
          bg="#b8daff"
          height="100%"
          width={
            String(
              (solvedSlugs.filter((x) => x.status === "Unimplemented").length /
                companySlugs.length) *
                100
            ) + "%"
          }
        />
        <Flex
          bg="#ffeeba"
          height="100%"
          width={
            String(
              (solvedSlugs.filter((x) => x.status === "Attempting").length /
                companySlugs.length) *
                100
            ) + "%"
          }
        />
      </Flex>
    </>
  );
};

export default ProgressBar;
