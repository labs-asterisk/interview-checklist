import Link from "next/link";

import { Flex, Icon, Text, Button, Box, Image } from "@chakra-ui/react";

import { MdNoteAlt } from "react-icons/md";
import { signIn, signOut, useSession } from "next-auth/react";

const navItems = [
  {
    title: "Problems",
    href: "/",
    icon: MdNoteAlt,
  },
];

const Navbar: React.FC = () => {
  const { data, status } = useSession();

  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      alignItems="flex-start"
      width="100%"
      bg={"linear-gradient(to right, #222B3E, #0F1B32)"}
      textColor="white"
      p={3}
      minH="100%"
    >
      <Flex width="100%" flex={1} flexDir="column">
        {navItems.map(({ title, href, icon }) => (
          <Link href={href} key={title}>
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
      </Flex>

      <Box width="100%">
        {/* TODO: handle loading state */}
        {status === "authenticated" ? (
          <>
            <Flex mb={4} columnGap={4}>
              <Image
                height={12}
                width={12}
                rounded="full"
                alt="DP"
                src={data.user?.image ?? ""}
              />
              <Flex flexDir="column" justifyContent="center" flex={1}>
                <Text fontSize="lg" fontWeight="semibold">
                  {data.user?.name}
                </Text>
                <Text fontSize="sm" color="gray.300">
                  {data.user?.email}
                </Text>
              </Flex>
            </Flex>

            <Button
              colorScheme="blue"
              size="lg"
              width="100%"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </>
        ) : (
          <Button
            colorScheme="blue"
            size="lg"
            width="100%"
            onClick={() => signIn()}
          >
            Sign in
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
