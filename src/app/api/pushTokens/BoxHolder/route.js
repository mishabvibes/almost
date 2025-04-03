import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/db"
import PushToken from "../../../../models/BoxHolderToken";


export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    console.log("requised");


    console.log("Received request to save push token");
    const body = await req.json(); // Parse the request body
    const expoPushToken = body.expoPushToken; // Extract the token from the 'expoPushToken' field
    console.log("Expo Push Token:", expoPushToken);

    if (!expoPushToken) {
      console.log("No push token provided");
      return NextResponse.json(
        { success: false, message: "Push token is required" },
        { status: 400 }
      );
    }

    // Save to database (example with MongoDB)
    // const result = await PushToken.insertOne({
    //   expoPushToken, // Save the token string directly
    //   createdAt: new Date(),
    // });



    // Save or update push token (avoid duplicates due to unique constraint)
    await PushToken.findOneAndUpdate(
      { expoPushToken }, // Find by token
      { expoPushToken }, // Update or set the token
      { upsert: true, new: true } // Upsert: insert if not found, update if found
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