import Link from "next/link";

import { Flex, Icon, Text } from "@chakra-ui/react";

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
      p={10}
    >
      {navItems.map(({ title, href, icon }) => (
        <Link href={href}>
          <Flex
            mb={10}
            p={10}
            borderRadius="5px"
            alignItems="center"
            transition="all 0.2s ease-in-out"
            _hover={{ bg: "rgba(221,226,255, 0.08)" }}
          >
            <Icon h={30} w={30} as={icon} />
            <Text ml={10}>{title}</Text>
          </Flex>
        </Link>
      ))}
    </Flex>
  );
};

export default Navbar;
