import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Group from "@/models/Group";
import Expense from "@/models/Expense";
import Member from "@/models/Member";

export async function POST(req: NextRequest, { params }: { params: { groupId: string } }) {
  await dbConnect();
  const { paidBy, amount, description } = await req.json();

  if (!paidBy || !amount) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  try {
    const group = await Group.findById(params.groupId).populate("members.user");

    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    const memberEntry = group.members.find(
      (m: any) => m.user.name.toLowerCase() === paidBy.trim().toLowerCase()
    );

    if (!memberEntry) {
      return NextResponse.json({ message: "Name is not found in group members" }, { status: 400 });
    }

    const memberId = memberEntry.user._id;
    const numericAmount = parseFloat(amount);

    // Create expense
    const expense = await Expense.create({
      description,
      amount: numericAmount,
      paidBy: memberId,
      group: group._id,
    });

    // Update member's amount
    await Member.findByIdAndUpdate(memberId, {
      $inc: { amount: numericAmount },
    });

    // Update group
    group.expenses.push(expense._id);
    group.totalExpenses += numericAmount;
    await group.save();

    return NextResponse.json({ message: "Expense added", expense });
  } catch (err) {
    console.error("Error adding expense:", err);
    return NextResponse.json({ message: "Error adding expense" }, { status: 500 });
  }
}
