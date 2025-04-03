// src/app/api/campaigns/[id]/update-amount/route.js
import { NextResponse } from "next/server";
import connectToDatabase from "../../../../../lib/db";
import Campaign from "../../../../../models/Campaign"; // Adjust path to your Campaign model

export async function PATCH(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const { amount } = await request.json();

    if (!amount || isNaN(amount)) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Increment the raised field by the donation amount
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      id,
      { $inc: { currentAmount: amount } }, // Increment raised by the donation amount
      { new: true, runValidators: true }
    );

    if (!updatedCampaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    return NextResponse.json(updatedCampaign);
  } catch (error) {
    console.error("Error updating campaign amount:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}