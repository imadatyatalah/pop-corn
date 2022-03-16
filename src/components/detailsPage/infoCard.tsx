import React from "react";

import { Box, Flex, Heading, List, ListItem } from "@chakra-ui/react";
import dayjs from "dayjs";

import { convertMinutesToHours } from "@/lib/convertMinutesToHours";
import { calculateAge } from "@/lib/calculateAge";
import { TagLine, Title, InfoCardStyles } from "@/styles/index";
import CircularProgressbar from "@/components/circularProgressbar";

const Container = ({ children }: { children: React.ReactNode }) => (
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
);

export const MediaInfoCard = ({ data }: { data: any }) => {
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
    <Container>
      <Flex justify="space-between">
        <Box>
          <Heading as="h1" fontWeight="600">
            {title || name}
          </Heading>

          <List py="1">
            <ListItem>
              {genres?.map(({ name }: any) => name).join(", ")}
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
        {overview && (
          <ListItem py="px">
            <Title>Overview: </Title>
            {overview}
          </ListItem>
        )}

        <ListItem py="px">
          <Title>Spoken language: </Title>
          {spoken_languages
            ?.map(({ english_name }: any) => english_name)
            .join(", ")}
        </ListItem>

        {runtime && (
          <ListItem py="px">
            <Title>Runtime: </Title>
            {convertMinutesToHours(runtime)}
          </ListItem>
        )}
      </List>
    </Container>
  );
};

export const PersonInfoCard = ({ data }: { data: any }) => {
  const {
    name,
    birthday,
    deathday,
    biography,
    place_of_birth,
    known_for_department,
  } = data;

  return (
    <Container>
      <Flex justify="space-between">
        <Box>
          <Heading as="h1" fontWeight="600">
            {name}
          </Heading>

          <List py="1">
            {birthday && (
              <ListItem>
                <Title>Birthday: </Title>
                {dayjs(birthday).format("MMMM DD, YYYY")},{" "}
                {`${calculateAge(birthday)} years old`}
              </ListItem>
            )}

            {place_of_birth && (
              <ListItem>
                <Title>Place of Birth: </Title>
                {place_of_birth}
              </ListItem>
            )}

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
  );
};
