import mongoose, { Document, Schema } from 'mongoose';

export interface IExpense extends Document {
  title: string;
  description?: string;
  amount: number;
  paidBy: mongoose.Types.ObjectId;
  group: mongoose.Types.ObjectId;
  splitType: 'equal' | 'custom';
  splitDetails: {
    user: mongoose.Types.ObjectId;
    amount: number;
    isPaid: boolean;
  }[];
  category: string;
  date: Date;
  receipts: string[];
  isSettled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  paidBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  splitType: {
    type: String,
    enum: ['equal', 'custom'],
    default: 'equal',
  },
  splitDetails: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  }],
  category: {
    type: String,
    default: 'General',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  receipts: [String],
  isSettled: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);