import { Box, Flex, Heading, List, ListItem } from "@chakra-ui/react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { convertMinutesToHours } from "../helpers/convertMinutesToHours";
import { TagLine, Title, InfoCardStyles } from "../../styles";
import CircularProgressbar from "../UI/circularProgressbar";

const InfoCard = ({ data }) => {
  const {
    title,
    name,
    genres,
    release_date,
    first_air_date,
    tagline,
    overview,
    spoken_languages,
    runtime,
    vote_average,
  } = data;

  return (
    <>
      <Box
        w="full"
        color="black"
        rounded="xl"
        py="0.5rem"
        px="1rem"
        mt={{ base: "1rem", lg: "0" }}
        ml={{ lg: "1.25rem" }}
        css={InfoCardStyles}
      >
        <Flex justify="space-between">
          <Box>
            <Heading as="h1" fontWeight="600">
              {title || name}
            </Heading>

            <List py="1">
              <ListItem>
                {genres?.map((genre) => genre.name).join(", ")}
              </ListItem>

              <ListItem>
                {dayjs(release_date || first_air_date).format("MMMM DD, YYYY")}
              </ListItem>
            </List>

            <TagLine>{tagline}</TagLine>
          </Box>

          <CircularProgressbar value={vote_average} />
        </Flex>

        <List py="1">
          <ListItem py="px">
            <Title>Overview: </Title>
            {overview}
          </ListItem>

          <ListItem py="px">
            <Title>Spoken language: </Title>
            {spoken_languages?.map((lang) => lang.english_name).join(", ")}
          </ListItem>

          {runtime && (
            <ListItem py="px">
              <Title>Runtime: </Title>
              {convertMinutesToHours(runtime)}
            </ListItem>
          )}
        </List>
      </Box>
    </>
  );
};

InfoCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default InfoCard;
