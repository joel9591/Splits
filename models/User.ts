import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider: 'credentials' | 'google';
  phone?: string;
  upi?: string;
  groups: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  resetToken?: string;
  resetTokenExpiry?: number;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === 'credentials';
      },
    },
    image: {
      type: String,
      default: '',
    },
    provider: {
      type: String,
      enum: ['credentials', 'google'],
      default: 'credentials',
    },
    phone: {
      type: String,
      trim: true,
    },
    upi: {
      type: String,
      trim: true,
    },
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Group',
      },
    ],
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
