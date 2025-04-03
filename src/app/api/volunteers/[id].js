import connectToDatabase from "../../lib/db";
import Volunteer from "../../models/Volunteer";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  await connectToDatabase();

  const { id } = req.query;

  try {
    const volunteer = await Volunteer.findById(id);
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
    res.status(200).json(volunteer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch volunteer" });
  }
}