import { getTvShowDetails } from "@/lib/tvShows";

export default async (req, res) => {
  const { tvID } = req.query;

  const tvShow = await getTvShowDetails(tvID);

  res.status(200).json(tvShow);
};
