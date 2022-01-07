import Image from "next/image";
import Link from "next/link";

import { Box, chakra } from "@chakra-ui/react";

import { MAX_WIDTH } from "config";
import Navbar from "./navBar";

const Header = () => (
  <Box as="header" boxShadow="md">
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      h="4.25rem"
      px={[4, 8, 12, 16, 20]}
      maxW={MAX_WIDTH}
      mx="auto"
    >
      <div>
        <Link href="/" passHref>
          <chakra.a display="flex">
            <Image src="/popcorn.png" width="50" height="50" alt="pop corn" />
          </chakra.a>
        </Link>
      </div>
      <Navbar />
    </Box>
  </Box>
);

export default Header;
