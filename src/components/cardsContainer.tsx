import { Box, Grid } from "@chakra-ui/react";

import { MAX_WIDTH } from "config";

interface Props {
  children: React.ReactNode;
}

const CardsContainer = ({ children }: Props) => (
  <Box
    as="section"
    d="flex"
    justifyContent="center"
    px={[4, 8, 12, 16, 20]}
    maxW={MAX_WIDTH}
    mx="auto"
    py="8"
  >
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
        xl: "repeat(5, 1fr)",
        "2xl": "repeat(6, 1fr)",
      }}
      gap={4}
    >
      {children}
    </Grid>
  </Box>
);

export default CardsContainer;
