"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const presetTripsData = [
  {
    title: "Beach Getaway",
    description: "Relaxing weekend at the most beautiful beaches.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    title: "Mountain Adventure",
    description: "Thrilling hikes and breathtaking views.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  {
    title: "City Exploration",
    description: "Discover hidden gems in vibrant cities.",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
  },
  {
    title: "Cultural Journey",
    description: "Immerse yourself in local traditions and history.",
    image: "https://www.shutterstock.com/image-photo/asian-woman-traveller-take-photo-600nw-2262818911.jpg",
  },
];

export default function PresetTrips() {
  return (
    <div className="mt-12 animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
        Explore Our Pre-Planned Adventures
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {presetTripsData.map((trip, index) => (
          <Card
            key={index}
            className="overflow-hidden shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${trip.image})` }}
            />
            <CardHeader className="p-4">
              <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {trip.title}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">
                {trip.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Button
                variant="outline"
                className="w-full border-indigo-500 text-indigo-600 hover:bg-gray-700 hover:text-indigo-200 transition-colors duration-200"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
