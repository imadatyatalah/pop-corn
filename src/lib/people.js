import { fetcher, API_KEY, BASE_URL } from "config";

export const getPeople = async (type, page) =>
  await fetcher(
    `${BASE_URL}person/${type}?api_key=${API_KEY}&language=en-US&page=${page}`
  );

export const getPersonDetails = async (personID) =>
  await fetcher(
    `${BASE_URL}person/${personID}?api_key=${API_KEY}&language=en-US`
  );

export const getCombinedCredits = async (personID) =>
  await fetcher(
    `${BASE_URL}person/${personID}/combined_credits?api_key=${API_KEY}&language=en-US`
  );
