import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Box from "@/models/Box";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  try {
    console.log("🔹 Received request to /api/boxes/create");


    await dbConnect();


    // Parse request body
    const body = await req.json();
    console.log("🔹 Data received from frontend:", body);

    const {
      serialNumber,
      location, // Added to match schema
      name,
      houseName,
      address,
      place,
      area,
      agent,
      district,
      panchayath,
      ward,
      mahallu,
      pincode,
      mobileNumber,
      secondaryMobileNumber,
      careOf,
      agentId,
      agentName,
      agentPhone,
      agentEmail,
      agentRole,
     
    } = body;

    const phone= "+91"+mobileNumber

    
   
    // Create new box entry
    const newBox = new Box({
      serialNumber,
      location,
      name,
      houseName,
      address,
      place,
      area,
      agent,
      district,
      panchayath,
      ward,
      mahallu,
      pincode,
      phone,
      secondaryMobileNumber,
      careOf,
      lastPayment:null,
      registeredDate: new Date(),
      sessionUser: {
        id:agentId,
        role:agentRole,
        name: agentName,
        phone:agentPhone,
        email:agentEmail,
      },
    });

    console.log("✅ Box Data Before Saving:", newBox);

    // Save to database
    await newBox.save();
    console.log("✅ Box registered successfully:", newBox);

    return NextResponse.json({ message: "Box registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("🔥 Server Error:", error);
    return NextResponse.json(
      { error: "Failed to register box", details: error.message },
      { status: 500 }
    );
  }
}