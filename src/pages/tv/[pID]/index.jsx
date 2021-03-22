import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { getTvShows } from "@/lib/tvShows";
import { MediaCards as TvShowsCards } from "@/components/UI/mediaCards";
import config from "../../../../config";

const getPageTitle = (pID) => {
  if (pID === "popular") {
    return "Popular";
  } else if (pID === "airing_today") {
    return "Airing Today";
  } else if (pID === "on_the_air") {
    return "On The Air";
  } else if (pID === "top_rated") {
    return "Top Rated";
  }
};

const PID = () => {
  const router = useRouter();
  const { query } = router;

  const { data } = useQuery(["TvShows", query.pID], () =>
    getTvShows(query.pID, 1)
  );

  const title = `${getPageTitle(query.pID)} Tv Shows - ${config.title}`;
  const description =
    "Get the most Popular Tv Shows, Airing Today Tv Shows, On The Air Tv Shows and also Top Rated Tv Shows!";
  const url = `${config.canonical}tv/${query.pID}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{ title, description, url }}
      />

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
