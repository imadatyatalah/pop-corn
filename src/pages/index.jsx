import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { NextSeo } from "next-seo";

import { MediaCards as MoviesCards } from "@/components/UI/mediaCards";
import { getMovies } from "@/lib/movies";
import config from "../../config";

const Home = () => {
  const { data } = useQuery("movies", () => getMovies("popular", 1));

  const title = `Home - ${config.title}`;
  const description = "Get the latest Movies, Tv shows, and People.";

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={config.canonical}
        openGraph={{ title, description }}
      />

      <MoviesCards data={data.results} mediaType="movie" pID="popular" />
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
