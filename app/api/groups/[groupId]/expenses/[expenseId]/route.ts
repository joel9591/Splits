import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Group from '@/models/Group';
import Expense from '@/models/Expense';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { groupId: string; expenseId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const group = await Group.findById(params.groupId);
    if (!group) {
      return NextResponse.json({ message: 'Group not found' }, { status: 404 });
    }

    // Only the creator can delete expenses
    if (group.createdBy.toString() !== session.user.id) {
      return NextResponse.json({ message: 'Not authorized to delete expenses' }, { status: 403 });
    }

    const expense = await Expense.findById(params.expenseId);
    if (!expense) {
      return NextResponse.json({ message: 'Expense not found' }, { status: 404 });
    }

    // Update group total expenses
    group.totalExpenses -= expense.amount;
    
    // Update member balances
    const paidByMemberId = expense.paidBy.toString();
    const memberIndex = group.members.findIndex(
      (m: any) => m.user.toString() === paidByMemberId
    );
    
    if (memberIndex !== -1) {
      group.members[memberIndex].amount -= expense.amount;
    }
    
    // Remove expense from group's expenses array if it exists
    const expenseIndex = group.expenses.indexOf(params.expenseId);
    if (expenseIndex !== -1) {
      group.expenses.splice(expenseIndex, 1);
    }
    
    await group.save();
    
    // Delete the expense
    await Expense.findByIdAndDelete(params.expenseId);

    return NextResponse.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Delete expense error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}