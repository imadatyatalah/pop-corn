import { Box, Button, chakra } from "@chakra-ui/react";
import PropTypes from "prop-types";
import NextLink from "next/link";

import { IMAGE_BASE_URL, LG_POSTER_SIZE } from "../../../config";
import { StyledNextImage } from "../../styles";
import Backdrop from "./backdrop";
import InfoCard from "./infoCard";

const DetailsPage = ({ data, backBtnPath }) => {
  return (
    <>
      <Backdrop backdropPath={data.backdrop_path}>
        <Button colorScheme="facebook" mt="4">
          <NextLink href={backBtnPath || "/"} passHref>
            <chakra.a px="4">Back</chakra.a>
          </NextLink>
        </Button>

        <Box
          d="flex"
          justifyContent={{ base: "center", lg: "flex-start" }}
          flexDir={{ base: "column", lg: "row" }}
          py={{ base: "3rem", lg: "2rem" }}
        >
          <Box
            d="flex"
            rounded="md"
            alignSelf="center"
            shadow="2xl"
            bgColor="gray.500"
          >
            <StyledNextImage
              src={`${IMAGE_BASE_URL}${LG_POSTER_SIZE}${data.poster_path}`}
              width="342"
              height="513"
              alt={data.title}
              layout="fixed"
              quality="60"
            />
          </Box>
          <InfoCard data={data} />
        </Box>
      </Backdrop>
    </>
  );
};

DetailsPage.propTypes = {
  data: PropTypes.object.isRequired,
  backBtnPath: PropTypes.string.isRequired,
};

export default DetailsPage;
