import connectToDatabase from "../../lib/db";
import Sponsorship from "../../models/Sponsorship";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  await connectToDatabase();

  try {
    const sponsorships = await Sponsorship.find({});
    res.status(200).json(sponsorships);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Failed to fetch sponsorships" });
  }
}