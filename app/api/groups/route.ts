import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Group from '@/models/Group';
import User from '@/models/User';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const groups = await Group.find({
      'members.user': session.user.id,
      isActive: true,
    })
      .populate('members.user', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json(groups);
  } catch (error) {
    console.error('Get groups error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json({ message: 'Group name is required' }, { status: 400 });
    }

    await connectDB();

    const group = await Group.create({
      name,
      description,
      createdBy: session.user.id,
      members: [{
        user: session.user.id,
        role: 'admin',
      }],
    });

    // Add group to user's groups array
    await User.findByIdAndUpdate(session.user.id, {
      $push: { groups: group._id },
    });

    return NextResponse.json(group, { status: 201 });
  } catch (error) {
    console.error('Create group error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}