import React, { useState } from "react";
import NextLink from "next/link";

import { Box, chakra, useColorModeValue } from "@chakra-ui/react";
import HamburgerMenu from "./hamburgerMenu";

const LINKS = [
  { name: "Movies", path: "/movie/popular" },
  { name: "Tv Shows", path: "/tv/popular" },
  { name: "People", path: "/person/popular" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const bg = useColorModeValue("gray.200", "gray.300");
  const color = useColorModeValue("black", "white");

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Box
      as="nav"
      display="flex"
      flexDir={{ base: "row-reverse", lg: "row" }}
      alignItems="center"
      fontWeight="500"
    >
      <HamburgerMenu toggled={isOpen} toggle={setIsOpen} />
      <chakra.ul
        bg={{ base: bg, lg: "transparent" }}
        color={{ base: "black", lg: color }}
        display={{
          base: isOpen ? "block" : "none",
          lg: "flex",
        }}
        position={{ base: "absolute", lg: "static" }}
        top="5rem"
        left="5%"
        right="5%"
        rounded={{ base: "lg", lg: "none" }}
        py={{ base: "2", lg: "0" }}
        px={{ base: "4", lg: "0" }}
        alignItems={{ lg: "center" }}
        boxShadow={{ base: "xl", lg: "none" }}
        zIndex="2"
      >
        {LINKS.map(({ name, path }) => (
          <chakra.li
            listStyleType="none"
            pl={{ lg: "16" }}
            py={{ base: "3", lg: "0" }}
            key={path}
          >
            <NextLink href={path}>
              <a onClick={closeMenu}>{name}</a>
            </NextLink>
          </chakra.li>
        ))}
      </chakra.ul>
    </Box>
  );
};

export default Navbar;
