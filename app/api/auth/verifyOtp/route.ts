import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();
    console.log(email, otp);

    await connectDB();
    const user = await User.findOne({ email });

    if (!user || user.resetToken !== otp) {
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
    }

    if (Date.now() > user.resetTokenExpiry) {
      return NextResponse.json({ message: 'OTP expired' }, { status: 400 });
    }

    // OTP verified successfully
    return NextResponse.json({ message: 'OTP verified' }, { status: 200 });
  } catch (err) {
    console.error('[VERIFY_OTP_ERROR]', err);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
