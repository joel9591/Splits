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
      'members.user': session.user.id,
      isActive: true,
    });

    const groupIds = groups.map(group => group._id);

    // Get expenses for all user's groups
    const expenses = await Expense.find({
      group: { $in: groupIds },
    }).populate('splitDetails.user');

    // Calculate stats
    const totalGroups = groups.length;
    const totalExpenses = expenses.length;

    // Calculate balances
    const balances = calculateBalances(expenses, session.user.id);
    
    let totalOwed = 0;
    let totalOwing = 0;

    Object.values(balances).forEach(balance => {
      if (balance > 0) {
        totalOwed += balance;
      } else if (balance < 0) {
        totalOwing += Math.abs(balance);
      }
    });

    return NextResponse.json({
      totalGroups,
      totalExpenses,
      totalOwed,
      totalOwing,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}