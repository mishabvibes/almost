import connectToDatabase from "../../../../lib/db";
import Donation from "../../../../models/Donation";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    console.log("Request body:", body);

    const {
      amount,
      type = "guest", // Default to "guest" if not provided
      name,
      phone,
      district,
      panchayat,
      boxId,
      email,
      campaignId,
      instituteId,
      razorpayPaymentId,
      razorpayOrderId, // Optional, can be order_ or plink_
      razorpaySignature,
    } = body;

    // Validate required fields
    if (!amount || !type || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify Razorpay payment signature
    let generatedSignature;

    if (razorpayOrderId?.startsWith("order_")) {
      // Standard Order Verification
      generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex");
    } else if (razorpayOrderId?.startsWith("plink_")) {
      // Payment Link Verification
      generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex"); 
    } else if (!razorpayOrderId) {
      // If no orderId is provided, assume payment link or direct payment and verify with paymentId only
      // Note: Razorpay typically requires an orderId or linkId for signature, so this is a fallback
      generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(razorpayPaymentId) // Simplified, adjust based on Razorpay docs if needed
        .digest("hex");
    } else {
      return NextResponse.json(
        { error: "Invalid Razorpay ID format" },
        { status: 400 }
      );
    }

    // Check if signature matches
    if (generatedSignature !== razorpaySignature) {
      console.log("Signature mismatch:", { generatedSignature, razorpaySignature });
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    // Create donation record
    const donation = new Donation({
      amount: parseFloat(amount), // Ensure amount is a number
      type,
      email: email || null,
      boxId: boxId || null,
      name: name || null,
      phone: phone?.startsWith("+") ? phone : phone ? "+91" + phone : null, // Add country code if missing
      district: district || null,
      panchayat: panchayat || null,
      campaignId: campaignId || null,
      instituteId: instituteId || null,
      razorpayPaymentId,
      razorpayOrderId: razorpayOrderId || null, // Store as null if not provided
      razorpaySignature,
      status: "Completed",
    });
    console.log("Donation data:", donation);

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