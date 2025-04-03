import connectToDatabase from "../../lib/db";
import Notification from "../../models/Notification";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  await connectToDatabase();

  try {
    const notifications = await Notification.find({});
    res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Failed to fetch status" });
  }
}