import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { getMovies } from "../../../lib/movies";
import { MediaCards as MoviesCards } from "../../../components/UI/mediaCards";
import config from "../../../../config";

const getPageTitle = (pID) => {
  if (pID === "popular") {
    return "Popular";
  } else if (pID === "now_playing") {
    return "Now Playing";
  } else if (pID === "upcoming") {
    return "Upcoming";
  } else if (pID === "top_rated") {
    return "Top Rated";
  }
};

const PID = () => {
  const router = useRouter();
  const { query } = router;

  const { data } = useQuery(["movies", query.pID], () =>
    getMovies(query.pID, 1)
  );

  const title = `${getPageTitle(query.pID)} Movies - ${config.title}`;
  const description =
    "Get the most Popular Movies, Now Playing Movies, Upcoming Movies and also Top Rated Movies!";
  const url = `${config.canonical}movie/${query.pID}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{ title, description, url }}
      />

      <MoviesCards data={data} mediaType="movie" pID={query.pID} />
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
