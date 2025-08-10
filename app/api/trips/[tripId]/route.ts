import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectDB from '@/lib/mongodb';
import Trip from "@/models/Trip";

export async function DELETE(req: NextRequest, { params }: { params: { tripId: string } }) {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    // Find the trip by ID
    const trip = await Trip.findById(params.tripId);
    
    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    // Check if the user is authorized to delete this trip
    if (trip.createdBy.toString() !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized to delete this trip" }, { status: 403 });
    }

    // Delete the trip
    await Trip.findByIdAndDelete(params.tripId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting trip:", error);
    return NextResponse.json({ error: "Failed to delete trip" }, { status: 500 });
  }
}