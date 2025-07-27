// I:\New folder-Splits\lib\types.ts

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

export interface TripPlan {
  tripTitle: string;
  placesToVisit: PlaceToVisit[];
  hotelsOnTheWay: HotelOption[];
  restaurantsOnTheWay: RestaurantSuggestion[];
  fuelStopsOnTheWay: FuelStop[];
  estimatedCost: string;
}

// Interface for the data saved in the database
export interface ITrip extends TripPlan {
  _id?: string; // MongoDB auto-generated ID
  createdBy: string; // User ID
  pdfUrl: string;
  createdAt?: string; // Optional, handled by Mongoose timestamps
  updatedAt?: string; // Optional, handled by Mongoose timestamps
}

// Response structure from generate-trip API
export interface ApiResponse {
  tripPlan: TripPlan;
  pdfId: string; // The UUID for the PDF file
  pdfUrl: string; // The full public URL to the PDF
  _id: string; // The ID of the saved trip in the database
}