import {
  Box, Grid, Text, GridItem
} from "@chakra-ui/react";
import { type NextPage } from "next";
import Layout from "../components/layout";
import ProblemBox from "../components/problemBox";
import problems from "../data/real/final_data.json";
import { Problem } from "../types/problem-data";

const ProblemsPage: NextPage = () => {
  return (
    <Layout title="Problems">
      <Box p={8}>
        {problems.sections.map(({ sectionName, problems }, i) => (
          <Box p={8} borderBottomColor="gray.100" borderBottomStyle="solid" borderBottomWidth={2} key={i}>
            <Text fontSize="2xl" fontWeight="bold" color="gray.700">{sectionName}</Text>

            <Grid templateColumns="repeat(10, 1fr)" gap="1px" p="1px" background="gray.100" my={4}>
              {problems.map((problem, j) => <GridItem background="white" p={2} key={j}>
                <ProblemBox problem={problem as Problem} />
              </GridItem>)}
            </Grid>
          </Box>
        ))}
      </Box>
    </Layout>
  );
};

export default ProblemsPage;
