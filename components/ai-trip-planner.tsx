"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  Loader2,
  Calendar as CalendarIcon,
  Plane,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface TripPlan {
  route: string;
  places: string[];
  hotels: string[];
  restaurants: string[];
  fuelStops: string[];
  estimatedCost: number;
  additionalInfo?: string;
}

const presetTrips = [
  {
    title: "Beach Getaway",
    description: "Relaxing weekend at the most beautiful beaches",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    title: "Mountain Adventure",
    description: "Thrilling hikes and breathtaking views",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  {
    title: "City Exploration",
    description: "Discover hidden gems in vibrant cities",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
  },
  {
    title: "Cultural Journey",
    description: "Immerse yourself in local traditions and history",
    image:
      "https://www.shutterstock.com/image-photo/woman-backpack-exploring-bali-indonesia-600nw-1924363112.jpg",
  },
];

export default function AiTripPlanner() {
  const [prompt, setPrompt] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [members, setMembers] = useState<number>();
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [tripType, setTripType] = useState<string>(""); // New state for trip type
  const [isLoading, setIsLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      !prompt ||
      !startDate ||
      !endDate ||
      !members ||
      !startLocation ||
      !endLocation ||
      !tripType
    ) {
      toast.error("Please fill all the details");
      setIsLoading(false);
      return;
    }
    try {
      setTimeout(() => {
        console.log("Prompt: ", prompt);
        console.log("Start Date: ", startDate);
        console.log("End Date: ", endDate);
        console.log("Members: ", members);
        console.log("Start Location:", startLocation);
        console.log("End Location:", endLocation);
        console.log("Trip Type:", tripType);

        // Simulate a generated trip plan
        setTripPlan({
          route: `${startLocation} to ${endLocation}`,
          places: ["Attraction A", "Attraction B", "Attraction C"],
          hotels: ["Hotel X", "Hotel Y"],
          restaurants: ["Restaurant P", "Restaurant Q"],
          fuelStops: ["Fuel Station 1", "Fuel Station 2"],
          estimatedCost: 15000 * members,
          additionalInfo:
            "Enjoy your personalized trip! Remember to book flights and accommodations in advance.",
        });
        console.log("this is your generated trip plan: ", tripPlan);
        setIsLoading(false);
        toast.success("Trip plan generated successfully!");
      }, 3000);
    } catch (error) {
      console.error("Error generating trip plan:", error);
      toast.error("Failed to generate trip plan. Please try again.");
    }
  };

  const downloadPdf = () => {
    // In a real implementation, this would generate and download a PDF
    toast.info("PDF download functionality is not yet implemented.");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 dark:text-gray-100">
        <Plane className="inline-block mr-3 h-8 w-8 text-indigo-600" /> AI Trip
        Planner
      </h1>
      <Card className="mb-12 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-t-lg">
          <CardTitle className="text-white text-2xl font-bold">
            Craft Your Perfect Journey
          </CardTitle>
          <CardDescription className="text-indigo-100 mt-1">
            Tell us about your dream trip, and we'll handle the details.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="prompt"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Your Trip Vision
              </label>
              <Input
                id="prompt"
                placeholder="e.g., I want to go to Goa with my friends for a relaxing beach trip."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="startDate"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Start Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="startDate"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal p-3 border border-gray-300 rounded-md hover:bg-gray-50",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                      {startDate ? (
                        startDate.toLocaleDateString()
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="endDate"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  End Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="endDate"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal p-3 border border-gray-300 rounded-md hover:bg-gray-50",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                      {endDate ? (
                        endDate.toLocaleDateString()
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="members"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Number of People
                </label>
                <Input
                  id="members"
                  type="number"
                  min="1"
                  value={members}
                  onChange={(e) => setMembers(parseInt(e.target.value) || 1)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="tripType"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Who are you traveling with?
                </label>
                <Select value={tripType} onValueChange={setTripType}>
                  <SelectTrigger
                    id="tripType"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <SelectValue placeholder="Select trip type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friends">Friends</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="couple">Couple</SelectItem>
                    <SelectItem value="single">Single</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="startLocation"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Departure Location
                </label>
                <Input
                  id="startLocation"
                  placeholder="Your starting point"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="endLocation"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Arrival Location
                </label>
                <Input
                  id="endLocation"
                  placeholder="Your destination"
                  value={endLocation}
                  onChange={(e) => setEndLocation(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="
    relative 
    overflow-hidden w-full lg:w-full md:w-auto md:px-8 mt-4 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300 group animated-button 
  "
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin text-white" />
                    Generating Plan...
                  </span>
                </>
              ) : (
                <span className="flex items-center justify-center">
                  <Plane className="mr-2 h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />{" "}
                  {/* Attractive icon */}
                  Generate Trip Plan
                </span>
              )}

              {/* Multicolor Borders - These will be animated */}
              <span className="button-border border-top"></span>
              <span className="button-border border-right"></span>
              <span className="button-border border-bottom"></span>
              <span className="button-border border-left"></span>
            </Button>
          </form>
        </CardContent>
      </Card>
      {tripPlan ? (
        <Card className="mb-8 shadow-xl rounded-lg border-2 border-indigo-400 dark:border-indigo-600">
          <CardHeader className="bg-indigo-50 dark:bg-indigo-900 p-6 rounded-t-lg">
            <CardTitle className="text-indigo-800 dark:text-indigo-200 text-2xl font-bold">
              Your AI Generated Trip Plan
            </CardTitle>
            <CardDescription className="text-indigo-600 dark:text-indigo-300 mt-1">
              Based on your preferences, here's a customized trip plan just for
              you!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                <Plane className="inline-block mr-2 h-5 w-5 text-purple-600" />{" "}
                Route Overview
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-md border border-gray-200 dark:border-gray-600">
                {tripPlan.route}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                <Plane className="inline-block mr-2 h-5 w-5 text-green-600" />{" "}
                Must-Visit Places
              </h3>
              <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
                {tripPlan.places.map((place, index) => (
                  <li
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600"
                  >
                    {place}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  <Plane className="inline-block mr-2 h-5 w-5 text-blue-600" />{" "}
                  Recommended Hotels
                </h3>
                <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
                  {tripPlan.hotels.map((hotel, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600"
                    >
                      {hotel}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  <Plane className="inline-block mr-2 h-5 w-5 text-red-600" />{" "}
                  Top Restaurants
                </h3>
                <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
                  {tripPlan.restaurants.map((restaurant, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600"
                    >
                      {restaurant}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  <Plane className="inline-block mr-2 h-5 w-5 text-yellow-600" />{" "}
                  Fuel Stops
                </h3>
                <ul className="list-disc pl-8 space-y-2 text-gray-700 dark:text-gray-300">
                  {tripPlan.fuelStops.map((stop, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600"
                    >
                      {stop}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-indigo-100 dark:bg-indigo-950 p-5 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <h3 className="text-xl font-semibold mb-2 text-indigo-800 dark:text-indigo-200">
                Estimated Cost
              </h3>
              <p className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300">
                ₹{tripPlan.estimatedCost.toLocaleString()}
              </p>
              <p className="text-sm text-indigo-500 dark:text-indigo-400 mt-1">
                For {members} {members === 1 ? "person" : "people"}
              </p>
            </div>

            {tripPlan.additionalInfo && (
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">
                  <Plane className="inline-block mr-2 h-5 w-5 text-teal-600" />{" "}
                  Additional Information
                </h3>
                <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-md border border-gray-200 dark:border-gray-600">
                  {tripPlan.additionalInfo}
                </p>
              </div>
            )}

            <Button
              onClick={downloadPdf}
              className="mt-6 w-full py-3 px-6 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700 transition-colors duration-300 ease-in-out shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <Download className="mr-2 h-5 w-5" />
              Download as PDF
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
            Or, Explore Our Pre-Planned Adventures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {presetTrips.map((trip, index) => (
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
                    className="w-full border-indigo-500 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
