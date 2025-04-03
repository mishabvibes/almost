import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/db";
import PushToken from "../../../../models/pushToken";
import { Expo } from "expo-server-sdk";

export async function GET() {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Fetch all push tokens
    const pushTokensDocs = await PushToken.find({}, "expoPushToken");
    const pushTokens = pushTokensDocs.map((doc) => doc.expoPushToken); // Extract token values
    
    console.log("Retrieved push tokens from database:", pushTokens);
    
    if (!Array.isArray(pushTokens) || pushTokens.length === 0) {
      console.log("❌ No users with push tokens.");
      return NextResponse.json(
        { success: false, message: "No users with push tokens." },
        { status: 400 }
      );
    }

    let expo = new Expo();
    let messages = [];

    for (let token of pushTokens) {
      if (Expo.isExpoPushToken(token)) {
        messages.push({
          to: token,
          sound: "default",
          title: "📢 New Post Added!",
          body: "A new post has been uploaded! Check it out.",
          data: { screen: "PostDetails" },
          priority: "high",
          channelId: "default",
        });
      } else {
        console.warn(`⚠️ Invalid push token: ${token}`);
      }
    }

    console.log(`📩 Sending ${messages.length} notifications...`);

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    for (let chunk of chunks) {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    }

    console.log("✅ Notifications sent successfully:", tickets);
    return NextResponse.json({
      success: true,
      message: "Notifications sent",
      tickets,
    });
  } catch (error) {
    console.error("❌ Error sending notifications:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}