import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Donation from "@/models/Donation";
import Donor from "@/models/Donor";      // Add Donor model
import Volunteer from "@/models/Volunteer"; // Add Volunteer model
import Campaign from "@/models/Campaign";   // Add Campaign model

export async function GET() {
  try {
    await dbConnect();

    // Fetch all completed donations
    const donations = await Donation.find({ status: "Completed" });
    
    // Fetch additional counts
    const donorCount = await Donor.countDocuments();
    const volunteerCount = await Volunteer.countDocuments();
    const activeCampaignsCount = await Campaign.countDocuments({ status: "active" });

    // Get today's, this week's, and this month's date ranges
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Compute totals
    let totalAmount = 0;
    let thisMonthAmount = 0;
    let todayAmount = 0;
    let weekAmount = 0;

    let generalTotal = 0;
    let yatheemTotal = 0;
    let hafizTotal = 0;
    let buildingTotal = 0;

    donations.forEach((donation) => {
      const donationDate = new Date(donation.createdAt);
      const amount = parseInt(donation.amount, 10);

      totalAmount += amount;

      if (donationDate >= startOfMonth) {
        thisMonthAmount += amount;
      }

      if (donationDate >= startOfWeek) {
        weekAmount += amount;
      }

      if (donationDate.toDateString() === today.toDateString()) {
        todayAmount += amount;
      }

      switch (donation.type) {
        case "General":
          generalTotal += amount;
          break;
        case "Yatheem":
          yatheemTotal += amount;
          break;
        case "Hafiz":
          hafizTotal += amount;
          break;
        case "Building":
          buildingTotal += amount;
          break;
      }
    });

    // Return response with all computed values
    return NextResponse.json({
      totalDonations: totalAmount,
      thisMonthDonations: thisMonthAmount,
      todayDonations: todayAmount,
      weekDonations: weekAmount,
      generalTotal,
      yatheemTotal,
      hafizTotal,
      buildingTotal,
      subscribersDonorCount: donorCount,      // Count of donors assigned to subscribers
      totalVolunteers: volunteerCount,        // Total count of volunteers
      activeCampaigns: activeCampaignsCount   // Count of active campaigns
    });
    
    
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}