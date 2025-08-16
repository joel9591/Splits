import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectDB from '@/lib/mongodb';
import Trip from "@/models/Trip";
import { Document } from 'mongoose';

interface PlaceDocument extends Document {
  photoUrl?: string;
  toObject(): any;
  [key: string]: any;
}

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    // Get trips for the current user
    const trips = await Trip.find({ createdBy: session.user.id })
      .sort({ createdAt: -1 })
      .select('-pdfData'); // Exclude the PDF data to reduce response size

    // Transform the trips for client-side consumption
    const transformedTrips = trips.map(trip => ({
      _id: trip._id.toString(),
      tripTitle: trip.tripTitle,
      placesToVisit: trip.placesToVisit.map((place: PlaceDocument) => {
        const { photoUrl, ...rest } = place.toObject();
        return rest;
      }),
      hotelsOnTheWay: trip.hotelsOnTheWay,
      restaurantsOnTheWay: trip.restaurantsOnTheWay,
      fuelStopsOnTheWay: trip.fuelStopsOnTheWay,
      estimatedCost: trip.estimatedCost,
      budget: trip.budget,
      customBudgetAmount: trip.customBudgetAmount,
      createdBy: trip.createdBy.toString(),
      pdfUrl: trip.pdfUrl,
      createdAt: trip.createdAt.toISOString(),
      updatedAt: trip.updatedAt.toISOString(),
    }));

    return NextResponse.json(transformedTrips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    return NextResponse.json({ error: "Failed to fetch trips" }, { status: 500 });
  }
}