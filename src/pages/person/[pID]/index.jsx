import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { getPeople } from "@/lib/people";
import { PeopleCards } from "@/components/UI/mediaCards";
import config from "config";

const getPageTitle = (pID) => {
  if (pID === "popular") {
    return "Popular";
  }
};

const PID = () => {
  const router = useRouter();
  const { query } = router;

  const { data } = useQuery(["people", query.pID], () =>
    getPeople(query.pID, 1)
  );

  const title = `${getPageTitle(query.pID)} People - ${config.title}`;
  const description = "Get the most Popular People.";
  const url = `${config.canonical}person/${query.pID}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{ title, description, url }}
      />

      <PeopleCards data={data} pID={query.pID} />
    </>
  );
};

export const getStaticPaths = async () => {
  return { paths: [{ params: { pID: "popular" } }], fallback: false };
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
