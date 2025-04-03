// src/app/api/donations/create-order/route.js
import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const { amount, campaignId } = await req.json();

    // Validate amount (required in all cases)
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Optional campaignId validation (only if provided)
    if (campaignId && typeof campaignId !== 'string') {
      return NextResponse.json({ error: "Invalid campaign ID" }, { status: 400 });
    }

    const orderOptions = {
      amount, // Already in paise from frontend
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(orderOptions);

    // Return orderId and campaignId (if provided) in response
    return NextResponse.json(
      {
        orderId: order.id,
        ...(campaignId && { campaignId }), // Include campaignId only if sent
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      {
        error: "Failed to create order",
        details: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}