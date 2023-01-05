import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { MultiSelectTheme } from "chakra-multiselect";

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme,
  },
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
