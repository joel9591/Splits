import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Group from '@/models/Group';
import Expense from '@/models/Expense';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { groupId: string; memberId: string } }
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

    // Only the creator can remove members
    if (group.createdBy.toString() !== session.user.id) {
      return NextResponse.json({ message: 'Not authorized to remove members' }, { status: 403 });
    }

    // Find the member index
    const memberIndex = group.members.findIndex(
      (m: any) => m.user.toString() === params.memberId
    );

    if (memberIndex === -1) {
      return NextResponse.json({ message: 'Member not found in this group' }, { status: 404 });
    }

    // Check if the member has any expenses in the group
    const memberExpenses = await Expense.find({
      group: params.groupId,
      paidBy: params.memberId
    });

    if (memberExpenses.length > 0) {
      return NextResponse.json({ 
        message: 'Cannot remove member with expenses. Please delete their expenses first.',
        hasExpenses: true
      }, { status: 400 });
    }

    // Get the member's amount (total spent) before removing
    const memberAmount = group.members[memberIndex].amount || 0;
    
    // Remove the member
    group.members.splice(memberIndex, 1);
    
    // Update total expenses if the member had spent money
    if (memberAmount > 0) {
      group.totalExpenses -= memberAmount;
    }
    
    await group.save();

    return NextResponse.json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error('Remove member error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}