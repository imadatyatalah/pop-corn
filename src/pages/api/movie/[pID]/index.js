import { getMovies } from "@/lib/movies";

export default async (req, res) => {
  const { pID } = req.query;

  const movies = await getMovies(pID, 1);

  res.status(200).json(movies);
};
