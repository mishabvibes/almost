import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import Sponsor from "../../../../models/Sponsor";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const {
      amount,
      name,
      phone,
      type,
      program,
      period,
      district,
      panchayat,
      userId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = body;

    const donation = new Sponsor({
      amount,
      name,
      phone,
      type,
      program,
      period,
      district,
      panchayat,
      userId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    });

    await donation.save();
    return NextResponse.json({ id: donation._id }, { status: 201 });
  } catch (error) {
    console.error("Error saving donation:", error);
    return NextResponse.json(
      { error: "Failed to save donation", details: (error as Error).message },
      { status: 500 }
    );
  }
}


// import connectToDatabase from "../../../lib/db";
// import Sponsorship from "../../../models/Sponsorship";
// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";
// import crypto from "crypto";

// const razorpay = new Razorpay({
//   key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export async function POST(req) {
//   try {
//     await connectToDatabase();

//     const body = await req.json();
//     console.log("Request body:", body);

//     const {
//       amount,
//       type,
//       name,
//       speriod,
//       phone, // Form sends "phone"
//       district,
//       panchayat, // Form sends "panchayat"
//       razorpayPaymentId,
//       razorpayOrderId,
//       razorpaySignature,
//     } = body;

//     // Validate required fields
//     if (!amount || !type || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
//       return NextResponse.json({ error: "Missing required payment fields" }, { status: 400 });
//     }

//     // Verify Razorpay payment signature
//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(`${razorpayOrderId}|${razorpayPaymentId}`)
//       .digest("hex");

//     if (generatedSignature !== razorpaySignature) {
//       console.log("Signature mismatch:", { generatedSignature, razorpaySignature });
//       return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
//     }

//     // Map form data to schema fields
//     const donation = new Sponsorship({
//       amount: parseFloat(amount),
//       type,
//       name: name || "Anonymous", // Default if not provided
//       speriod,
//       phoneNumber: phone || null, // Map "phone" to "phoneNumber"
//       district: district || "Not specified", // Default if not provided
//       panchayath: panchayat || "Not specified", // Map "panchayat" to "panchayath"
//       razorpayPaymentId,
//       razorpayOrderId,
//       status: "Completed",
//     });

//     await donation.save();
//     console.log("Donation saved:", donation._id);

//     return NextResponse.json(
//       { message: "Donation created", id: donation._id },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating donation:", error);
//     if (error.name === "ValidationError") {
//       const errors = Object.values(error.errors).map((err) => err.message);
//       return NextResponse.json({ error: errors.join(", ") }, { status: 400 });
//     }
//     return NextResponse.json(
//       { error: "Failed to create donation", details: error.message },
//       { status: 500 }
//     );
//   }
// }