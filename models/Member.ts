import mongoose, { Document, Schema } from 'mongoose';

export interface IMember extends Document {
  name: string;
  email?: string;
  phone: string;
  upiId?: string;
  amount: Number;
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema = new Schema<IMember>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  upiId: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    min: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Member || mongoose.model<IMember>('Member', MemberSchema);
