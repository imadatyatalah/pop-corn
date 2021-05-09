import { getPersonDetails, getCombinedCredits } from "@/lib/people";

export default async (req, res) => {
  const { personID } = req.query;

  const person = await getPersonDetails(personID);
  const combinedCredits = await getCombinedCredits(personID);

  res.status(200).json({ person, combinedCredits });
};
