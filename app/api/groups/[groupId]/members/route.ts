import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Group from "@/models/Group";
import Member from "@/models/Member";

export async function POST(
  req: NextRequest,
  { params }: { params: { groupId: string } }
) {
  await dbConnect();

  const { name, phone, email = "", upiId = "" } = await req.json();

  if (!name || !phone) {
    return NextResponse.json({ message: "Name and phone number are required." }, { status: 400 });
  }

  try {
    const group = await Group.findById(params.groupId);
    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    let member = null;

    // Check existing member
    if (email) {
      member = await Member.findOne({ email });
    }
    if (!member) {
      member = await Member.findOne({ phone });
    }

    // Create new member if not found
    if (!member) {
      member = await Member.create({ name, phone, email, upiId });
    }

    // Check if already in group
    const alreadyInGroup = group.members.some((m) =>
      m.user.toString() === member._id.toString()
    );
    if (alreadyInGroup) {
      return NextResponse.json({ message: "Member already in the group." }, { status: 400 });
    }

    group.members.push({
      user: member._id,
      role: "member",
      joinedAt: new Date(),
    });

    await group.save();

    return NextResponse.json({ message: "Member added successfully" });
  } catch (error) {
    console.error("Add Member Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
