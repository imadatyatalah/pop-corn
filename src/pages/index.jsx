import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Box } from "@chakra-ui/react";

import { getMovies } from "../lib/movies";
import { IMAGE_BASE_URL, LG_POSTER_SIZE } from "../../config";
import { StyledNextImage } from "../styles/card";
import CardsContainer from "../components/UI/cardsContainer";

const Home = () => {
  const { data } = useQuery("movies", () => getMovies("popular", 1));

  return (
    <>
      <CardsContainer>
        {data?.results.map((movie) => (
          <Box d="flex" rounded="md" key={movie.title}>
            <StyledNextImage
              src={`${IMAGE_BASE_URL}${LG_POSTER_SIZE}${movie.poster_path}`}
              width="256"
              height="384"
              alt={movie.title}
            />
          </Box>
        ))}
      </CardsContainer>
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
