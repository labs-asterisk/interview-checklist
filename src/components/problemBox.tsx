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
          <Box
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
            flex={1}
            p={3}
            borderRadius="5px"
            bgColor="papayawhip"
            position="relative"
            display="inline-block"
            userSelect="none"
            cursor="pointer"
            transition="all 0.3s ease-in"
            zIndex={1}
            _hover={{
              transform: "translateY(-1px)",
              boxShadow:
                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            }}
          >
            <Text fontSize="12px" whiteSpace="nowrap" align="center">
              {name}
            </Text>
            {/* {isHovering && <HoverPanel />} */}
          </Box>
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
