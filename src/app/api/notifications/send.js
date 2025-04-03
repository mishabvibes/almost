import connectToDatabase from "../../lib/db";
import Notification from "../../models/Notification";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  await connectToDatabase();

  const { message, channel } = req.body;

  try {
    const notification = new Notification({ message, channel });
    await notification.save();
    // Add Twilio/Nodemailer logic here
    res.status(200).json({ message: "Notification sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send notification" });
  }
}