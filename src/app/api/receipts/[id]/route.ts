import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Donation from '@/models/Donation';

export async function GET(
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Donation ID is required' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    await connectToDatabase();
    
    // Find the donation by ID
    const donation = await Donation.findById(id).lean();
    
    if (!donation) {
      return NextResponse.json(
        { error: 'Donation receipt not found' },
        { status: 404 }
      );
    }
    
    // Return donation as receipt
    return NextResponse.json({ receipt: donation });
  } catch (error) {
    console.error('Error fetching receipt:', error);
    return NextResponse.json(
      { error: 'Failed to fetch receipt' },
      { status: 500 }
    );
  }
}