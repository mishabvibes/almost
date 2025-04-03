import connectToDatabase from "../../lib/db";
import Sponsorship from "../../models/Sponsorship";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  await connectToDatabase();

  const { type, amount, userId } = req.body;

  try {
    const sponsorship = new Sponsorship({
      type,
      amount: parseInt(amount),
      userId,
    });
    await sponsorship.save();
    res.status(201).json({ message: "Sponsorship created", id: sponsorship._id });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Failed to create sponsorship" });
  }
}