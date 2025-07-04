import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  amount: number;
  expense?: mongoose.Types.ObjectId;
  group: mongoose.Types.ObjectId;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: 'stripe' | 'manual';
  stripePaymentId?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  expense: {
    type: Schema.Types.ObjectId,
    ref: 'Expense',
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'manual'],
    default: 'manual',
  },
  stripePaymentId: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);