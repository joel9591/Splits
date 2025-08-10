import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectDB from '@/lib/mongodb';
import Trip from "@/models/Trip";

export async function DELETE(req: NextRequest) {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    // Delete all trips for the current user
    await Trip.deleteMany({ createdBy: session.user.id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing trip history:", error);
    return NextResponse.json({ error: "Failed to clear trip history" }, { status: 500 });
  }
}