import { fetcher, API_KEY, BASE_URL } from "config";

export const getMovies = async (type: string, page: number) =>
  await fetcher(
    `${BASE_URL}movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`
  );

export const getMovieDetails = async (movieID: number) =>
  await fetcher(
    `${BASE_URL}movie/${movieID}?api_key=${API_KEY}&language=en-US`
  );
