import { Box, Grid, Text, GridItem, Flex } from "@chakra-ui/react";
import { type NextPage } from "next";
import GridLoader from "react-spinners/GridLoader";

import Layout from "../components/layout";
// import ProblemBox from "../components/problemBox";
import ProblemGrid from "../components/problemGrid";
import ProblemCounts from "../components/problemCounts";

import problems from "../data/real/final_final_data.json";

import { type Problem, AttemptingState } from "../types/problem-data";

import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { UserProblem } from "@prisma/client";

const ProblemsPage: NextPage = () => {
  const { data, status } = useSession();

  const {
    isLoading,
    data: problemAttemptingStates,
    isError,
  } = trpc.attempt.getProblemAttemptingStates.useQuery(undefined, {
    enabled: status === "authenticated",
  });

  if (status === "authenticated" && isLoading)
    return (
      <Layout title="Problems">
        <Flex minH="100vh" alignItems="center" justifyContent="center">
          <GridLoader color="#172237" size={20} />
        </Flex>
      </Layout>
    );

  if (status === "authenticated" && isError)
    return <div>Error in loading data</div>;

  return (
    <Layout title="Problems">
      {status === "authenticated" ? (
        <Flex justifyContent="space-between" userSelect="none">
          <Text
            ml={16}
            mt={8}
            fontSize="4xl"
            fontWeight="bold"
            color="gray.700"
          >{`${data?.user?.name}'s Checklist`}</Text>
          <ProblemCounts />
        </Flex>
      ) : (
        <></>
      )}

      {status === "unauthenticated" ? <Box pt={10} /> : <></>}

      <Box p={8} pt={0}>
        {problems.sections.map(({ sectionName, problems }, i) => {
          // const {
          //   isLoading: isProgressLoading,
          //   data: progressData,
          //   isError: isProgressError,
          // } = trpc.view.getProgress.useQuery({
          //   companyName: sectionName,
          // });

          // if (!isProgressLoading) {
          //   console.log({ progressData });
          // }

          return status === "unauthenticated" ? (
            <ProblemGrid
              problems={problems as Problem[]}
              sectionName={sectionName}
              userProbs={problemAttemptingStates as UserProblem[]}
              key={i}
              viewOnly
            />
          ) : (
            <ProblemGrid
              problems={problems as Problem[]}
              sectionName={sectionName}
              userProbs={problemAttemptingStates as UserProblem[]}
              key={i}
            />
          );

          // return (
          //   <Box
          //     p={8}
          //     borderBottomColor="gray.100"
          //     borderBottomStyle="solid"
          //     borderBottomWidth={2}
          //     key={i}
          //   >
          //     <Text fontSize="2xl" fontWeight="bold" color="gray.700">
          //       {sectionName}
          //     </Text>

          //     <Grid
          //       templateColumns="repeat(10, 1fr)"
          //       gap="1px"
          //       p="1px"
          //       background="gray.100"
          //       my={4}
          //     >
          //       {problems.map((problem, j) => {
          //         if (status === "unauthenticated") {
          //           return (
          //             <GridItem background="white" key={j}>
          //               <ProblemBox
          //                 initAttemptingState={AttemptingState.Untouched}
          //                 companyName={sectionName}
          //                 problem={problem as Problem}
          //               />
          //             </GridItem>
          //           );
          //         }

          //         let userP;
          //         if (problemAttemptingStates) {
          //           userP = problemAttemptingStates.find(
          //             (obj) => obj.problemSlug === problem.slug
          //           );
          //         }

          //         let initAS = AttemptingState.Untouched;
          //         if (userP) {
          //           initAS = userP.attemptingState as AttemptingState;
          //         }

          //         return (
          //           <GridItem background="white" key={j}>
          //             <ProblemBox
          //               initAttemptingState={initAS}
          //               companyName={sectionName}
          //               problem={problem as Problem}
          //             />
          //           </GridItem>
          //         );
          //       })}
          //     </Grid>
          //   </Box>
          // );
        })}
      </Box>
    </Layout>
  );
};

export default ProblemsPage;
