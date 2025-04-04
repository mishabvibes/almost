// src/app/api/boxes/create/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Box from "@/models/Box";

export async function POST(req) {
  try {
    console.log("🔹 Received request to /api/boxes/create");

    // Get session user details
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

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
      registeredDate,
    } = body;

    const phone= "+91"+mobileNumber

    // Ensure required fields exist
    if (
      !serialNumber ||
      !location || // Added to required fields
      !name ||
      !houseName ||
      !address ||
      !place ||
      !area ||
      !district ||
      !panchayath ||
      !ward ||
      !mahallu ||
      !pincode ||
      !phone ||
      !registeredDate
    ) {
      const missingFields = [
        !serialNumber && "serialNumber",
        !location && "location",
        !name && "name",
        !houseName && "houseName",
        !address && "address",
        !place && "place",
        !area && "area",
        !district && "district",
        !panchayath && "panchayath",
        !ward && "ward",
        !mahallu && "mahallu",
        !pincode && "pincode",
        !phone && "mobileNumber",
        !registeredDate && "registeredDate",
      ].filter(Boolean);
      return NextResponse.json(
        {
          error: `All required fields must be provided. Missing: ${missingFields.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // Validate and convert date
    const formattedDate = new Date(registeredDate);
    if (isNaN(formattedDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    // Validate session user data
    if (!session.user.name || !session.user.phone) {
      return NextResponse.json(
        {
          error: "Session user data incomplete (name or phone missing)",
        },
        { status: 400 }
      );
    }
   
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
      lastPayment:new Date(),
      registeredDate: formattedDate,
      sessionUser: {
        id:session.user.id,
        role:session.user.role,
        name: session.user.name,
        phone: session.user.phone,
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