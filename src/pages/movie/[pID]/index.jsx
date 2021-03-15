import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";

import { getMovies } from "../../../lib/movies";
import { MediaCards as MoviesCards } from "../../../components/UI/mediaCards";

const PID = () => {
  const router = useRouter();
  const { query } = router;

  const { data } = useQuery(["movies", query.pID], () =>
    getMovies(query.pID, 1)
  );

  return (
    <>
      <MoviesCards data={data} mediaType="movie" />
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { pID: "popular" } },
      { params: { pID: "now_playing" } },
      { params: { pID: "upcoming" } },
      { params: { pID: "top_rated" } },
    ],
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["movies", params.pID], () =>
    getMovies(params.pID, 1)
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 1,
  };
};

export default PID;
