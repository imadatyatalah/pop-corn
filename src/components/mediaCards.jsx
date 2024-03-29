import { Box, chakra } from "@chakra-ui/react";
import NextLink from "next/link";
import PropTypes from "prop-types";

import { IMAGE_BASE_URL, LG_POSTER_SIZE, MD_STILL_SIZE } from "config";
import { StyledNextImage } from "@/styles/index";
import { PosterFallBack, ProfileFallBack } from "./fallBack";
import CardsContainer from "@/components/cardsContainer";
import CircularProgressbar from "@/components/circularProgressbar";

export const MediaCards = ({ data, mediaType, pID }) => (
  <CardsContainer>
    {data?.map(({ id, poster_path, title, name, vote_average, media_type }) => (
      <Box pos="relative" key={id}>
        <NextLink href={`/${mediaType || media_type}/${pID}/${id}`} passHref>
          <chakra.a
            d="flex"
            bgColor="gray.500"
            rounded="md"
            shadow="lg"
            transitionDuration="250ms"
            _hover={{ shadow: "xl" }}
            aria-label={title || name}
          >
            {poster_path ? (
              <StyledNextImage
                src={`${IMAGE_BASE_URL}${LG_POSTER_SIZE}${poster_path}`}
                width="342"
                height="513"
                alt={title || name}
                title={title || name}
                quality="60"
              />
            ) : (
              <PosterFallBack />
            )}
          </chakra.a>
        </NextLink>

        <CircularProgressbar
          value={vote_average}
          pos="absolute"
          right="2"
          top="2"
        />
      </Box>
    ))}
  </CardsContainer>
);

export const PeopleCards = ({ data, pID }) => (
  <CardsContainer>
    {data?.results.map(({ id, profile_path, name }) => (
      <Box pos="relative" key={id}>
        <NextLink href={`/person/${pID}/${id}`} passHref>
          <chakra.a
            d="flex"
            bgColor="gray.500"
            rounded="md"
            shadow="lg"
            transitionDuration="250ms"
            _hover={{ shadow: "xl" }}
            aria-label={name}
          >
            {profile_path ? (
              <StyledNextImage
                src={`${IMAGE_BASE_URL}${MD_STILL_SIZE}${profile_path}`}
                width="342"
                height="513"
                alt={name}
                title={name}
                quality="60"
              />
            ) : (
              <ProfileFallBack />
            )}
          </chakra.a>
        </NextLink>
      </Box>
    ))}
  </CardsContainer>
);

MediaCards.defaultProps = {
  pID: "popular",
};

MediaCards.propTypes = {
  data: PropTypes.array.isRequired,
  mediaType: PropTypes.string.isRequired,
  pID: PropTypes.string,
};

PeopleCards.defaultProps = {
  pID: "popular",
};

PeopleCards.propTypes = {
  data: PropTypes.object.isRequired,
  pID: PropTypes.string,
};
