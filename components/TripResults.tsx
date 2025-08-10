"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TripPlan } from "@/lib/types"; 
import { Download, Hotel, UtensilsCrossed, Fuel, MapPin, Landmark, Wallet } from "lucide-react";

interface TripResultsProps {
  tripPlan: TripPlan; 
  members: number;
  downloadPdf: () => void;
  pdfId: string | null; 
}

export default function TripResults({ tripPlan, members, downloadPdf, pdfId }: TripResultsProps) {
  return (
    <Card className="shadow-xl rounded-lg border-2 border-indigo-400 dark:border-indigo-600 animate-fade-in">
      <CardHeader className="bg-indigo-50 dark:bg-indigo-900/50 p-6 rounded-t-lg">
        <CardTitle className="text-indigo-800 dark:text-indigo-200 text-3xl font-bold">{tripPlan.tripTitle}</CardTitle>
        <CardDescription className="text-indigo-600 dark:text-indigo-300 mt-1 text-lg">Your personalized itinerary is ready!</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-8">

        <div>
          <h3 className="text-2xl font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-100"><Landmark className="inline-block mr-3 h-6 w-6 text-green-600" /> Must-Visit Places</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tripPlan.placesToVisit.map((place, index) => (
              <Card key={index} className="overflow-hidden group">
                <div className="relative h-48 w-full">
                  <Image src={place.photoUrl || "/placeholder-image.jpg"} alt={place.name} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105"/>
                </div>
                <CardHeader><CardTitle>{place.name}</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{place.description}</p>
                  <a href={place.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">View on Map <MapPin className="inline-block h-4 w-4 ml-1"/></a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center"><Hotel className="mr-2 h-5 w-5 text-blue-600" /> Hotels</h3>
              <ul className="space-y-2">
                {tripPlan.hotelsOnTheWay.map((hotel, index) => (
                  <li key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md"><strong>{hotel.name}</strong> ({hotel.location}) - <span className="font-mono">{hotel.price}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center"><UtensilsCrossed className="mr-2 h-5 w-5 text-red-600" /> Restaurants</h3>
              <ul className="space-y-2">
                {tripPlan.restaurantsOnTheWay.map((item, index) => (
                  <li key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md"><strong>{item.name}</strong> - {item.location}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center"><Fuel className="mr-2 h-5 w-5 text-yellow-600" /> Fuel Stops</h3>
              <ul className="space-y-2">
                {tripPlan.fuelStopsOnTheWay.map((item, index) => (
                  <li key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md"><strong>{item.name}</strong> - {item.location}</li>
                ))}
              </ul>
            </div>
        </div>

       
        <div className="bg-indigo-100 dark:bg-indigo-900/50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2 text-indigo-800 dark:text-indigo-200 flex items-center justify-center"><Wallet className="mr-2 h-6 w-6"/> Estimated Trip Cost</h3>
            <p className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300">{tripPlan.estimatedCost}</p>
            <p className="text-sm text-indigo-500 dark:text-indigo-400 mt-1">For {members} {members === 1 ? "person" : "people"}</p>
        </div>

        
        <Button onClick={downloadPdf} disabled={!pdfId} className="w-full py-3 text-lg bg-green-600 hover:bg-green-700">
          <Download className="mr-2 h-5 w-5" /> Download Plan as PDF
        </Button>
      </CardContent>
    </Card>
  );
}