import { Document, Types } from 'mongoose'; 


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



export interface PlaceToVisit {
  name: string;
  description: string;
  link: string;
  photoUrl?: string;
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

export interface TripPlan { 
  tripTitle: string;
  placesToVisit: PlaceToVisit[];
  hotelsOnTheWay: HotelOption[];
  restaurantsOnTheWay: RestaurantSuggestion[];
  fuelStopsOnTheWay: FuelStop[];
  estimatedCost: string;
  budget?: 'low' | 'medium' | 'high' | 'custom';
  customBudgetAmount?: number;
}


export interface ITripDocument extends Document, TripPlan {
  _id: Types.ObjectId; 
  createdBy: Types.ObjectId; 
  pdfUrl: string;
  pdfData?: Buffer; // Added field to match the Trip model
  createdAt: Date; 
  updatedAt: Date; 
}


export interface ITripClient extends TripPlan { 
  _id: string; 
  createdBy: string; 
  pdfUrl: string;
  createdAt: string; 
  updatedAt: string; 
}


export interface ApiResponse {
  tripPlan: TripPlan; 
  pdfId: string; 
  pdfUrl: string; 
  _id: string; 
  createdBy: string; 
  createdAt: string; 
  updatedAt: string; 
}

