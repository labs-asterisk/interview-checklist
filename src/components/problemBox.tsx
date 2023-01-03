import React, { useState } from "react";
import Link from "next/link";

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

import { ExternalLinkIcon, ArrowForwardIcon } from "@chakra-ui/icons";

import { trpc } from "../utils/trpc";

const attemptingStates = Object.values(AttemptingState);

interface TagsBoxProps {
  difficulty: Difficulty;
  typeTags: string[];
  otherCompaniesTags: (string | number)[][];
}

const TagsBox: React.FC<TagsBoxProps> = ({
  difficulty,
  typeTags,
  otherCompaniesTags,
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
          key={typeTag + otherCompaniesTags.toString()}
        >
          <Text fontSize="14px" whiteSpace="nowrap" align="center">
            {typeTag}
          </Text>
        </Box>
      ))}

      {otherCompaniesTags.map(([cmpName, cmpOcc], i) => (
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

interface ProblemBoxProps {
  problem: Problem;
  initAttemptingState: AttemptingState;
}

const ProblemBox: React.FC<ProblemBoxProps> = ({
  problem: { name, slug, link, tags, otherCompanies, difficulty },
  initAttemptingState,
}) => {
  const mut = trpc.attempt.attemptProblem.useMutation();

  const [isHovering, setIsHovering] = useState(false);

  const [attemptingState, setAttemptingState] =
    useState<AttemptingState>(initAttemptingState);

  const currentAsIdx = attemptingStates.indexOf(attemptingState);
  const nextAsIdx = (currentAsIdx + 1) % attemptingStates.length;

  const handleButtonClick = () => {
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
      <Popover isLazy trigger="hover" openDelay={10} closeDelay={10}>
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
            p={2}
            bgColor={bgColor}
          >
            <Link href={link} target="_blank">
              <Text fontSize="12px" textAlign="center">
                {name}{" "}
                <ExternalLinkIcon display={isHovering ? "inline" : "none"} />
              </Text>
            </Link>
          </Flex>
        </PopoverTrigger>
        <PopoverContent
          p={1}
          bg="#282828"
          textColor="white"
          borderColor="#282828"
        >
          <PopoverArrow bg="#282828" />
          <PopoverHeader borderBottomWidth={0}>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme={buttonColorScheme}
              variant={attemptingState === "Solved" ? "outline" : "solid"}
              _hover={{
                textColor: attemptingState === "Solved" ? "white" : "",
              }}
              width="100%"
              mb={3}
              onClick={handleButtonClick}
            >
              {buttonText}
            </Button>
            <TagsBox
              difficulty={difficulty}
              typeTags={tags}
              otherCompaniesTags={otherCompanies}
            />
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ProblemBox;
