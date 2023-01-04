import { Box, Text, Grid, GridItem } from "@chakra-ui/react";

import ProblemBox from "./problemBox";
import ProblemViewBox from "./problemViewBox";
import ProgressBar from "./progressBar";

import { type Problem, AttemptingState } from "../types/problem-data";
import { type UserProblem } from "@prisma/client";

import { trpc } from "../utils/trpc";

interface ProblemGridProps {
  sectionName: string;
  problems: Problem[];
  userProbs: UserProblem[];
  viewOnly?: boolean;
}

const ProblemGrid: React.FC<ProblemGridProps> = ({
  sectionName,
  problems,
  userProbs,
  viewOnly,
}) => {
  const {
    isLoading: isProgressLoading,
    data: progressData,
    isError: isProgressError,
  } = trpc.view.getProgress.useQuery({
    companyName: sectionName,
  });

  if (!isProgressLoading) {
    console.log({ sectionName, progressData });
  }

  return (
    <Box
      p={8}
      pt={2}
      borderBottomColor="gray.100"
      borderBottomStyle="solid"
      borderBottomWidth={2}
    >
      <Text fontSize="2xl" fontWeight="bold" color="gray.700">
        {sectionName}
      </Text>

      <ProgressBar company={sectionName} />

      <Grid
        templateColumns="repeat(10, 1fr)"
        gap="1px"
        p="1px"
        background="gray.100"
        my={4}
      >
        {problems.map((problem, j) => {
          let userP;
          if (userProbs) {
            userP = userProbs.find((obj) => obj.problemSlug === problem.slug);
          }

          let initAS = AttemptingState.Untouched;
          if (userP) {
            initAS = userP.attemptingState as AttemptingState;
          }

          return (
            <GridItem background="white" key={j}>
              {viewOnly ? (
                <ProblemViewBox
                  initAttemptingState={initAS}
                  problem={problem as Problem}
                  companyName={sectionName}
                />
              ) : (
                <ProblemBox
                  initAttemptingState={initAS}
                  problem={problem as Problem}
                  companyName={sectionName}
                />
              )}
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProblemGrid;
