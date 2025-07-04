import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'No user with this email' }, { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 min expiry

    user.resetToken = otp;
    user.resetTokenExpiry = otpExpiry;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Your OTP for Password Reset - Splits',
      html: `
        <p>Hello,</p>
        <p>Your OTP to reset your Splits password is:</p>
        <h2>${otp}</h2>
        <p>This OTP will expire in 10 minutes.</p>
      `,
    });

    return NextResponse.json({ message: 'OTP sent to email' }, { status: 200 });
  } catch (err) {
    console.error('[OTP_ERROR]', err);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
