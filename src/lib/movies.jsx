import { fetcher, API_KEY, BASE_URL } from "../../config";

export const getPopularMovies = async (page) => {
  return await fetcher(
    `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );
};
