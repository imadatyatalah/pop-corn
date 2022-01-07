import { QueryClient, useInfiniteQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import InfiniteScroll from "react-infinite-scroller";

import { MediaCards as TvShowsCards } from "@/components/mediaCards";
import { getTvShows } from "@/lib/tvShows";
import CardsContainer from "@/components/cardsContainer";
import config from "config";

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
  const {
    query: { pID },
  } = useRouter();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["TvShows", pID],
    ({ pageParam = 1 }) => getTvShows(pID, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { page, total_pages } = lastPage;

        return page < total_pages ? page + 1 : undefined;
      },
    }
  );

  const title = `${getPageTitle(pID)} Tv Shows`;
  const description =
    "Get the most Popular Tv Shows, Airing Today Tv Shows, On The Air Tv Shows and also Top Rated Tv Shows!";
  const url = `${config.canonical}tv/${pID}`;

  return (
    <>
      <NextSeo title={title} description={description} canonical={url} />

      <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
        <CardsContainer>
          {data.pages.map((page) => (
            <TvShowsCards
              data={page.results}
              mediaType="tv"
              pID={pID}
              key={page.page}
            />
          ))}
        </CardsContainer>
      </InfiniteScroll>
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

export const getStaticProps = async ({ params: { pID } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    ["TvShows", pID],
    ({ pageParam = 1 }) => getTvShows(pID, pageParam)
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 60,
  };
};

export default PID;
