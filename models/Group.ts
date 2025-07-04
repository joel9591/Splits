import mongoose, { Document, Schema } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  description?: string;
  createdBy: mongoose.Types.ObjectId;
  members: {
    user: mongoose.Types.ObjectId;
    role: 'admin' | 'member';
    joinedAt: Date;
  }[];
  expenses: mongoose.Types.ObjectId[];
  totalExpenses: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'member'],
      default: 'member',
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  expenses: [{
    type: Schema.Types.ObjectId,
    ref: 'Expense',
  }],
  totalExpenses: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Group || mongoose.model<IGroup>('Group', GroupSchema);