// @ts-nocheck
import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { trpc } from "../utils/trpc";
import _ from "lodash";

import data from "../data/real/final_final_data.json";

type OverallProgressBarProps = {
  userId?: string;
};

const ProblemCounts: React.FC<OverallProgressBarProps> = ({ userId }) => {
  const solvedProblemsQuery = trpc.view.getSolvedSlugs.useQuery({ userId });
  const [solvedSlugs, setSolvedSlugs] = React.useState<
    { problemSlug: string; status: string }[]
  >([]);
  const tempCompanySlugs = data.sections.map((s) =>
    s.problems.map((x) => x.slug)
  );
  const companySlugs = [].concat.apply([], tempCompanySlugs);

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
      <Flex mr={20} mt={6}>
        <Flex
          flexDirection="column"
          alignItems="center"
          borderColor="gray.100"
          borderWidth={1}
          borderRightWidth={0}
          borderStyle="solid"
          pl={5}
          pr={5}
          pt={2}
          pb={2}
        >
          <Text fontSize="xl">
            {String(
              solvedSlugs.filter(
                (x) => x.status === "Unimplemented" || x.status === "Solved"
              ).length
            )}
          </Text>
          <Text fontSize="md">Total Solved</Text>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          borderColor="gray.100"
          borderWidth={1}
          borderStyle="solid"
          pl={5}
          pr={5}
          pt={2}
          pb={2}
        >
          <Text fontSize="xl">
            {String(
              solvedSlugs.filter((x) => x.status === "Attempting").length
            )}
          </Text>
          <Text fontSize="md">Total Attempting</Text>
        </Flex>
      </Flex>
    </>
  );
};

export default ProblemCounts;
