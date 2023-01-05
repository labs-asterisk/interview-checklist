import React, { useState } from "react";

import {
  type Difficulty,
  type Problem,
  // type AttemptingState,
  AttemptingState,
} from "../types/problem-data";

import {
  Box,
  Text,
  Flex,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
} from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";

import { trpc } from "../utils/trpc";

import TagsBox from "./tagsBox";

const attemptingStates = Object.values(AttemptingState);

interface ProblemBoxProps {
  problem: Problem;
  companyName: string;
  initAttemptingState: AttemptingState;
}

const ProblemBox: React.FC<ProblemBoxProps> = ({
  problem: { name, occurence, slug, link, tags, otherCompanies, difficulty },
  companyName,
  initAttemptingState,
}) => {
  const trpcCtx = trpc.useContext();
  const mut = trpc.attempt.attemptProblem.useMutation({
    onSuccess: () => {
      trpcCtx.view.getSolvedSlugs.invalidate();
    },
  });

  const [attemptingState, setAttemptingState] =
    useState<AttemptingState>(initAttemptingState);

  const currentAsIdx = attemptingStates.indexOf(attemptingState);
  const nextAsIdx = (currentAsIdx + 1) % attemptingStates.length;

  const handleButtonClick = () => {
    if (mut.isLoading) return;

    setAttemptingState(attemptingStates[nextAsIdx] as AttemptingState);

    mut.mutate({
      slug,
      newAttemptingState: attemptingStates[nextAsIdx] as AttemptingState,
    });

    console.log(
      `${slug} changed from ${
        attemptingStates[currentAsIdx - 1]
      } to ${attemptingState}`
    );
  };

  const bgColor =
    attemptingState === "Untouched"
      ? "white"
      : attemptingState === "Attempting"
      ? "#ffeeba"
      : attemptingState === "Unimplemented"
      ? "#b8daff"
      : "#c3e6cb";

  const buttonColorScheme =
    attemptingState === "Untouched"
      ? "yellow"
      : attemptingState === "Attempting"
      ? "blue"
      : attemptingState === "Unimplemented"
      ? "green"
      : "gray";

  const buttonText =
    attemptingState === "Untouched"
      ? "Start Solving"
      : attemptingState === "Attempting"
      ? "Implement Solution"
      : attemptingState === "Unimplemented"
      ? "Finish Implementation"
      : "Reset";

  return (
    <>
      <Popover isLazy trigger="hover" openDelay={30} closeDelay={30}>
        <PopoverTrigger>
          <Flex
            onClick={handleButtonClick}
            position="relative"
            userSelect="none"
            cursor="pointer"
            height="100%"
            width="100%"
            alignItems="center"
            justifyContent="center"
            zIndex={1}
            p={3}
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
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme={buttonColorScheme}
              variant={attemptingState === "Solved" ? "outline" : "solid"}
              width="100%"
              mb={3}
              onClick={handleButtonClick}
            >
              {buttonText}
            </Button>
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

export default ProblemBox;
