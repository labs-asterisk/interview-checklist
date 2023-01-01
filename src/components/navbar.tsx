import Link from "next/link";

import { Flex, Icon, Text, Button } from "@chakra-ui/react";

import { MdHome, MdQuestionAnswer, MdNoteAlt } from "react-icons/md";

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: MdHome,
  },
  {
    title: "Problems",
    href: "/problems",
    icon: MdNoteAlt,
  },
];

const Navbar: React.FC = () => {
  return (
    <Flex
      minH="100%"
      flexDir="column"
      bg={"linear-gradient(to right, #222B3E, #0F1B32)"}
      textColor="white"
      p={3}
    >
      {navItems.map(({ title, href, icon }) => (
        <Link href={href}>
          <Flex
            mb={3}
            p={3}
            borderRadius="5px"
            alignItems="center"
            transition="all 0.2s ease-in-out"
            _hover={{ bg: "rgba(221,226,255, 0.08)" }}
          >
            <Icon boxSize={7} as={icon} />
            <Text ml={3} fontSize="16px">
              {title}
            </Text>
          </Flex>
        </Link>
      ))}
      <Button colorScheme="blue" size="lg">
        Sign in with Google
      </Button>
    </Flex>
  );
};

export default Navbar;
