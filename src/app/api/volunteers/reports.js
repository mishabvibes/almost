import connectToDatabase from "../../lib/db";
import VolunteerReport from "../../models/VolunteerReport";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "POST") {
    const { volunteerId, report } = req.body;
    try {
      const newReport = new VolunteerReport({ volunteerId, report });
      await newReport.save();
      res.status(201).json({ message: "Report submitted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to submit report" });
    }
  } else if (req.method === "GET") {
    try {
      const reports = await VolunteerReport.find({});
      res.status(200).json(reports);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch reports" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}