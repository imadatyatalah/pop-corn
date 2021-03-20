import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRouter } from "next/router";

import { PersonDetailsPage as HeroSection } from "../../../../components/detailsPage/heroSection";
import { getCombinedCredits, getPersonDetails } from "../../../../lib/people";

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

  return (
    <>
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
