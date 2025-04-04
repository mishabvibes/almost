import connectDB from "../../../lib/db";
import Subscription from "../../../models/AutoSubscription";
import Donation from "../../../models/AutoDonation";
import { NextResponse } from "next/server";
import twilio from "twilio";
import crypto from "crypto";

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const verifySignature = (body, signature, secret) => {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(JSON.stringify(body));
  return hmac.digest("hex") === signature;
};

export async function POST(req) {
  try {
    await connectDB();
    const rawBody = await req.text();
    const event = JSON.parse(rawBody);
    const signature = req.headers.get("x-razorpay-signature");

    if (!verifySignature(event, signature, process.env.RAZORPAY_WEBHOOK_SECRET)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.event === "subscription.charged") {
      const subscriptionId = event.payload.subscription.entity.id;
      const paymentId = event.payload.payment.entity.id;
      const amount = event.payload.payment.entity.amount / 100; // Convert paise to INR

      const subscription = await Subscription.findOne({ subscriptionId });
      if (!subscription || subscription.status !== "active") {
        return NextResponse.json({ received: true }); // Acknowledge but skip
      }

      const donation = new Donation({
        donorId: subscription.donorId,
        subscriptionId,
        name: subscription.name || "Anonymous",
        phone: subscription.phoneNumber,
        amount,
        email:subscription.email,
        period: subscription.period,
        razorpayPaymentId: paymentId,
        paymentStatus: "paid",
        paymentDate: new Date(),
      });
      await donation.save();
      console.log("Recurring donation recorded:", donation);

      const fromNumber = `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`;
      const toNumber = subscription.phone.startsWith("+")
        ? `whatsapp:${subscription.phone}`
        : `whatsapp:+91${subscription.phone}`;
      try {
        await twilioClient.messages.create({
          body: `Payment of ₹${amount} for your ${subscription.period} donation subscription received! Thank you for your support.`,
          from: fromNumber,
          to: toNumber,
        });
      } catch (twilioError) {
        console.error("Twilio error:", twilioError.message);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 