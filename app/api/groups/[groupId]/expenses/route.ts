import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Group from "@/models/Group";

export async function POST(req: NextRequest, { params }: { params: { groupId: string } }) {
  await dbConnect();
  const { paidBy, amount, description } = await req.json();

  try {
    const group = await Group.findById(params.groupId);
    if (!group) return NextResponse.json({ message: "Group not found" }, { status: 404 });

    const newExpense = {
      paidBy,
      amount: parseFloat(amount),
      description,
      date: new Date(),
    };

    group.totalExpenses += newExpense.amount;
    group.expenses.push(newExpense);
    await group.save();

    return NextResponse.json({ message: "Expense added" });
  } catch (err) {
    return NextResponse.json({ message: "Error adding expense" }, { status: 500 });
  }
}
