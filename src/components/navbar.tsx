import { Flex } from "@chakra-ui/react";

const navItems = [
  {
    title: "Home",
  },
];

const Navbar: React.FC = () => {
  return (
    <Flex flexDir="column" bg={"linear-gradient(to right, #222B3E, #0F1B32)"}>
      <div>hello</div>
      <div>hi</div>
    </Flex>
  );
};

export default Navbar;
