import { QueryClient, useInfiniteQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import InfiniteScroll from "react-infinite-scroller";

import { MediaCards as MoviesCards } from "@/components/mediaCards";
import { getMovies } from "@/lib/movies";
import CardsContainer from "@/components/cardsContainer";
import config from "config";

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
  const {
    query: { pID },
  } = useRouter();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["movies", pID],
    ({ pageParam = 1 }) => getMovies(pID, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { page, total_pages } = lastPage;

        return page < total_pages ? page + 1 : undefined;
      },
    }
  );

  return (
    <>
      <NextSeo
        title={`${getPageTitle(pID)} Movies`}
        description="Get the most Popular Movies, Now Playing Movies, Upcoming Movies and also Top Rated Movies!"
        canonical={`${config.canonical}movie/${pID}`}
      />

      <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
        <CardsContainer>
          {data.pages.map((page) => (
            <MoviesCards
              data={page.results}
              mediaType="movie"
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
      { params: { pID: "now_playing" } },
      { params: { pID: "upcoming" } },
      { params: { pID: "top_rated" } },
    ],
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { pID } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    ["movies", pID],
    ({ pageParam = 1 }) => getMovies(pID, pageParam)
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 60,
  };
};

export default PID;
