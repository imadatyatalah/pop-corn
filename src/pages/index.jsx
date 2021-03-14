import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

import { getMovies } from "../lib/movies";
import { MediaCards as MoviesCards } from "../components/UI/mediaCards";

const Home = () => {
  const { data } = useQuery("movies", () => getMovies("popular", 1));

  return (
    <>
      <MoviesCards data={data} mediaType="movie" />
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
