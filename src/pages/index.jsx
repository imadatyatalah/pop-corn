import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Box } from "@chakra-ui/react";
import NextImage from "next/image";

import { getMovies } from "../lib/movies";
import { IMAGE_BASE_URL, LG_POSTER_SIZE } from "../../config";

const Home = () => {
  const { data } = useQuery("movies", () => getMovies("popular", 1));

  return (
    <>
      {data?.results.map((movie) => (
        <Box d="flex" key={movie.title}>
          <NextImage
            src={`${IMAGE_BASE_URL}${LG_POSTER_SIZE}${movie.poster_path}`}
            width="342"
            height="513"
            alt={movie.title}
          />
        </Box>
      ))}
    </>
  );
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("movies", () => getMovies("popular", 1));

  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 1,
  };
};

export default Home;
