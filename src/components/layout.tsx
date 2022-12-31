import { type ReactNode } from "react";

import Head from "next/head";

import { Grid, GridItem } from "@chakra-ui/react";

import Navbar from "./navbar";

interface LayoutProps {
  title: String;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>
          {title ? `${title} | Interview Checklist` : "Interview Checklist"}
        </title>
        <meta name="description" content="Make interview prep great again :P" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid minH="100vh" w="100vw" templateColumns="1fr 5fr">
        <GridItem minH="100%">
          <Navbar />
        </GridItem>
        <GridItem>
          <main>{children}</main>
        </GridItem>
      </Grid>
    </>
  );
};

export default Layout;
