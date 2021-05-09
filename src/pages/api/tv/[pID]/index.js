import { getTvShows } from "@/lib/tvShows";

export default async (req, res) => {
  const { pID } = req.query;

  const tvShows = await getTvShows(pID, 1);

  res.status(200).json(tvShows);
};
