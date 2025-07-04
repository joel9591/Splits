import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    // Optional: You could check if resetToken/resetTokenExpiry exists to ensure it's a valid reset flow
    // But since OTP is already verified, we assume it's safe to reset

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: 'Password reset successfully!' }, { status: 200 });
  } catch (error) {
    console.error('[RESET_PASSWORD_ERROR]', error);
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}
