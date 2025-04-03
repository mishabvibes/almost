// src/app/api/volunteers/[id]/route.js
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Volunteer from "@/models/Volunteer";

// GET: Fetch a single volunteer by ID
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const volunteer = await Volunteer.findById(params.id);

    if (!volunteer) {
      return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
    }

    return NextResponse.json(volunteer);
  } catch (error) {
    console.error("Error fetching volunteer:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH: Update a volunteer's status
export async function PATCH(request, { params }) {
  try {
    await connectToDatabase();
    const data = await request.json();

    // Define allowed fields to update (prevent unwanted fields)
    const allowedUpdates = ["name", "phone", "email", "place", "status", "role"];
    const updates = Object.keys(data).reduce((acc, key) => {
      if (allowedUpdates.includes(key)) {
        acc[key] = data[key];
      }
      return acc;
    }, {});

    // Add updatedAt timestamp
    updates.updatedAt = new Date();

    // Validate status if provided
    if (updates.status && !["pending", "approved", "rejected"].includes(updates.status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const volunteer = await Volunteer.findByIdAndUpdate(
      params.id,
      { $set: updates },
      { new: true, runValidators: true } // Return updated doc and run schema validators
    );

    if (!volunteer) {
      return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
    }

    return NextResponse.json(volunteer);
  } catch (error) {
    console.error("Error updating volunteer:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE: Delete a volunteer
export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const volunteer = await Volunteer.findByIdAndDelete(params.id);

    if (!volunteer) {
      return NextResponse.json({ error: "Volunteer not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}