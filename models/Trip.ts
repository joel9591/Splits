// import mongoose, { Document, Schema } from 'mongoose';

// // Define sub-schemas for the nested objects in our trip plan

// const PlaceSchema = new Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   link: { type: String, required: true },
//   photoUrl: { type: String, required: true },
// }, { _id: false });

// const HotelSchema = new Schema({
//   name: { type: String, required: true },
//   location: { type: String, required: true },
//   price: { type: String, required: true },
// }, { _id: false });

// const RestaurantSchema = new Schema({
//   name: { type: String, required: true },
//   location: { type: String, required: true },
// }, { _id: false });

// const FuelStopSchema = new Schema({
//   name: { type: String, required: true },
//   location: { type: String, required: true },
// }, { _id: false });


// // Define the main Trip interface
// export interface ITrip extends Document {
//   tripTitle: string;
//   placesToVisit: Array<typeof PlaceSchema.obj>;
//   hotelsOnTheWay: Array<typeof HotelSchema.obj>;
//   restaurantsOnTheWay: Array<typeof RestaurantSchema.obj>;
//   fuelStopsOnTheWay: Array<typeof FuelStopSchema.obj>;
//   estimatedCost: string;
//   createdBy: mongoose.Types.ObjectId;
//   pdfUrl: string; // We'll store the path to the PDF, not the file itself
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Define the main Trip schema
// const TripSchema = new Schema<ITrip>({
//   tripTitle: { type: String, required: true },
//   placesToVisit: [PlaceSchema],
//   hotelsOnTheWay: [HotelSchema],
//   restaurantsOnTheWay: [RestaurantSchema],
//   fuelStopsOnTheWay: [FuelStopSchema],
//   estimatedCost: { type: String, required: true },
//   createdBy: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   pdfUrl: {
//     type: String,
//     required: true,
//   },
// }, {
//   timestamps: true,
// });

// export default mongoose.models.Trip || mongoose.model<ITrip>('Trip', TripSchema);

// I:\New folder-Splits\models\Trip.ts (Example - verify yours matches)
import mongoose, { Schema } from 'mongoose';
import { ITripDocument } from '@/lib/types'; // Import the correct interface for the Mongoose model

const TripSchema = new Schema<ITripDocument>({
  tripTitle: { type: String, required: true },
  placesToVisit: [{
    name: String,
    description: String,
    link: String,
    photoUrl: String,
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
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // This must be ObjectId
  pdfUrl: { type: String, required: true },
}, { timestamps: true }); // Mongoose timestamps will automatically add createdAt and updatedAt

export default mongoose.models.Trip || mongoose.model<ITripDocument>('Trip', TripSchema);