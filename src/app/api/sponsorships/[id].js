import connectToDatabase from "../../lib/db";
import Sponsorship from "../../models/Sponsorship";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  await connectToDatabase();

  const { id } = req.query;

  try {
    const sponsorship = await Sponsorship.findById(id);
    if (!sponsorship) return res.status(404).json({ message: "Sponsorship not found" });
    res.status(200).json(sponsorship);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Failed to fetch sponsorship" });
  }
}