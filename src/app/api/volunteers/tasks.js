import connectToDatabase from "../../lib/db";
import Volunteer from "../../models/Volunteer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  await connectToDatabase();

  const { volunteerId, task } = req.body;

  try {
    await Volunteer.findByIdAndUpdate(volunteerId, {
      $push: { tasks: { task, assignedAt: new Date() } },
    });
    res.status(200).json({ message: "Task assigned" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to assign task" });
  }
}