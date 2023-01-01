import React, { useState } from "react";
import { render } from "react-dom";

import { type Problem } from "../types/problem-data";

import {
  Box,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";

const HoverPanel = () => {
  return (
    <Box
      position="absolute"
      width="120px"
      height="120px"
      bgColor="green"
      borderRadius="5px"
      mt={5}
      p={5}
      // top="100%"
      // left="50%"
      // marginLeft="-60px"
      zIndex={30}
    >
      {/* <Text>hi</Text> */}
    </Box>
  );

  // return (
  //   <div>
  //     Hovering right meow!
  //     <span role="img" aria-label="cat">
  //       🐱
  //     </span>
  //   </div>
  // );
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
        <PopoverContent>
          <PopoverArrow />
          {/* <PopoverCloseButton /> */}
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>
            Are you sure you want to have that milkshake?
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ProblemBox;
