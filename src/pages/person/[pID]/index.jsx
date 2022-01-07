import { QueryClient, useInfiniteQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import InfiniteScroll from "react-infinite-scroller";

import { PeopleCards } from "@/components/mediaCards";
import { getPeople } from "@/lib/people";
import CardsContainer from "@/components/cardsContainer";
import config from "config";

const getPageTitle = (pID) => {
  if (pID === "popular") {
    return "Popular";
  }
};

const PID = () => {
  const {
    query: { pID },
  } = useRouter();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["people", pID],
    ({ pageParam = 1 }) => getPeople(pID, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { page, total_pages } = lastPage;

        return page < total_pages ? page + 1 : undefined;
      },
    }
  );

  const title = `${getPageTitle(pID)} People`;
  const description = "Get the most Popular People.";
  const url = `${config.canonical}person/${pID}`;

  return (
    <>
      <NextSeo title={title} description={description} canonical={url} />

      <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
        <CardsContainer>
          {data.pages.map((page) => (
            <PeopleCards data={page.results} pID={pID} key={page.page} />
          ))}
        </CardsContainer>
      </InfiniteScroll>
    </>
  );
};

export const getStaticPaths = async () => {
  return { paths: [{ params: { pID: "popular" } }], fallback: false };
};

export const getStaticProps = async ({ params: { pID } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    ["people", pID],
    ({ pageParam = 1 }) => getPeople(pID, pageParam)
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 60,
  };
};

export default PID;
