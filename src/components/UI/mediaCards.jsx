import { Box, chakra } from "@chakra-ui/react";
import NextLink from "next/link";
import PropTypes from "prop-types";

import { IMAGE_BASE_URL, LG_POSTER_SIZE } from "../../../config";
import { StyledNextImage } from "../../styles";
import CardsContainer from "./cardsContainer";

export const MediaCards = ({ data, mediaType }) => {
  return (
    <>
      <CardsContainer>
        {data.results.map((media) => (
          <Box key={media.id}>
            <NextLink href={`/${mediaType}/popular/${media.id}`} passHref>
              <chakra.a d="flex" rounded="md" bgColor="gray.500">
                <StyledNextImage
                  src={`${IMAGE_BASE_URL}${LG_POSTER_SIZE}${media.poster_path}`}
                  width="342"
                  height="513"
                  alt={media.title}
                />
              </chakra.a>
            </NextLink>
          </Box>
        ))}
      </CardsContainer>
    </>
  );
};

MediaCards.propTypes = {
  data: PropTypes.object.isRequired,
  mediaType: PropTypes.string.isRequired,
};
