import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";

import { getTvShowDetails } from "../../../../lib/tvShows";
import HeroSection from "../../../../components/detailsPage/heroSection";

const TvShow = () => {
  const router = useRouter();
  const { query } = router;

  const { data } = useQuery(["TvShowID", query.TvShowID], () =>
    getTvShowDetails(query.TvShowID)
  );

  return (
    <>
      <HeroSection data={data} backBtnPath={`/tv/${query.pID}`} />
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["TvShowID", params.TvShowID], () =>
    getTvShowDetails(params.TvShowID)
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default TvShow;
