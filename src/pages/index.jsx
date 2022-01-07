import { QueryClient, useInfiniteQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { NextSeo } from "next-seo";
import InfiniteScroll from "react-infinite-scroller";

import { MediaCards as MoviesCards } from "@/components/mediaCards";
import { getMovies } from "@/lib/movies";
import CardsContainer from "@/components/cardsContainer";
import config from "config";

const type = "popular";

const Home = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["movies", type],
    ({ pageParam = 1 }) => getMovies(type, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { page, total_pages } = lastPage;

        return page < total_pages ? page + 1 : undefined;
      },
    }
  );

  const title = "Home";
  const description = "Get the latest Movies, Tv shows, and People.";

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={config.canonical}
      />

      <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
        <CardsContainer>
          {data.pages.map((page) => (
            <MoviesCards
              data={page.results}
              mediaType="movie"
              pID="popular"
              key={page.page}
            />
          ))}
        </CardsContainer>
      </InfiniteScroll>
    </>
  );
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    ["movies", type],
    ({ pageParam = 1 }) => getMovies(type, pageParam)
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 60,
  };
};

export default Home;
