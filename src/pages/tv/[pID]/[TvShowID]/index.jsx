import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";

import { getTvShowDetails } from "../../../../lib/tvShows";
import HeroSection from "../../../../components/detailsPage/heroSection";

const TvShow = () => {
  const router = useRouter();
  const { query, isFallback } = router;

  const { data } = useQuery(["TvShowID", query.TvShowID], () =>
    getTvShowDetails(query.TvShowID)
  );

  if (isFallback) {
    return <div>Please wait a few seconds, It's loading...</div>;
  }

  return (
    <>
      <HeroSection data={data} backBtnPath={`/tv/${query.pID}`} />
    </>
  );
};

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export const getStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["TvShowID", params.TvShowID], () =>
    getTvShowDetails(params.TvShowID)
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60,
  };
};

export default TvShow;
