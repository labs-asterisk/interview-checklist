import { Flex, Box, Text } from "@chakra-ui/react";

import { type Difficulty } from "../types/problem-data";

interface TagsBoxProps {
  difficulty: Difficulty;
  typeTags: string[];
  companiesTags: (string | number)[][];
}

const TagsBox: React.FC<TagsBoxProps> = ({
  difficulty,
  typeTags,
  companiesTags,
}) => {
  const bgColor =
    difficulty === "Easy"
      ? "#2A3C3B"
      : difficulty === "Medium"
      ? "#493F2A"
      : "#482C30";

  const textColor =
    difficulty === "Easy"
      ? "#00B9A3"
      : difficulty === "Medium"
      ? "#FEC11C"
      : "#FE365F";

  return (
    <Flex width="100%" flexWrap="wrap" alignItems="center" gap={2}>
      <Box
        px={3}
        py={1}
        borderRadius="20px"
        bgColor={bgColor}
        textColor={textColor}
      >
        <Text
          fontSize="14px"
          whiteSpace="nowrap"
          align="center"
          fontWeight="bold"
        >
          {difficulty}
        </Text>
      </Box>

      {typeTags.map((typeTag) => (
        <Box
          px={3}
          py={1}
          bgColor="#3F3E3F"
          borderRadius="20px"
          textColor="#C3C4C8"
          key={typeTag + companiesTags.toString()}
        >
          <Text fontSize="14px" whiteSpace="nowrap" align="center">
            {typeTag}
          </Text>
        </Box>
      ))}

      {companiesTags.map(([cmpName, cmpOcc], i) => (
        <Box
          px={3}
          py={1}
          bgColor="#3F3E3F"
          borderRadius="20px"
          textColor="#C3C4C8"
          key={`${cmpName} ${cmpOcc} ${i}`}
        >
          <Text fontSize="14px" whiteSpace="nowrap" align="center">
            {`${cmpName} (x${cmpOcc})`}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

export default TagsBox;
