// I:\New folder-Splits\app\api\groups\[groupId]\members\route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Group from "@/models/Group";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Types } from 'mongoose';

// Assuming Group model's members array stores user references and other data
interface GroupMemberInGroupModel {
    user: Types.ObjectId; // This is the ObjectId reference to the User model
    amount: number;
    joinedAt: Date;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { groupId: string } }
) {
  await dbConnect();
  
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, phone, email = "", upiId = "" } = await req.json();

  if (!name || !phone) {
    return NextResponse.json({ message: "Name and phone number are required." }, { status: 400 });
  }

  try {
    const group = await Group.findById(params.groupId);
    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }
    
    // Explicitly cast group.members to the expected type for TypeScript to infer 'm' correctly
    const groupMembers: GroupMemberInGroupModel[] = group.members as GroupMemberInGroupModel[];

    const isAuthorized = 
      group.createdBy.toString() === session.user.id ||
      groupMembers.some(m => m.user.toString() === session.user.id);
      
    if (!isAuthorized) {
      return NextResponse.json({ message: "Not authorized to add members to this group" }, { status: 403 });
    }

    let user = null;
    if (email) {
      user = await User.findOne({ email });
    }

    if (!user) {
      try {
        user = await User.create({
          name,
          email: email || '',
          phone,
          provider: 'google',
          image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
        });
      } catch (createError: unknown) { // Fixed: Type 'createError' as unknown
        console.error("User creation error:", createError);
        // Safely access message property if createError is an Error instance
        const errorMessage = createError instanceof Error ? createError.message : "An unknown error occurred during user creation.";
        return NextResponse.json({ 
          message: "Failed to create user", 
          error: errorMessage 
        }, { status: 400 });
      }
    }

    // Explicitly cast group.members again for the 'some' method
    const alreadyInGroup = (group.members as GroupMemberInGroupModel[]).some(m =>
      m.user.toString() === user._id.toString()
    );
    
    if (alreadyInGroup) {
      return NextResponse.json({ message: "Member already in the group." }, { status: 400 });
    }

    group.members.push({
      user: user._id,
      amount: 0,
      joinedAt: new Date(),
    });

    await group.save();
    
    await User.findByIdAndUpdate(user._id, {
      $addToSet: { groups: group._id }
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