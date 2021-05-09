import { getMovieDetails } from "@/lib/movies";

export default async (req, res) => {
  const { movieID } = req.query;

  const movie = await getMovieDetails(movieID);

  res.status(200).json(movie);
};
