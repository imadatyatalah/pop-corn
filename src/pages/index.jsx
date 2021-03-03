import { Box } from "@chakra-ui/react";
import { getPopularMovies } from "../lib/movies";
import NextImage from "next/image";

import { IMAGE_BASE_URL, LG_POSTER_SIZE } from "../../config";

const Home = ({ data }) => {
  return (
    <>
      {data.results.map((movie) => (
        <Box key={movie.title}>
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
  return {
    props: { data: await getPopularMovies(1) },
    revalidate: 1,
  };
};

export default Home;
