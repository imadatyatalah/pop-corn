import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";

import { getPeople } from "../../../lib/people";
import { PeopleCards } from "../../../components/UI/mediaCards";

const PID = () => {
  const router = useRouter();
  const { query } = router;

  const { data } = useQuery(["people", query.pID], () =>
    getPeople(query.pID, 1)
  );

  return (
    <>
      <PeopleCards data={data} pID={query.pID} />
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { pID: "popular" } }],
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["people", params.pID], () =>
    getPeople(params.pID, 1)
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 1,
  };
};

export default PID;
