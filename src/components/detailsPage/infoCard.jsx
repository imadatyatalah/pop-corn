import { Box, Flex, Heading, List, ListItem } from "@chakra-ui/react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { convertMinutesToHours } from "../helpers/convertMinutesToHours";
import { calculateAge } from "../helpers/calculateAge";
import { TagLine, Title, InfoCardStyles } from "@/styles/index";
import CircularProgressbar from "../UI/circularProgressbar";

const Container = ({ children }) => (
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
      {children}
    </Box>
  </>
);

export const MediaInfoCard = ({ data }) => {
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
      <Container>
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

            {tagline && <TagLine>{tagline}</TagLine>}
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
      </Container>
    </>
  );
};

export const PersonInfoCard = ({ data }) => {
  const {
    name,
    birthday,
    deathday,
    biography,
    place_of_birth,
    known_for_department,
  } = data;

  return (
    <>
      <Container>
        <Flex justify="space-between">
          <Box>
            <Heading as="h1" fontWeight="600">
              {name}
            </Heading>

            <List py="1">
              <ListItem>
                <Title>Birthday: </Title>
                {dayjs(birthday).format("MMMM DD, YYYY")},{" "}
                {`${calculateAge(birthday)} years old`}
              </ListItem>

              <ListItem>
                <Title>Place of Birth: </Title>
                {place_of_birth}
              </ListItem>

              {deathday && (
                <ListItem>
                  <Title>Deathday: </Title>
                  {deathday}
                </ListItem>
              )}

              <ListItem>
                <Title>Known For: </Title>
                {known_for_department}
              </ListItem>
            </List>
          </Box>
        </Flex>

        <List py="1">
          <ListItem py="px">
            <Title>Biography: </Title>
            {biography}
          </ListItem>
        </List>
      </Container>
    </>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

MediaInfoCard.propTypes = {
  data: PropTypes.object.isRequired,
};

PersonInfoCard.propTypes = {
  data: PropTypes.object.isRequired,
};
