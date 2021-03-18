import { Box, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import NextLink from "next/link";

import { IMAGE_BASE_URL, LG_POSTER_SIZE } from "../../../config";
import { StyledNextImage } from "../../styles";
import { PosterFallBack } from "../UI/fallBack";
import Backdrop from "./backdrop";
import InfoCard from "./infoCard";

const DetailsPage = ({ data, backBtnPath }) => {
  const { backdrop_path, poster_path, title, name } = data;

  return (
    <>
      <Backdrop backdropPath={backdrop_path}>
        <NextLink href={backBtnPath}>
          <a>
            <Button
              px="8"
              colorScheme="facebook"
              mt={{ base: "3rem", lg: "2rem" }}
            >
              Back
            </Button>
          </a>
        </NextLink>

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
            aria-label={`${title || name} Profile image`}
          >
            {poster_path ? (
              <StyledNextImage
                src={`${IMAGE_BASE_URL}${LG_POSTER_SIZE}${poster_path}`}
                width="342"
                height="513"
                alt={title || name}
                layout="fixed"
                quality="60"
              />
            ) : (
              <PosterFallBack layout="fixed" />
            )}
          </Box>

          <InfoCard data={data} />
        </Box>
      </Backdrop>
    </>
  );
};

DetailsPage.defaultProps = {
  backBtnPath: "/",
};

DetailsPage.propTypes = {
  data: PropTypes.object.isRequired,
  backBtnPath: PropTypes.string.isRequired,
};

export default DetailsPage;
