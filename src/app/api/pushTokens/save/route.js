import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/db";
import PushToken from "../../../../models/pushToken";

export async function POST(req) {
  try {
    await connectToDatabase();
    console.log("Received request to save push token");

    const body = await req.json();
    const expoPushToken = body.expoPushToken;
    console.log("Expo Push Token:", expoPushToken);

    if (!expoPushToken) {
      console.log("No push token provided");
      return NextResponse.json(
        { success: false, message: "Push token is required" },
        { status: 400 }
      );
    }

    // Save or update push token (avoid duplicates due to unique constraint)
    await PushToken.findOneAndUpdate(
      { expoPushToken }, // Find by token
      { expoPushToken }, // Update or set the token
      { upsert: true, new: true } // Upsert: insert if not found, return updated doc
    );

    console.log("Push token saved to database");
    return NextResponse.json({
      success: true,
      message: "Push token saved successfully",
    });
  } catch (error) {
    console.error("Error saving push token:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}