import React, { useState } from "react";
import Link from "next/link";

import {
  type Difficulty,
  type Problem,
  type AttemptingState,
} from "../types/problem-data";

import {
  Box,
  Text,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
} from "@chakra-ui/react";

import TagsBox from "./tagsBox";

interface ProblemViewBoxProps {
  problem: Problem;
  initAttemptingState: AttemptingState;
  companyName: string;
}

const ProblemViewBox: React.FC<ProblemViewBoxProps> = ({
  problem: { name, slug, occurence, link, tags, otherCompanies, difficulty },
  initAttemptingState: attemptingState,
  companyName,
}) => {
  const bgColor =
    attemptingState === "Untouched"
      ? "white"
      : attemptingState === "Attempting"
      ? "#ffeeba"
      : attemptingState === "Unimplemented"
      ? "#b8daff"
      : "#c3e6cb";

  return (
    <>
      <Popover isLazy trigger="hover" openDelay={10} closeDelay={10}>
        <PopoverTrigger>
          <Flex
            position="relative"
            userSelect="none"
            cursor="pointer"
            height="100%"
            width="100%"
            alignItems="center"
            justifyContent="center"
            zIndex={1}
            p={2}
            bgColor={bgColor}
          >
            <Text
              fontSize="12px"
              textAlign="center"
              onClick={(e) => {
                e.preventDefault();
                window.open(link, "_blank");
                e.stopPropagation();
              }}
              _hover={{ textDecoration: "underline" }}
            >
              {name}
            </Text>
          </Flex>
        </PopoverTrigger>
        <PopoverContent
          p={1}
          bg="#282828"
          textColor="white"
          borderColor="#282828"
          userSelect="none"
        >
          <PopoverArrow bg="#282828" />
          <PopoverHeader borderBottomWidth={0}>
            <TagsBox
              difficulty={difficulty}
              typeTags={tags}
              companiesTags={[[companyName, occurence], ...otherCompanies]}
            />
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ProblemViewBox;
