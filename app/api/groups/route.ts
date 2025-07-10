import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Group from '@/models/Group';
import User from '@/models/User';
import Member from '@/models/Member'; // ✅ Required for populating

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
        model: 'Member',
        select: 'name email amount', // ✅ Include 'amount' field for frontend
      })
      .sort({ createdAt: -1 });

    return NextResponse.json(groups);
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
      members: [], // no members initially
    });

    // ✅ Add this group to the User model
    await User.findByIdAndUpdate(session.user.id, {
      $push: { groups: newGroup._id },
    });

    return NextResponse.json(newGroup, { status: 201 });
  } catch (error) {
    console.error('Create group error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}