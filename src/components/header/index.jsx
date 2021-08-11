import React from "react";
import NextImage from "next/image";
import NextLink from "next/link";

import { Box } from "@chakra-ui/react";

import { MAX_WIDTH } from "config";
import Navbar from "./navBar";

const Header = () => (
  <Box as="header" boxShadow="md">
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      h="4rem"
      px={[4, 8, 12, 16, 20]}
      maxW={MAX_WIDTH}
      mx="auto"
    >
      <div>
        <NextLink href="/">
          <a>
            <NextImage
              src="/popcorn.png"
              width="50"
              height="50"
              alt="pop corn"
            />
          </a>
        </NextLink>
      </div>
      <Navbar />
    </Box>
  </Box>
);

export default Header;
