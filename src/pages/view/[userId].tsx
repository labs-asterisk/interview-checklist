import { type NextPage } from "next";
import { useRouter } from "next/router";

import { Flex, Box, Grid, GridItem, Text } from "@chakra-ui/react";
import GridLoader from "react-spinners/GridLoader";

import Layout from "../../components/layout";
import ProblemViewBox from "../../components/problemViewBox";

import problems from "../../data/real/final_final_data.json";
import ProblemCounts from "../../components/problemCounts";

import { type Problem, AttemptingState } from "../../types/problem-data";

import { trpc } from "../../utils/trpc";
import ProgressBar from "../../components/progressBar";

const ViewPage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { isLoading, data, isError } = trpc.view.getGrid.useQuery({
    userId: userId ? userId.toString() : "",
  });

  if (isLoading)
    return (
      <Layout title="Problems">
        <Flex minH="100vh" alignItems="center" justifyContent="center">
          <GridLoader color="#172237" size={20} />
        </Flex>
      </Layout>
    );

  if (isError)
    return (
      <Layout title="Problems">
        <Flex minH="100vh" alignItems="center" justifyContent="center">
          {/* <GridLoader color="#172237" size={20} /> */}
          <div>This user does not exist.</div>
        </Flex>
      </Layout>
    );

  // if (isError) return <div>Error in loading data</div>;
  return (
    <Layout title="Problems">
      <Text
        ml={16}
        mt={8}
        fontSize="4xl"
        fontWeight="bold"
        color="gray.700"
      >{`${data?.user.name}'s Checklist`}</Text>
      <Box p={8} pt={0}>
        <ProblemCounts userId={userId as string} />
        {problems.sections.map(({ sectionName, problems }, i) => (
          <Box
            p={8}
            pt={2}
            borderBottomColor="gray.100"
            borderBottomStyle="solid"
            borderBottomWidth={2}
            key={i}
          >
            <Text fontSize="2xl" fontWeight="bold" color="gray.700">
              {sectionName}
            </Text>

            <ProgressBar company={sectionName} userId={userId as string} />

            <Grid
              templateColumns="repeat(10, 1fr)"
              gap="1px"
              p="1px"
              background="gray.100"
              my={4}
            >
              {problems.map((problem, j) => {
                const userP = data?.userProbs.find(
                  (obj) => obj.problemSlug === problem.slug
                );

                let initAS = AttemptingState.Untouched;
                if (userP) {
                  initAS = userP.attemptingState as AttemptingState;
                }

                return (
                  <GridItem background="white" key={j}>
                    <ProblemViewBox
                      initAttemptingState={initAS}
                      problem={problem as Problem}
                      companyName={sectionName}
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

export default ViewPage;
