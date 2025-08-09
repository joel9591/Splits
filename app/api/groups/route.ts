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
      isActive: true,
      $or: [
        { createdBy: session.user.id },
        { 'members.user': session.user.id },
      ],
    })
      .populate({
        path: 'members.user',
        model: 'User',
        select: 'name email image',
      })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    const transformedGroups = groups.map(group => {
      const groupObj = group.toObject();
      
      const formattedCreatedBy = groupObj.createdBy ? {
        _id: groupObj.createdBy._id,
        name: groupObj.createdBy.name,
        email: groupObj.createdBy.email
      } : null;
      
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
      
      return {
        ...groupObj,
        createdBy: formattedCreatedBy,
        members: formattedMembers,
        memberCount: formattedMembers.length
      };
    });

    return NextResponse.json(transformedGroups);
  } catch (error) {
    console.error('Get groups error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { name, description } = await req.json();
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ message: 'Group name is required' }, { status: 400 });
    }

    await connectDB();
    const newGroup = await Group.create({
      name,
      description,
      createdBy: session.user.id,
      members: [
        {
          user: session.user.id,
          amount: 0,
          joinedAt: new Date()
        }
      ],
      totalExpenses: 0,
      isActive: true,
      createdAt: new Date()
    });

    await User.findByIdAndUpdate(session.user.id, {
      $push: { groups: newGroup._id },
    });

    return NextResponse.json(newGroup, { status: 201 });
  } catch (error) {
    console.error('Create group error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}