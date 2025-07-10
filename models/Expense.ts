import mongoose, { Document, Schema } from 'mongoose';

export interface ISplitDetail {
  user: mongoose.Types.ObjectId;
  amount: number;
  isPaid: boolean;
}

export interface IExpense extends Document {
  description?: string;
  amount: number;
  paidBy: mongoose.Types.ObjectId;
  group: mongoose.Types.ObjectId;
  splitType: 'equal' | 'custom';
  splitDetails: ISplitDetail[];
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema = new Schema<IExpense>({
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
    ref: 'Member',
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
  splitDetails: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'Member', // ✅ Must match model name
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      isPaid: {
        type: Boolean,
        default: false,
      },
    },
  ],
  category: {
    type: String,
    default: 'General',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);
