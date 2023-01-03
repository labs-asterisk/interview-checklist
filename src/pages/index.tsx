import { Box, Grid, Text, GridItem } from "@chakra-ui/react";
import { type NextPage } from "next";

import Layout from "../components/layout";
import ProblemBox from "../components/problemBox";

import problems from "../data/real/final_data.json";

import { Problem, AttemptingState } from "../types/problem-data";

import { trpc } from "../utils/trpc";
import _ from "lodash";

import { type UserProblem } from "@prisma/client";

const ProblemsPage: NextPage = () => {
  const {
    isLoading,
    data: problemAttemptingStates,
    isError,
  } = trpc.attempt.getProblemAttemptingStates.useQuery();

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error in loading data</div>;

  return (
    <Layout title="Problems">
      <Box p={8}>
        {problems.sections.map(({ sectionName, problems }, i) => (
          <Box
            p={8}
            borderBottomColor="gray.100"
            borderBottomStyle="solid"
            borderBottomWidth={2}
            key={i}
          >
            <Text fontSize="2xl" fontWeight="bold" color="gray.700">
              {sectionName}
            </Text>

            <Grid
              templateColumns="repeat(10, 1fr)"
              gap="1px"
              p="1px"
              background="gray.100"
              my={4}
            >
              {problems.map((problem, j) => {
                const userP = problemAttemptingStates.find(
                  (obj) => obj.problemSlug === problem.slug
                );

                let initAS = AttemptingState.Untouched;
                if (userP) {
                  initAS = userP.attemptingState as AttemptingState;
                }

                return (
                  <GridItem background="white" key={j}>
                    <ProblemBox
                      initAttemptingState={initAS}
                      problem={problem as Problem}
                    />
                  </GridItem>
                );
              })}
            </Grid>
          </Box>
        ))}
      </Box>
    </Layout>
  );
};

export default ProblemsPage;
