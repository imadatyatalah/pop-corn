import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../theme";

import "@fontsource/poppins/latin-400.css";
import "@fontsource/poppins/latin-500.css";
import "@fontsource/poppins/latin-600.css";
import "@fontsource/poppins/latin-700.css";

const MyApp = ({ Component, pageProps }) => (
  <>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </>
);

export default MyApp;
