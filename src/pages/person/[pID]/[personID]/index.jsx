import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { PersonDetailsPage as HeroSection } from "../../../../components/detailsPage/heroSection";
import { getCombinedCredits, getPersonDetails } from "../../../../lib/people";
import config, { IMAGE_BASE_URL, MD_STILL_SIZE } from "../../../../../config";

const Person = () => {
  const router = useRouter();
  const { query, isFallback } = router;

  const { data } = useQuery(["personID", query.personID], () =>
    getPersonDetails(query.personID)
  );
  const { data: combinedCredits } = useQuery(
    ["personID", "combinedCredits", query.personID],
    () => getCombinedCredits(query.personID)
  );

  if (isFallback) {
    return <div>Please wait a few seconds, It's loading...</div>;
  }

  const title = `${data.name} - ${config.title}`;
  const description = data.biography;
  const url = `${config.canonical}person/${query.pID}/${query.personID}`;

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          title,
          description,
          url,
          profile: {
            firstName: data.name,
            gender: data.gender == 1 ? "female" : "male",
          },
          images: [
            {
              url: `${IMAGE_BASE_URL}${MD_STILL_SIZE}${data.profile_path}`,
              width: "342",
              height: "513",
              alt: `${data.title} profile image`,
            },
          ],
        }}
      />

      <HeroSection
        data={data}
        backBtnPath={`/person/${query.pID}`}
        backdropPath={
          combinedCredits.cast.sort((a, b) => b.popularity - a.popularity)[0]
            .backdrop_path
        }
      />
    </>
  );
};

export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["personID", params.personID], () =>
    getPersonDetails(params.personID)
  );
  await queryClient.prefetchQuery(
    ["personID", "combinedCredits", params.personID],
    () => getCombinedCredits(params.personID)
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60,
  };
};

export default Person;
