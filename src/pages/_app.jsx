import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";
import { DefaultSeo } from "next-seo";

import { theme } from "@/theme/index";
import Header from "@/components/header";
import SEO from "next-seo.config";

import "@fontsource/poppins/latin-300.css";
import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-600.css";

const MyApp = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <DefaultSeo {...SEO} />

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme}>
            <Header />
            <Component {...pageProps} />
          </ChakraProvider>
        </Hydrate>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
