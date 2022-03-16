export default {
  title: "Pop Corn",
  canonical: "https://pop-corn.vercel.app/",
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const BASE_URL = "https://api.themoviedb.org/3/";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export const MAX_WIDTH = "1440px";

export const XS_POSTER_SIZE = "w92";
export const SM_POSTER_SIZE = "w154";
export const MD_POSTER_SIZE = "w185";
export const LG_POSTER_SIZE = "w342";
export const XL_POSTER_SIZE = "w500";
export const XL2_POSTER_SIZE = "w780";
export const ORIGINAL_POSTER_SIZE = "original";

export const XS_PROFILE_SIZE = "w45";
export const SM_PROFILE_SIZE = "w185";
export const MD_PROFILE_SIZE = "h632";
export const ORIGINAL_PROFILE_SIZE = "original";

export const XS_STILL_SIZE = "w92";
export const SM_STILL_SIZE = "w185";
export const MD_STILL_SIZE = "w300";
export const ORIGINAL_STILL_SIZE = "original";

export const XS_BACKDROP_SIZE = "w300";
export const SM_BACKDROP_SIZE = "w780";
export const MD_BACKDROP_SIZE = "w1280";
export const ORIGINAL_BACKDROP_SIZE = "original";
