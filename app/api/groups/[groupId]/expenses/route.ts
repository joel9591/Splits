import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Group from "@/models/Group";
import Expense from "@/models/Expense";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { groupId: string } }) {
  await dbConnect();
  
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const group = await Group.findById(params.groupId);
    
    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }
    
    const isAuthorized = 
      group.createdBy.toString() === session.user.id ||
      group.members.some((m: any) => m.user.toString() === session.user.id);
      
    if (!isAuthorized) {
      return NextResponse.json({ message: "Not authorized to view expenses for this group" }, { status: 403 });
    }

    const expenses = await Expense.find({ group: params.groupId })
      .populate({
        path: "paidBy",
        model: "User",
        select: "_id name email image"
      })
      .sort({ createdAt: -1 });
    
    return NextResponse.json(expenses);
  } catch (err) {
    console.error("Error fetching expenses:", err);
    return NextResponse.json({ message: "Error fetching expenses" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { groupId: string } }) {
  await dbConnect();
  
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  
  const { paidBy, amount, description } = await req.json();

  if (!paidBy || !amount) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  try {
    const group = await Group.findById(params.groupId).populate({
      path: "members.user",
      model: "User",
      select: "_id name email"
    });

    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }
    
    const isAuthorized = 
      group.createdBy.toString() === session.user.id ||
      group.members.some((m: any) => m.user._id.toString() === session.user.id);
      
    if (!isAuthorized) {
      return NextResponse.json({ message: "Not authorized to add expenses to this group" }, { status: 403 });
    }

    const memberEntry = group.members.find(
      (m: any) => m.user && m.user.name && m.user.name.toLowerCase() === paidBy.trim().toLowerCase()
    );

    if (!memberEntry || !memberEntry.user) {
      return NextResponse.json({ message: "Member not found in this group" }, { status: 400 });
    }

    const memberId = memberEntry.user._id;
    const numericAmount = parseFloat(amount);

    const expense = await Expense.create({
      description,
      amount: numericAmount,
      paidBy: memberId,
      group: group._id,
      splitType: 'equal',
      splitDetails: group.members.map((member: any) => ({
        user: member.user._id,
        amount: numericAmount / group.members.length,
        isPaid: member.user._id.toString() === memberId.toString() 
      })),
      createdAt: new Date()
    });

    const memberIndex = group.members.findIndex(
      (m: any) => m.user._id.toString() === memberId.toString()
    );
    
    if (memberIndex !== -1) {
      group.members[memberIndex].amount += numericAmount;
    }

    group.expenses.push(expense._id);
    group.totalExpenses += numericAmount;
    await group.save();

    return NextResponse.json({ message: "Expense added", expense });
  } catch (err) {
    console.error("Error adding expense:", err);
    return NextResponse.json({ message: "Error adding expense" }, { status: 500 });
  }
}
