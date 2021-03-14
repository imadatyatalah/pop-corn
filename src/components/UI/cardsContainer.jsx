import { Box, Grid } from "@chakra-ui/react";

const CardsContainer = ({ children }) => {
  return (
    <>
      <Box
        as="section"
        d="flex"
        justifyContent="center"
        px={[5, 7.5, 10, 15, 20]}
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
    </>
  );
};

export default CardsContainer;
