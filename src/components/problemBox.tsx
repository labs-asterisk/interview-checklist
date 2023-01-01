import React, { useState } from "react";
import { render } from "react-dom";

import { Difficulty, type Problem } from "../types/problem-data";

import {
  Box,
  Text,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";

interface TagsBoxProps {
  difficulty: Difficulty;
  typeTags: string[];
}

const TagsBox: React.FC<TagsBoxProps> = ({ difficulty, typeTags }) => {
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
        // flex={1}
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
          // flex={1}
          px={3}
          py={1}
          bgColor="#3F3E3F"
          borderRadius="20px"
          textColor="#C3C4C8"
        >
          <Text fontSize="14px" whiteSpace="nowrap" align="center">
            {typeTag}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

interface ProblemBoxProps {
  problem: Problem;
}

const ProblemBox: React.FC<ProblemBoxProps> = ({
  problem: { name, link, occurence, tags, otherCompanies, difficulty },
}) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <Popover isLazy trigger="hover">
        <PopoverTrigger>
          <Flex
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
            position="relative"
            userSelect="none"
            cursor="pointer"
            height="100%"
            width="100%"
            alignItems="center"
            justifyContent="center"
            zIndex={1}
          >
            <Text fontSize="12px" textAlign="center">
              {name}
            </Text>
            {/* {isHovering && <HoverPanel />} */}
          </Flex>
        </PopoverTrigger>
        <PopoverContent
          p={1}
          bg="#282828"
          textColor="white"
          borderColor="#282828"
        >
          <PopoverArrow bg="#282828" />
          {/* <PopoverCloseButton /> */}
          <PopoverHeader borderBottomWidth={0}>
            <TagsBox difficulty={difficulty} typeTags={tags} />
          </PopoverHeader>
          {/* <PopoverBody>
          </PopoverBody> */}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ProblemBox;
