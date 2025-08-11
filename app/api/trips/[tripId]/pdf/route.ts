import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectDB from '@/lib/mongodb';
import Trip from "@/models/Trip";

export async function GET(req: NextRequest, { params }: { params: { tripId: string } }) {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    // Find the trip using the pdfId field, not the ObjectId
    const trip = await Trip.findOne({ pdfId: params.tripId });

    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    // Check if the user is authorized to access this trip
    if (trip.createdBy.toString() !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized to access this trip" }, { status: 403 });
    }

    // If the trip doesn't have PDF data, return an error
    if (!trip.pdfData) {
      return NextResponse.json({ error: "PDF not found for this trip" }, { status: 404 });
    }

    // Return the PDF data with appropriate headers
    return new NextResponse(trip.pdfData, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${trip.tripTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error retrieving PDF:", error);
    return NextResponse.json({ error: "Failed to retrieve PDF" }, { status: 500 });
  }
}