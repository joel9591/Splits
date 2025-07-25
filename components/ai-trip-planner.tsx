"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download, Loader2, Calendar as CalendarIcon, Plane } from "lucide-react";
import { cn } from "@/lib/utils";


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
    image: "https://images.unsplash.com/photo-1605649461111-4a6c73be256f",
  },
];

export default function AiTripPlanner() {
  const [prompt, setPrompt] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [members, setMembers] = useState<number>(2);
  const [startLocation, setStartLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt || !startDate || !endDate || !members || !startLocation) {
      alert("Please fill all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This would be replaced with an actual API call to an AI service
      // For now, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response
      setTripPlan({
        route: `${startLocation} → Waypoint 1 → Waypoint 2 → Destination → ${startLocation}`,
        places: ["Tourist Spot 1", "Tourist Spot 2", "Tourist Spot 3", "Tourist Spot 4"],
        hotels: ["Luxury Hotel", "Budget Stay", "Beachside Resort"],
        restaurants: ["Local Cuisine Restaurant", "Fine Dining Experience", "Street Food Market"],
        fuelStops: ["Fuel Station 1", "Fuel Station 2"],
        estimatedCost: members * 5000, // Simple calculation based on members
        additionalInfo: "Best time to visit these places is during mornings. Carry sunscreen and comfortable footwear."
      });
    } catch (error) {
      console.error("Error generating trip plan:", error);
      alert("Failed to generate trip plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPdf = () => {
    // In a real implementation, this would generate and download a PDF
    alert("PDF download functionality would be implemented here");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Plan Your Trip with AI</h2>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Input
                  placeholder="Where do you want to go? (e.g., I want to go to Goa with my friends)"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-4 text-lg"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? startDate.toLocaleDateString() : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
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
                  <label className="text-sm font-medium">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? endDate.toLocaleDateString() : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
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
                  <label className="text-sm font-medium">Number of People</label>
                  <Input
                    type="number"
                    min="1"
                    value={members}
                    onChange={(e) => setMembers(parseInt(e.target.value) || 1)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Starting Location</label>
                  <Input
                    placeholder="Enter your starting point"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                  />
                </div>
              </div>
              
              <Button
  type="submit"
  className="
    relative 
    overflow-hidden w-full md:w-auto md:px-8 mt-4 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300 group animated-button 
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
      <Plane className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" /> {/* Attractive icon */}
      Generate Trip Plan
    </span>
  )}

  {/* Multicolor Borders - These will be animated */}
  <span className="button-border border-top"></span>
  <span className="button-border border-right"></span>
  <span className="button-border border-bottom"></span>
  <span className="button-border border-left"></span>
</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {tripPlan ? (
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader>
            <CardTitle>Your AI Generated Trip Plan</CardTitle>
            <CardDescription>
              Based on your preferences, here's a customized trip plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Route</h3>
              <p>{tripPlan.route}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Places to Visit</h3>
              <ul className="list-disc pl-5">
                {tripPlan.places.map((place, index) => (
                  <li key={index}>{place}</li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Recommended Hotels</h3>
                <ul className="list-disc pl-5">
                  {tripPlan.hotels.map((hotel, index) => (
                    <li key={index}>{hotel}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Restaurants</h3>
                <ul className="list-disc pl-5">
                  {tripPlan.restaurants.map((restaurant, index) => (
                    <li key={index}>{restaurant}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Fuel Stops</h3>
                <ul className="list-disc pl-5">
                  {tripPlan.fuelStops.map((stop, index) => (
                    <li key={index}>{stop}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Estimated Cost</h3>
              <p className="text-2xl font-bold">₹{tripPlan.estimatedCost.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">For {members} {members === 1 ? 'person' : 'people'}</p>
            </div>
            
            {tripPlan.additionalInfo && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
                <p>{tripPlan.additionalInfo}</p>
              </div>
            )}
            
            <Button onClick={downloadPdf} className="mt-4">
              <Download className="mr-2 h-4 w-4" />
              Download as PDF
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <h3 className="text-xl font-semibold col-span-full mb-2">Explore Pre-planned Trips</h3>
          
          {presetTrips.map((trip, index) => (
            <Card key={index} className="overflow-hidden">
              <div 
                className="h-40 bg-cover bg-center" 
                style={{ backgroundImage: `url(${trip.image})` }}
              />
              <CardHeader>
                <CardTitle>{trip.title}</CardTitle>
                <CardDescription>{trip.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}