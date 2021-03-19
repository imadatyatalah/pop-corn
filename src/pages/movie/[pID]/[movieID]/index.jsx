import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";

import { MediaDetailsPage as HeroSection } from "../../../../components/detailsPage/heroSection";
import { getMovieDetails } from "../../../../lib/movies";

const Movie = () => {
  const router = useRouter();
  const { query, isFallback } = router;

  const { data } = useQuery(["movieID", query.movieID], () =>
    getMovieDetails(query.movieID)
  );

  if (isFallback) {
    return <div>Please wait a few seconds, It's loading...</div>;
  }

  return (
    <>
      <HeroSection data={data} backBtnPath={`/movie/${query.pID}`} />
    </>
  );
};

export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["movieID", params.movieID], () =>
    getMovieDetails(params.movieID)
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60,
  };
};

export default Movie;
