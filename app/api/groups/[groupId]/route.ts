import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Group from '@/models/Group';
import Expense from '@/models/Expense';
import { simplifyDebts, calculateBalances } from '@/lib/utils';

export async function GET(
  req: NextRequest,
  { params }: { params: { groupId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const group = await Group.findById(params.groupId)
      .populate({
        path: 'members.user',
        model: 'User',
        select: 'name email image',
      })
      .populate('createdBy', 'name email');

    if (!group) {
      return NextResponse.json({ message: 'Group not found' }, { status: 404 });
    }

    // Verify the current user is the group creator or a member
    const isAuthorized = 
      group.createdBy._id.toString() === session.user.id ||
      group.members.some((m: { user: { _id: { toString: () => string; }; }; }) => m.user && m.user._id && m.user._id.toString() === session.user.id);
      
    if (!isAuthorized) {
      return NextResponse.json({ message: 'Not authorized to view this group' }, { status: 403 });
    }

    // Get expenses for this group
    const expenses = await Expense.find({ group: params.groupId })
      .populate('paidBy', 'name email image')
      .sort({ createdAt: -1 });

    // Transform the response to ensure proper formatting
    const groupObj = group.toObject();
    
    // Format the createdBy field
    const formattedCreatedBy = groupObj.createdBy ? {
      _id: groupObj.createdBy._id,
      name: groupObj.createdBy.name,
      email: groupObj.createdBy.email
    } : null;
    
    // Format and filter members
    const formattedMembers = groupObj.members
      .filter((member: any) => member.user !== null && member.user !== undefined)
      .map((member: any) => ({
        user: {
          _id: member.user._id,
          name: member.user.name,
          email: member.user.email,
          image: member.user.image
        },
        amount: member.amount || 0,
        joinedAt: member.joinedAt
      }));
    
    // Format expenses
    const formattedExpenses = expenses.map((expense: any) => {
      const expenseObj = expense.toObject();
      return {
        _id: expenseObj._id,
        description: expenseObj.description,
        amount: expenseObj.amount,
        paidBy: expenseObj.paidBy,
        createdAt: expenseObj.createdAt,
        splitType: expenseObj.splitType,
        splitDetails: expenseObj.splitDetails || []
      };
    });

    // Calculate settlements
    const balances: { [key: string]: number } = {};
    
    // Initialize balances for all members
    formattedMembers.forEach((member: { user: { _id: string | number; }; }) => {
      balances[member.user._id] = 0;
    });
    
    // Calculate how much each person has paid vs. their fair share
    formattedMembers.forEach((member: { user: { _id: string | number; }; amount: number; }) => {
      balances[member.user._id] = member.amount - (group.totalExpenses / formattedMembers.length);
    });
    
    // Generate settlement suggestions
    const settlements = simplifyDebts(balances);
    
    // Format settlements with user details
    const formattedSettlements = settlements.map(settlement => {
      const fromMember = formattedMembers.find((m: { user: { _id: { toString: () => string; }; }; }) => m.user._id.toString() === settlement.from);
      const toMember = formattedMembers.find((m: { user: { _id: { toString: () => string; }; }; }) => m.user._id.toString() === settlement.to);
      
      return {
        from: fromMember?.user || { _id: settlement.from, name: 'Unknown', email: '' },
        to: toMember?.user || { _id: settlement.to, name: 'Unknown', email: '' },
        amount: settlement.amount
      };
    });
    
    const formattedGroup = {
      ...groupObj,
      createdBy: formattedCreatedBy,
      members: formattedMembers,
      memberCount: formattedMembers.length,
      expenses: formattedExpenses,
      settlements: formattedSettlements
    };

    return NextResponse.json(formattedGroup);
  } catch (error) {
    console.error('Get group error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Add DELETE method to delete a group
export async function DELETE(
  req: NextRequest,
  { params }: { params: { groupId: string } }
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

    // Only the creator can delete the group
    if (group.createdBy.toString() !== session.user.id) {
      return NextResponse.json({ message: 'Not authorized to delete this group' }, { status: 403 });
    }

    // Delete all expenses associated with this group
    await Expense.deleteMany({ group: params.groupId });
    
    // Delete the group
    await Group.findByIdAndDelete(params.groupId);

    return NextResponse.json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error('Delete group error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}