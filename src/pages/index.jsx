import { QueryClient, useInfiniteQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { NextSeo } from "next-seo";
import InfiniteScroll from "react-infinite-scroller";

import { MediaCards as MoviesCards } from "@/components/mediaCards";
import config, { fetcher, BASE_URL, API_KEY } from "../../config";

const getMoviesInf = ({ pageParam = 1 }) =>
  fetcher(
    `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${pageParam}`
  );

const Home = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("movies", getMoviesInf, {
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage;

      return page < total_pages ? page + 1 : undefined;
    },
  });

  const title = "Home";
  const description = "Get the latest Movies, Tv shows, and People.";

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={config.canonical}
        openGraph={{ title, description }}
      />

      <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
        {data.pages.map((page) => (
          <MoviesCards
            data={page.results}
            mediaType="movie"
            pID="popular"
            key={page.page}
          />
        ))}
      </InfiniteScroll>

      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery("movies", getMoviesInf);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 1,
  };
};

export default Home;
