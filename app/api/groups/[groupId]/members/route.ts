import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Group from "@/models/Group";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: { groupId: string } }
) {
  await dbConnect();
  
  // Get the current session to verify authorization
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, phone, email = "", upiId = "" } = await req.json();

  if (!name || !phone) {
    return NextResponse.json({ message: "Name and phone number are required." }, { status: 400 });
  }

  try {
    // Find the group and verify it exists
    const group = await Group.findById(params.groupId);
    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }
    
    // Verify the current user is the group creator or a member
    const isAuthorized = 
      group.createdBy.toString() === session.user.id ||
      group.members.some(m => m.user.toString() === session.user.id);
      
    if (!isAuthorized) {
      return NextResponse.json({ message: "Not authorized to add members to this group" }, { status: 403 });
    }

    // First check if user exists in the system
    let user = null;
    if (email) {
      user = await User.findOne({ email });
    }

    // If user doesn't exist in the system, create a new user
    if (!user) {
      try {
        // For users added to groups, set provider to 'external' to bypass password requirement
        user = await User.create({
          name,
          email: email || `${phone}@placeholder.com`, // Use phone as email if not provided
          phone,
          provider: 'google', // Use google provider to bypass password requirement
          // Generate a random image based on name
          image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
        });
      } catch (createError) {
        console.error("User creation error:", createError);
        return NextResponse.json({ 
          message: "Failed to create user", 
          error: createError.message 
        }, { status: 400 });
      }
    }

    // Check if user is already in the group
    const alreadyInGroup = group.members.some((m) =>
      m.user.toString() === user._id.toString()
    );
    
    if (alreadyInGroup) {
      return NextResponse.json({ message: "Member already in the group." }, { status: 400 });
    }

    // Add user to the group
    group.members.push({
      user: user._id,
      amount: 0, // Initialize with zero amount
      joinedAt: new Date(),
    });

    await group.save();
    
    // Also update the user's groups array
    await User.findByIdAndUpdate(user._id, {
      $addToSet: { groups: group._id } // Use addToSet to avoid duplicates
    });

    return NextResponse.json({
      message: "Member added successfully",
      member: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        },
        amount: 0,
        joinedAt: new Date()
      }
    });
  } catch (error) {
    console.error("Add Member Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
