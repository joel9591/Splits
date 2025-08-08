import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import GroupModel from '@/models/Group'; 
import ExpenseModel from '@/models/Expense'; 

export const dynamic = 'force-dynamic';


interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
}



interface PopulatedGroupMember {
  user: User; 
  amount: number;
  joinedAt: Date; 
}


interface LeanPopulatedGroup {
  _id: string; 
  name: string;
  description?: string;
  createdBy: string;
  members: PopulatedGroupMember[]; 
  expenses?: string[]; 
  totalExpenses: number;
  isActive: boolean;
  createdAt: Date; 
  updatedAt: Date; 
  __v?: number; 
}


interface LeanPopulatedExpense {
  _id: string; 
  description?: string;
  amount: number;
  paidBy: User; 
  group: string;
  splitType: 'equal' | 'custom';
  splitDetails: {
    user: string; 
    amount: number;
    isPaid: boolean;
  }[];
  category?: string;
  createdAt: Date; // Mongoose timestamps are Date objects
  updatedAt: Date; // Mongoose timestamps are Date objects
  __v?: number; // Mongoose version key
}
// --- End of interfaces ---


export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      console.warn("Dashboard stats API: Unauthorized access attempt - no session or user ID.");
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Explicitly type the result of find().populate().lean() using the new interfaces
    const groups: LeanPopulatedGroup[] = await GroupModel.find({
      isActive: true,
      $or: [
        { createdBy: session.user.id },
        { 'members.user': session.user.id },
      ],
    }).populate({
      path: 'members.user',
      model: 'User',
      select: '_id name email image'
    }).lean() as LeanPopulatedGroup[]; // No 'as unknown as' needed if interfaces are precise

    const groupIds = groups.map(group => group._id.toString());

    // Explicitly type the result of find().populate().lean() using the new interfaces
    const expenses: LeanPopulatedExpense[] = await ExpenseModel.find({
      group: { $in: groupIds },
    }).populate({
      path: 'paidBy',
      model: 'User',
      select: '_id name email image'
    }).lean() as LeanPopulatedExpense[]; // No 'as unknown as' needed if interfaces are precise

    const totalGroups = groups.length;

    let totalExpensesAmount = 0;
    groups.forEach(group => {
      totalExpensesAmount += group.totalExpenses || 0;
    });

    let totalOwedByOthersToUser = 0;
    let totalOwedByUserToOthers = 0;

    groups.forEach(group => {
      // Both exp.group and group._id are strings after .lean()
      const groupExpenses = expenses.filter(exp => exp.group === group._id.toString());
      
      // The `m` here is `PopulatedGroupMember`, so `m.user` is `User` type.
      const userInGroupMembers = group.members.find(
        (m) => m.user && m.user._id && m.user._id.toString() === session.user.id
      );

      if (userInGroupMembers) {
        const fairShare = group.totalExpenses / group.members.length;
        const userAmount = userInGroupMembers.amount || 0;

        if (userAmount > fairShare) {
          totalOwedByOthersToUser += (userAmount - fairShare);
        } else if (userAmount < fairShare) {
          totalOwedByUserToOthers += (fairShare - userAmount);
        }
      }
    });

    totalExpensesAmount = parseFloat(totalExpensesAmount.toFixed(2));
    totalOwedByOthersToUser = parseFloat(totalOwedByOthersToUser.toFixed(2));
    totalOwedByUserToOthers = parseFloat(totalOwedByUserToOthers.toFixed(2));

    return NextResponse.json({
      totalGroups,
      totalExpenses: totalExpensesAmount,
      totalOwed: totalOwedByOthersToUser,
      totalOwing: totalOwedByUserToOthers,
      expenseCount: expenses.length
    });
  } catch (error) {
    console.error('Dashboard stats API error:', error);
    return NextResponse.json({ message: 'Internal server error fetching dashboard stats.' }, { status: 500 });
  }
}