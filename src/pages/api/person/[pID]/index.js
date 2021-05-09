import { getPeople } from "@/lib/people";

export default async (req, res) => {
  const { pID } = req.query;

  const people = await getPeople(pID, 1);

  res.status(200).json(people);
};
