// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/lib/auth';
// import connectDB from '@/lib/mongodb';
// import Group from '@/models/Group';
// import Expense from '@/models/Expense';
// import { calculateBalances } from '@/lib/utils';

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.id) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     await connectDB();

//     // Get user's groups
//     const groups = await Group.find({
//       isActive: true,
//       $or: [
//         { createdBy: session.user.id },
//         { 'members.user': session.user.id },
//       ],
//     }).populate({
//       path: 'members.user',
//       model: 'User',
//       select: '_id name email'
//     });

//     const groupIds = groups.map(group => group._id);

//     // Get expenses for all user's groups
//     const expenses = await Expense.find({
//       group: { $in: groupIds },
//     }).populate({
//       path: 'paidBy',
//       model: 'User',
//       select: '_id name email image'
//     });

//     // Calculate stats
//     const totalGroups = groups.length;
    
//     // Calculate total expenses amount (not just count)
//     let totalExpensesAmount = 0;
//     groups.forEach(group => {
//       totalExpensesAmount += group.totalExpenses || 0;
//     });
    
//     // Calculate user's personal expenses and amounts owed/owing
//     let userPaidTotal = 0;
//     let userOwesTotal = 0;
    
//     // Loop through each group
//     groups.forEach(group => {
//       // Find the current user in the group members
//       const userMember = group.members.find(
//         (m: any) => m.user && m.user._id && m.user._id.toString() === session.user.id
//       );
      
//       if (userMember) {
//         // If user has paid more than their fair share, others owe them
//         const fairShare = group.totalExpenses / group.members.length;
//         const userAmount = userMember.amount || 0;
        
//         if (userAmount > fairShare) {
//           userPaidTotal += (userAmount - fairShare);
//         } else if (userAmount < fairShare) {
//           userOwesTotal += (fairShare - userAmount);
//         }
//       }
//     });
    
//     // Round to 2 decimal places for currency
//     totalExpensesAmount = parseFloat(totalExpensesAmount.toFixed(2));
//     userPaidTotal = parseFloat(userPaidTotal.toFixed(2));
//     userOwesTotal = parseFloat(userOwesTotal.toFixed(2));

//     return NextResponse.json({
//       totalGroups,
//       totalExpenses: totalExpensesAmount,
//       totalOwed: userPaidTotal,
//       totalOwing: userOwesTotal,
//       expenseCount: expenses.length // Also include the count of expenses
//     });
//   } catch (error) {
//     console.error('Dashboard stats error:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import GroupModel from '@/models/Group'; // Renamed to avoid clash with interface
import ExpenseModel from '@/models/Expense'; // Renamed to avoid clash with interface

export const dynamic = 'force-dynamic';

// --- Define User interface first (assuming it's consistent across your app) ---
interface User {
  _id: string; // Mongoose ObjectId becomes string with .lean()
  name: string;
  email: string;
  image?: string;
}

// --- Interfaces for the data returned by .lean() and populate() ---

// Interface for Group members after population
interface PopulatedGroupMember {
  user: User; // The 'user' field is now a full User object
  amount: number;
  joinedAt: Date; // Mongoose Date objects remain Date objects even after .lean()
}

// Interface for the Group document after .lean() and populate()
interface LeanPopulatedGroup {
  _id: string; // Mongoose adds _id, which becomes a string
  name: string;
  description?: string;
  createdBy: string; // Assuming createdBy is also a string ObjectId after .lean()
  members: PopulatedGroupMember[]; // Array of populated members
  expenses?: string[]; // Array of Expense IDs (as strings) - if you need them. Not populated here.
  totalExpenses: number;
  isActive: boolean;
  createdAt: Date; // Mongoose timestamps are Date objects
  updatedAt: Date; // Mongoose timestamps are Date objects
  __v?: number; // Mongoose version key
}

// Interface for the Expense document after .lean() and populate()
interface LeanPopulatedExpense {
  _id: string; // Mongoose adds _id, which becomes a string
  description?: string;
  amount: number;
  paidBy: User; // The 'paidBy' field is now a full User object
  group: string; // The 'group' field is a string ObjectId
  splitType: 'equal' | 'custom';
  // Assuming splitDetails.user is also populated if you ever fetch it,
  // but for now, it's just ID in this context.
  splitDetails: {
    user: string; // This is likely still an ObjectId string, not populated
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