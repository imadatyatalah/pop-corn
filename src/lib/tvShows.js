import { fetcher, API_KEY, BASE_URL } from "config";

export const getTvShows = async (type, page) =>
  await fetcher(
    `${BASE_URL}tv/${type}?api_key=${API_KEY}&language=en-US&page=${page}`
  );

export const getTvShowDetails = async (tvShowID) =>
  await fetcher(`${BASE_URL}tv/${tvShowID}?api_key=${API_KEY}&language=en-US`);
