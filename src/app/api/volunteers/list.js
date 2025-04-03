import connectToDatabase from "@/lib/db";
import Volunteer from "@/models/Volunteer";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  await connectToDatabase();

  try {
    const volunteers = await Volunteer.find({});
    res.status(200).json(volunteers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch volunteers" });
  }
}