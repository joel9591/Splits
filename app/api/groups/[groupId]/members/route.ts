import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Group from "@/models/Group";

export async function POST(req: NextRequest, { params }: { params: { groupId: string } }) {
  await dbConnect();
  const { name, email, phone, upi } = await req.json();

  try {
    const group = await Group.findById(params.groupId);
    if (!group) return NextResponse.json({ message: "Group not found" }, { status: 404 });

    group.members.push({ user: { name, email, phone, upi } });
    await group.save();

    return NextResponse.json({ message: "Member added" });
  } catch (err) {
    return NextResponse.json({ message: "Error adding member" }, { status: 500 });
  }
}
