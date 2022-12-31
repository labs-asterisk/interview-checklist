import { Flex, Grid, GridItem, Text, Box } from "@chakra-ui/react";

// import problems from '../data/mock/problems'
import probs from "../data/real/final_data.json";

import ProblemBox from "./problemBox";
import { type Problem } from "../types/problem-data";

const ProblemGrid: React.FC = () => {
  return (
    <Box p={10}>
      {probs.sections.map(({ sectionName, problems }) => (
        // <div>{JSON.stringify(section)}</div>
        <Box>
          <Text ml={5} fontSize="40px">
            {sectionName}
          </Text>
          <Flex width="100%" flexWrap="wrap" alignItems="center" gap={8}>
            {problems.map((problem) => (
              <ProblemBox problem={problem as Problem} />
            ))}
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

export default ProblemGrid;
