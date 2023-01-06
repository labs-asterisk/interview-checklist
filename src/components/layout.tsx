import { type ReactNode } from "react";
import Head from "next/head";
import GridLoader from "react-spinners/GridLoader";
import { Grid, GridItem, Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { AnalyticsWrapper } from "./analytics";

import Navbar from "./navbar";

interface LayoutProps {
  title: string;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>
          {title ? `${title} | Interview Checklist` : "Interview Checklist"}
        </title>
        <meta name="description" content="Make interview prep great again :P" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Grid
          maxH="100vh"
          w="100vw"
          templateColumns="1fr 5fr"
          overflowY="hidden"
        >
          <GridItem minH="100%">
            <Navbar />
          </GridItem>
          <GridItem height="100vh" overflowY="auto">
            <main>
              {status === "loading" ? (
                <Flex minH="100vh" alignItems="center" justifyContent="center">
                  <GridLoader color="#172237" size={20} />
                </Flex>
              ) : (
                children
              )}
            </main>
          </GridItem>
        </Grid>
        <AnalyticsWrapper />
      </main>
    </>
  );
};

export default Layout;
