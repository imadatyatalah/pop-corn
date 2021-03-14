import { Box, Heading, List, ListItem } from "@chakra-ui/react";
import dayjs from "dayjs";

import { convertMinutesToHours } from "../helpers/convertMinutesToHours";
import { TagLine, Title, InfoCardStyles } from "../../styles";

const InfoCard = ({ data }) => {
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
        <Heading as="h1" fontWeight="600">
          {data.title}
        </Heading>

        <List py="1">
          <ListItem>
            {data.genres?.map((genre) => genre.name).join(", ")}
          </ListItem>

          <ListItem>
            {dayjs(data.release_date).format("MMMM DD, YYYY")}
          </ListItem>
        </List>

        <TagLine>{data.tagline}</TagLine>

        <List py="1">
          <ListItem py="px">
            <Title>Overview: </Title>
            {data.overview}
          </ListItem>

          <ListItem py="px">
            <Title>Spoken language: </Title>
            {data.spoken_languages?.map((lang) => lang.english_name).join(", ")}
          </ListItem>

          <ListItem py="px">
            <Title>Runtime: </Title>
            {convertMinutesToHours(data.runtime)}
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default InfoCard;
