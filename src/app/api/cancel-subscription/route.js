import Razorpay from "razorpay";
import connectDB from "../../../lib/db";
import Subscription from "../../../models/AutoSubscription";
import { NextResponse } from "next/server";
import Donor from "../../../models/Donor";
import twilio from "twilio";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(req) {
  try {
    await connectDB();
    const { subscriptionId } = await req.json();

    if (!subscriptionId) {
      return NextResponse.json({ error: "Missing subscriptionId" }, { status: 400 });
    }

    const subscription = await Subscription.findOne({ razorpaySubscriptionId: subscriptionId });
    if (!subscription) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
    }

    await razorpay.subscriptions.cancel(subscriptionId);
    subscription.status = "cancelled";
    await subscription.save();

    const donorId = subscription.donorId;
    const _id = subscription._id;

    await Donor.deleteOne({ _id: donorId });
    await Subscription.deleteOne({ _id: _id });

    const fromNumber = `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`;
    // const toNumber = subscription.phoneNumber.startsWith("+")
      // ? `whatsapp:${subscription.phoneNumber}`
      // : `whatsapp:+91${subscription.phoneNumber}`; // Fixed syntax here

    try {
      await twilioClient.messages.create({
        body: `Your ${subscription.period} donation subscription has been cancelled. Thank you for your support!`,
        from: fromNumber,
        to: subscription.phone,
      });
    } catch (twilioError) {
      console.error("Twilio error:", twilioError.message);
    }

    return NextResponse.json({
      success: true, // Added success flag
      message: "Subscription cancelled",
      subscriptionId: subscriptionId,
    });
  } catch (error) {
    console.error("Cancel subscription error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}