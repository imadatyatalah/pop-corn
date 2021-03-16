import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";

import { getTvShows } from "../../../lib/tvShows";
import { MediaCards as TvShowsCards } from "../../../components/UI/mediaCards";

const PID = () => {
  const router = useRouter();
  const { query } = router;

  const { data } = useQuery(["TvShows", query.pID], () =>
    getTvShows(query.pID, 1)
  );

  return (
    <>
      <TvShowsCards data={data} mediaType="tv" pID={query.pID} />
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { pID: "popular" } },
      { params: { pID: "airing_today" } },
      { params: { pID: "on_the_air" } },
      { params: { pID: "top_rated" } },
    ],
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["TvShows", params.pID], () =>
    getTvShows(params.pID, 1)
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 1,
  };
};

export default PID;
