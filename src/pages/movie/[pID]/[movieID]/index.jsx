import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";

import { getMovieDetails } from "../../../../lib/movies";
import HeroSection from "../../../../components/detailsPage/heroSection";

const Movie = () => {
  const router = useRouter();
  const { query } = router;

  const { data } = useQuery(["movieID", query.movieID], () =>
    getMovieDetails(query.movieID)
  );

  return (
    <>
      <HeroSection data={data} backBtnPath={`/movie/${query.pID}`} />
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["movieID", params.movieID], () =>
    getMovieDetails(params.movieID)
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default Movie;
