import { Flex, Grid, GridItem, Text, Box } from "@chakra-ui/react";

// import problems from '../data/mock/problems'
import probs from "../data/real/final_data.json";

const ProblemGrid: React.FC = () => {
  return (
    <Box p={10}>
      {probs.sections.map(({ sectionName, problems }) => (
        // <div>{JSON.stringify(section)}</div>
        <Box>
          <Text ml={5} fontSize="40px">
            {sectionName}
          </Text>
          <Flex width="100%" flexWrap="wrap" alignItems="center" gap={10}>
            {/* {problems.map((problem) => (
              <Box flex={1}>{JSON.stringify(problem)}</Box>
            ))} */}
            {problems.map(({ slug, name }) => (
              <Box
                flex={1}
                m={5}
                p={10}
                borderRadius="5px"
                bgColor="papayawhip"
                userSelect="none"
                cursor="pointer"
              >
                <Text fontSize="14px" whiteSpace="nowrap">
                  {name}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

export default ProblemGrid;
