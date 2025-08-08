import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  console.log('[Signup] Request received');
  try {
    const { name, email, password } = await request.json();
    console.log('[Signup] Request data:', { name, email });

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();
    console.log('[Signup] Database connected');

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    console.log('[Signup] Existing user check:', !!existingUser);
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: 'credentials',
    });
    console.log('[Signup] User created successfully:', user._id);
    console.log('[Signup] User created successfully:', user);
    return NextResponse.json(
      { message: 'User created successfully', userId: user._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}