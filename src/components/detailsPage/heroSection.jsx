import { Box, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import NextLink from "next/link";

import { IMAGE_BASE_URL, LG_POSTER_SIZE, MD_STILL_SIZE } from "../../../config";
import { StyledNextImage } from "@/styles/index";
import { PosterFallBack, ProfileFallBack } from "../UI/fallBack";
import { MediaInfoCard, PersonInfoCard } from "./infoCard";
import Backdrop from "./backdrop";

export const MediaDetailsPage = ({ data, backBtnPath }) => {
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
          justifyContent="center"
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

          <MediaInfoCard data={data} />
        </Box>
      </Backdrop>
    </>
  );
};

export const PersonDetailsPage = ({ data, backdropPath, backBtnPath }) => {
  const { profile_path, name } = data;

  return (
    <>
      <Backdrop backdropPath={backdropPath}>
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
          justifyContent="center"
          flexDir={{ base: "column", lg: "row" }}
          py={{ base: "3rem", lg: "2rem" }}
        >
          <Box
            d="flex"
            rounded="md"
            alignSelf="center"
            shadow="2xl"
            bgColor="gray.500"
            aria-label={`${name} Profile image`}
          >
            {profile_path ? (
              <StyledNextImage
                src={`${IMAGE_BASE_URL}${MD_STILL_SIZE}${profile_path}`}
                width="342"
                height="513"
                alt={name}
                layout="fixed"
                quality="60"
              />
            ) : (
              <ProfileFallBack layout="fixed" />
            )}
          </Box>

          <PersonInfoCard data={data} />
        </Box>
      </Backdrop>
    </>
  );
};

MediaDetailsPage.defaultProps = {
  backBtnPath: "/",
};

MediaDetailsPage.propTypes = {
  data: PropTypes.object.isRequired,
  backBtnPath: PropTypes.string.isRequired,
};

PersonDetailsPage.defaultProps = {
  backBtnPath: "/",
};

PersonDetailsPage.propTypes = {
  data: PropTypes.object.isRequired,
  backBtnPath: PropTypes.string.isRequired,
  backdropPath: PropTypes.string,
};
