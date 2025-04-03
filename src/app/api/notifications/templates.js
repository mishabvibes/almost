import connectToDatabase from "../../lib/db";
import NotificationTemplate from "../../models/NotificationTemplate";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "POST") {
    const { template } = req.body;
    try {
      const newTemplate = new NotificationTemplate({ template });
      await newTemplate.save();
      res.status(201).json({ message: "Template saved", id: newTemplate._id });
    } catch (error) {
      console.log(error);
    
      res.status(500).json({ error: "Failed to save template" });
    }
  } else if (req.method === "GET") {
    try {
      const templates = await NotificationTemplate.find({});
      res.status(200).json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch templates" });
      console.log(error);
      
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}