import { Box, chakra } from "@chakra-ui/react";
import Link from "next/link";

import { IMAGE_BASE_URL, LG_POSTER_SIZE, MD_STILL_SIZE } from "config";
import { StyledNextImage } from "@/styles/index";
import { PosterFallBack, ProfileFallBack } from "./fallBack";
import CircularProgressbar from "@/components/circularProgressbar";

export const MediaCards = ({
  data,
  mediaType,
  pID,
}: {
  data: any;
  mediaType: string;
  pID?: string;
}) =>
  data?.map(
    ({ id, poster_path, title, name, vote_average, media_type }: any) => (
      <Box pos="relative" key={id}>
        <Link href={`/${mediaType || media_type}/${pID}/${id}`} passHref>
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
              // @ts-ignore
              <PosterFallBack />
            )}
          </chakra.a>
        </Link>

        <CircularProgressbar
          value={vote_average}
          pos="absolute"
          right="2"
          top="2"
        />
      </Box>
    )
  );

export const PeopleCards = ({ data, pID }: { data: any; pID?: string }) =>
  data?.map(({ id, profile_path, name }: any) => (
    <Box pos="relative" key={id}>
      <Link href={`/person/${pID}/${id}`} passHref>
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
            // @ts-ignore
            <ProfileFallBack />
          )}
        </chakra.a>
      </Link>
    </Box>
  ));
