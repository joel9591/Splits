// I:\New folder-Splits\lib\types.ts
import { Document, Types } from 'mongoose'; // Import Document and Types from mongoose

// --- User Interface ---
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider: 'credentials' | 'google';
  phone?: string;
  upi?: string;
  groups: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  resetToken?: string;
  resetTokenExpiry?: number;
}

// --- Group Member Interfaces ---
export interface IGroupMemberUnpopulated {
  user: Types.ObjectId;
  amount: number;
  joinedAt: Date;
}

export interface IGroupMemberPopulated {
  user: IUser;
  amount: number;
  joinedAt: Date;
}

// --- Group Interface ---
export interface IGroup extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  createdBy: Types.ObjectId | IUser;
  members: (IGroupMemberUnpopulated | IGroupMemberPopulated)[];
  expenses: Types.ObjectId[];
  totalExpenses: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// --- Expense Interfaces ---
export interface ISplitDetail {
  user: Types.ObjectId;
  amount: number;
  isPaid: boolean;
}

export interface IExpense extends Document {
  _id: Types.ObjectId;
  description?: string;
  amount: number;
  paidBy: Types.ObjectId | IUser;
  group: Types.ObjectId;
  splitType: 'equal' | 'custom';
  splitDetails: ISplitDetail[];
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}


// --- Trip Plan Core Structure (shared by client and document) ---
export interface PlaceToVisit {
  name: string;
  description: string;
  link: string;
  photoUrl: string;
}

export interface HotelOption {
  name: string;
  location: string;
  price: string;
}

export interface RestaurantSuggestion {
  name: string;
  location: string;
}

export interface FuelStop {
  name: string;
  location: string;
}

export interface TripPlan { // This remains the base structure for the plan details
  tripTitle: string;
  placesToVisit: PlaceToVisit[];
  hotelsOnTheWay: HotelOption[];
  restaurantsOnTheWay: RestaurantSuggestion[];
  fuelStopsOnTheWay: FuelStop[];
  estimatedCost: string;
}

// ITripDocument: For your Mongoose Trip Model (backend only)
export interface ITripDocument extends Document, TripPlan {
  _id: Types.ObjectId; // MongoDB auto-generated ID, as ObjectId
  createdBy: Types.ObjectId; // User ID, as ObjectId
  pdfUrl: string;
  createdAt: Date; // Mongoose timestamps add these as Date objects
  updatedAt: Date; // Mongoose timestamps add these as Date objects
}

// ITripClient: For your frontend components (what the API sends as JSON)
export interface ITripClient extends TripPlan { // Does NOT extend Document
  _id: string; // MongoDB ID as a string (from JSON)
  createdBy: string; // User ID as a string (from JSON)
  pdfUrl: string;
  createdAt: string; // Dates as ISO strings from JSON
  updatedAt: string; // Dates as ISO strings from JSON
}

// Response structure from generate-trip API
// This represents the full JSON response your frontend receives
export interface ApiResponse {
  tripPlan: TripPlan; // The core AI-generated plan structure
  pdfId: string; // The UUID for the PDF file
  pdfUrl: string; // The full public URL to the PDF
  _id: string; // The ID of the saved trip in the database (as a string)
  createdBy: string; // The createdBy user ID (as a string)
  createdAt: string; // The creation timestamp (as an ISO string)
  updatedAt: string; // The last update timestamp (as an ISO string)
}

// You can remove your `IMember` interface from here if it's only in `models/Member.ts`
// If it's used elsewhere in shared types, keep it but ensure consistency.
// The `models/Member.ts` content you provided is fine as a model definition.