import Link from "next/link";

import {
  Flex,
  Icon,
  Text,
  Button,
  Box,
  Image,
  Input,
  useClipboard,
} from "@chakra-ui/react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";

import TopicFilterMenu from "./topicFilter";
import DifficultyFilterMenu from "./difficultyFilter";

import { MdNoteAlt } from "react-icons/md";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

import _ from "lodash";

const navItems = [
  {
    title: "Problems",
    href: "/",
    icon: MdNoteAlt,
  },
];

const Navbar: React.FC = () => {
  const { data, status } = useSession();
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  const { data: sharingLink } = trpc.view.getSharingLink.useQuery(undefined, {
    enabled: status === "authenticated",
  });

  return (
    <>
      <a
        href="https://github.com/labs-asterisk/interview-checklist"
        target="_blank"
        rel="noreferrer"
        className="github-corner"
        aria-label="View source on GitHub">
        <svg
          width={80}
          height={80}
          viewBox="0 0 250 250"
          style={{ fill: '#151513', color: '#fff', position: 'absolute', top: 0, border: 0, right: 0 }}
          aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" /><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{ transformOrigin: '130px 106px' }} className="octo-arm" /><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body" /></svg></a><style dangerouslySetInnerHTML={{ __html: ".github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}" }} />
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

          <Box bgColor="#323e59" p={3} borderRadius="5px">
            <Text fontSize="md" fontWeight="bold">
              Filter
            </Text>
            <TopicFilterMenu />
            <DifficultyFilterMenu />
          </Box>
        </Flex>

        <Box width="100%">
          {/* TODO: handle loading state */}
          {status === "authenticated" ? (
            <>
              <Box width="100%" mb={4}>
                <Flex>
                  <Input
                    value={sharingLink}
                    readOnly
                    borderColor="#525252"
                    borderTopRightRadius={0}
                    borderBottomRightRadius={0}
                  />
                  <Button
                    variant="outline"
                    borderColor="#525252"
                    borderTopLeftRadius={0}
                    borderBottomLeftRadius={0}
                    onClick={() => {
                      setValue(sharingLink ? sharingLink : "");
                      onCopy();
                    }}
                  >
                    {hasCopied ? <CheckIcon color="#0f7d14" /> : <CopyIcon />}
                  </Button>
                </Flex>
              </Box>

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
                    {_.truncate(data.user?.email as string, { length: 25 })}
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

          <Flex
            flexDir="column"
            rowGap={2}
            py={4}
            width="100%">
            <a
              style={{ width: "100%" }}
              href="https://www.producthunt.com/posts/interview-checklist?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-interview&#0045;checklist"
              rel="noreferrer"
              target="_blank">
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=373822&theme=dark"
                alt="Interview&#0032;Checklist - Making&#0032;interview&#0032;prep&#0032;great&#0032;again | Product Hunt"
                style={{
                  width: "100%",
                  aspectRatio: 250 / 54,
                }}
              />
            </a>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
