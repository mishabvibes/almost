import connectToDatabase from "../../../../lib/db";
import Donation from "../../../../models/Donation";
import { NextResponse } from "next/server";
// import Razorpay from "razorpay";
import crypto from "crypto";

// const razorpay = new Razorpay({
//   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Note: Should use NEXT_PUBLIC_ prefix for client-side, but keep server-side secret safe
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    console.log("Request body:", body);

    const {
      amount,
      type,// Default to "guest" if not provided
      name,
      phone,
      district,
      panchayat,
      boxId,
      email,
      campaignId,
      instituteId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = body;

    // Validate required fields
    if (!amount || !type || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify Razorpay payment signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      console.log("Signature mismatch:", { generatedSignature, razorpaySignature });
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    // Create donation record
    const donation = new Donation({
      amount: parseFloat(amount), // Ensure amount is a number
      type,
      email,
      boxId: boxId || null,
      name: name || null,
      phone: phone?.startsWith('+') ? phone : "+91" + phone || null,
      district: district || null,
      panchayat: panchayat || null,
      campaignId: campaignId || null,
      instituteId: instituteId || null,
      razorpayPaymentId,
      razorpayOrderId,
      status: "Completed",
    });
    console.log(donation);
    

    await donation.save();
    console.log("Donation saved:", donation._id);

    return NextResponse.json(
      { message: "Donation created", id: donation._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating donation:", error);
    return NextResponse.json(
      { error: "Failed to create donation", details: error.message },
      { status: 500 }
    );
  }
}