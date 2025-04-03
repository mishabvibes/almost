import connectToDatabase from "../../lib/db";
import Volunteer from "../../models/Volunteer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  await connectToDatabase();

  const { name, email } = req.body;

  try {
    const volunteer = new Volunteer({ name, email });
    await volunteer.save();
    res.status(201).json({ message: "Volunteer registered", id: volunteer._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to register volunteer" });
  }
}