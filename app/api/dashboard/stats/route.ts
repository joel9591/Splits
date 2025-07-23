import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Group from '@/models/Group';
import Expense from '@/models/Expense';
import { calculateBalances } from '@/lib/utils';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get user's groups
    const groups = await Group.find({
      isActive: true,
      $or: [
        { createdBy: session.user.id },
        { 'members.user': session.user.id },
      ],
    }).populate({
      path: 'members.user',
      model: 'User',
      select: '_id name email'
    });

    const groupIds = groups.map(group => group._id);

    // Get expenses for all user's groups
    const expenses = await Expense.find({
      group: { $in: groupIds },
    }).populate({
      path: 'paidBy',
      model: 'User',
      select: '_id name email image'
    });

    // Calculate stats
    const totalGroups = groups.length;
    
    // Calculate total expenses amount (not just count)
    let totalExpensesAmount = 0;
    groups.forEach(group => {
      totalExpensesAmount += group.totalExpenses || 0;
    });
    
    // Calculate user's personal expenses and amounts owed/owing
    let userPaidTotal = 0;
    let userOwesTotal = 0;
    
    // Loop through each group
    groups.forEach(group => {
      // Find the current user in the group members
      const userMember = group.members.find(
        (m: any) => m.user && m.user._id && m.user._id.toString() === session.user.id
      );
      
      if (userMember) {
        // If user has paid more than their fair share, others owe them
        const fairShare = group.totalExpenses / group.members.length;
        const userAmount = userMember.amount || 0;
        
        if (userAmount > fairShare) {
          userPaidTotal += (userAmount - fairShare);
        } else if (userAmount < fairShare) {
          userOwesTotal += (fairShare - userAmount);
        }
      }
    });
    
    // Round to 2 decimal places for currency
    totalExpensesAmount = parseFloat(totalExpensesAmount.toFixed(2));
    userPaidTotal = parseFloat(userPaidTotal.toFixed(2));
    userOwesTotal = parseFloat(userOwesTotal.toFixed(2));

    return NextResponse.json({
      totalGroups,
      totalExpenses: totalExpensesAmount,
      totalOwed: userPaidTotal,
      totalOwing: userOwesTotal,
      expenseCount: expenses.length // Also include the count of expenses
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}