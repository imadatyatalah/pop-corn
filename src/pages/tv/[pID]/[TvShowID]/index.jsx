import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { MediaDetailsPage as HeroSection } from "@/components/detailsPage/heroSection";
import { getTvShowDetails } from "@/lib/tvShows";
import config, {
  IMAGE_BASE_URL,
  LG_POSTER_SIZE,
  MD_BACKDROP_SIZE,
} from "config";

const TvShow = () => {
  const router = useRouter();
  const { query, isFallback } = router;

  const { data } = useQuery(["TvShowID", query.TvShowID], () =>
    getTvShowDetails(query.TvShowID)
  );

  if (isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NextSeo
        title={data.name}
        description={data.overview}
        canonical={`${config.canonical}tv/${query.pID}/${query.TvShowID}`}
        openGraph={{
          images: [
            {
              url: `${IMAGE_BASE_URL}${LG_POSTER_SIZE}${data.poster_path}`,
              width: "342",
              height: "513",
              alt: `${data.name} poster`,
            },
            {
              url: `${IMAGE_BASE_URL}${MD_BACKDROP_SIZE}${data.backdrop_path}`,
              width: "1280",
              height: "720",
              alt: `${data.name} backdrop`,
            },
          ],
        }}
      />

      <HeroSection data={data} backBtnPath={`/tv/${query.pID}`} />
    </>
  );
};

export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  const tvShow = await queryClient.fetchQuery(
    ["TvShowID", params.TvShowID],
    () => getTvShowDetails(params.TvShowID)
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
    notFound: tvShow.success === false,
    revalidate: 60,
  };
};

export default TvShow;
