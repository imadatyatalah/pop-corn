import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { MediaDetailsPage as HeroSection } from "@/components/detailsPage/heroSection";
import { getMovieDetails } from "@/lib/movies";
import config, {
  IMAGE_BASE_URL,
  LG_POSTER_SIZE,
  MD_BACKDROP_SIZE,
} from "config";

const Movie = () => {
  const router = useRouter();
  const { query, isFallback } = router;

  const { data } = useQuery(["movieID", query.movieID], () =>
    getMovieDetails(query.movieID)
  );

  if (isFallback) {
    return <div>Loading...</div>;
  }

  const title = data.title;
  const description = data.overview;
  const url = `${config.canonical}movie/${query.pID}/${query.movieID}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          images: [
            {
              url: `${IMAGE_BASE_URL}${LG_POSTER_SIZE}${data.poster_path}`,
              width: "342",
              height: "513",
              alt: `${data.title} poster`,
            },
            {
              url: `${IMAGE_BASE_URL}${MD_BACKDROP_SIZE}${data.backdrop_path}`,
              width: "1280",
              height: "720",
              alt: `${data.title} backdrop`,
            },
          ],
        }}
      />

      <HeroSection data={data} backBtnPath={`/movie/${query.pID}`} />
    </>
  );
};

export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  const movie = await queryClient.fetchQuery(["movieID", params.movieID], () =>
    getMovieDetails(params.movieID)
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
    notFound: movie.success === false,
    revalidate: 60,
  };
};

export default Movie;
