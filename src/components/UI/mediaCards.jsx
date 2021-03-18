import { Box, chakra } from "@chakra-ui/react";
import NextLink from "next/link";
import PropTypes from "prop-types";

import { IMAGE_BASE_URL, LG_POSTER_SIZE } from "../../../config";
import { StyledNextImage } from "../../styles";
import { PosterFallBack } from "./fallBack";
import CardsContainer from "./cardsContainer";
import CircularProgressbar from "../UI/circularProgressbar";

export const MediaCards = ({ data, mediaType, pID }) => {
  return (
    <>
      <CardsContainer>
        {data?.results.map((media) => {
          const { id, poster_path, title, name, vote_average } = media;

          return (
            <Box pos="relative" key={id}>
              <NextLink href={`/${mediaType}/${pID}/${id}`} passHref>
                <chakra.a
                  d="flex"
                  bgColor="gray.500"
                  rounded="md"
                  shadow="lg"
                  transitionDuration="250ms"
                  _hover={{ shadow: "xl" }}
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
          );
        })}
      </CardsContainer>
    </>
  );
};

MediaCards.defaultProps = {
  pID: "popular",
};

MediaCards.propTypes = {
  data: PropTypes.object.isRequired,
  mediaType: PropTypes.string.isRequired,
  pID: PropTypes.string,
};
