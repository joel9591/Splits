import mongoose, { Schema } from 'mongoose';
import { ITripDocument } from '@/lib/types'; 

const TripSchema = new Schema<ITripDocument>({
  tripTitle: { type: String, required: true },
  placesToVisit: [{
    name: String,
    description: String,
    link: String,
    // photoUrl field is still in schema but we're not using it
  }],
  hotelsOnTheWay: [{
    name: String,
    location: String,
    price: String,
  }],
  restaurantsOnTheWay: [{
    name: String,
    location: String,
  }],
  fuelStopsOnTheWay: [{
    name: String,
    location: String,
  }],
  estimatedCost: { type: String, required: true },
  budget: { type: String, enum: ['low', 'medium', 'high', 'custom'] },
  customBudgetAmount: { type: Number },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pdfUrl: { type: String, required: true },
  pdfData: { type: Buffer }, // Added field to store PDF data directly in the database
}, { timestamps: true });

export default mongoose.models.Trip || mongoose.model<ITripDocument>('Trip', TripSchema);