// //ai-trip-planner.tsx
// "use client";

// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Download,
//   Loader2,
//   Calendar as CalendarIcon,
//   Plane,
//   Hotel,
//   UtensilsCrossed,
//   Fuel,
//   MapPin,
//   Landmark,
//   Wallet,
//   Info,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";
// import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
// import Image from "next/image";
// import { TripPlan, ApiResponse } from "@/lib/types"; // Import our shared types


// export default function AiTripPlanner() {
//   const [prompt, setPrompt] = useState("");
//   const [startDate, setStartDate] = useState<Date>();
//   const [endDate, setEndDate] = useState<Date>();
//   const [members, setMembers] = useState<number>(1);
//   const [startLocation, setStartLocation] = useState("");
//   const [endLocation, setEndLocation] = useState("");
//   const [tripType, setTripType] = useState<string>("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
//   const [pdfId, setPdfId] = useState<string | null>(null);

//   const startLocationSearchBoxRef = useRef<google.maps.places.SearchBox | null>(
//     null
//   );
//   const endLocationSearchBoxRef = useRef<google.maps.places.SearchBox | null>(
//     null
//   );

//   const { isLoaded, loadError } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: process.env.NEXT_PUBLIC_Maps_API_KEY ?? "",
//     libraries: ["places"],
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (
//       !prompt || !startDate || !endDate || !members ||
//       !startLocation || !endLocation || !tripType
//     ) {
//       toast.error("Please fill all the details to generate your trip plan.");
//       return;
//     }
//     setIsLoading(true);
//     setTripPlan(null);
//     setPdfId(null);

//     try {
//       const response = await fetch("/api/generate-trip", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           prompt,
//           startDate: startDate.toISOString().split("T")[0],
//           endDate: endDate.toISOString().split("T")[0],
//           members,
//           startLocation,
//           endLocation,
//           tripType,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Something went wrong");
//       }

//       const result: ApiResponse = await response.json();
//       setTripPlan(result.tripPlan);
//       setPdfId(result.pdfId);
//       toast.success("Your amazing trip plan has been generated!");
//     } catch (error: any) {
//       console.error("Error generating trip plan:", error);
//       toast.error(error.message || "Failed to generate trip plan.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const downloadPdf = () => {
//     if (!pdfId) {
//       toast.error("No PDF available to download.");
//       return;
//     }
//     // Open the download link in a new tab
//     window.open(`/api/download-pdf?id=${pdfId}`, "_blank");
//   };

//   const onStartLocationLoad = (ref: google.maps.places.SearchBox) => {
//     startLocationSearchBoxRef.current = ref;
//   };
//   const onStartLocationPlacesChanged = () => {
//     const places = startLocationSearchBoxRef.current?.getPlaces();
//     if (places && places.length > 0) {
//       setStartLocation(places[0].formatted_address || places[0].name || "");
//     }
//   };
//   const onEndLocationLoad = (ref: google.maps.places.SearchBox) => {
//     endLocationSearchBoxRef.current = ref;
//   };
//   const onEndLocationPlacesChanged = () => {
//     const places = endLocationSearchBoxRef.current?.getPlaces();
//     if (places && places.length > 0) {
//       setEndLocation(places[0].formatted_address || places[0].name || "");
//     }
//   };

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded) return <div>Loading Maps...</div>;

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-7xl">
//       <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 dark:text-gray-100">
//         <Plane className="inline-block mr-3 h-8 w-8 text-indigo-600" /> AI Trip
//         Planner
//       </h1>
//       <Card className="mb-12 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
//         <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-t-lg">
//           <CardTitle className="text-white text-2xl font-bold">
//             Craft Your Perfect Journey
//           </CardTitle>
//           <CardDescription className="text-indigo-100 mt-1">
//             Tell us about your dream trip, and we'll handle the details.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="p-6">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <label
//                 htmlFor="prompt"
//                 className="text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 Your Trip Vision
//               </label>
//               <Input
//                 id="prompt"
//                 placeholder="e.g., I want to go to Goa with my friends for a relaxing beach trip."
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
//               />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="space-y-2">
//                 <label
//                   htmlFor="startDate"
//                   className="text-sm font-medium text-gray-700 dark:text-gray-300"
//                 >
//                   Start Date
//                 </label>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button
//                       id="startDate"
//                       variant={"outline"}
//                       className={cn(
//                         "w-full justify-start text-left font-normal p-3 border border-gray-300 rounded-md hover:bg-gray-50",
//                         !startDate && "text-muted-foreground"
//                       )}
//                     >
//                       <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
//                       {startDate ? (
//                         startDate.toLocaleDateString()
//                       ) : (
//                         <span>Pick a date</span>
//                       )}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 rounded-md shadow-lg">
//                     <Calendar
//                       mode="single"
//                       selected={startDate}
//                       onSelect={setStartDate}
//                       initialFocus
//                     />
//                   </PopoverContent>
//                 </Popover>
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="endDate"
//                   className="text-sm font-medium text-gray-700 dark:text-gray-300"
//                 >
//                   End Date
//                 </label>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button
//                       id="endDate"
//                       variant={"outline"}
//                       className={cn(
//                         "w-full justify-start text-left font-normal p-3 border border-gray-300 rounded-md hover:bg-gray-50",
//                         !endDate && "text-muted-foreground"
//                       )}
//                     >
//                       <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
//                       {endDate ? (
//                         endDate.toLocaleDateString()
//                       ) : (
//                         <span>Pick a date</span>
//                       )}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 rounded-md shadow-lg">
//                     <Calendar
//                       mode="single"
//                       selected={endDate}
//                       onSelect={setEndDate}
//                       initialFocus
//                     />
//                   </PopoverContent>
//                 </Popover>
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="members"
//                   className="text-sm font-medium text-gray-700 dark:text-gray-300"
//                 >
//                   Number of People
//                 </label>
//                 <Input
//                   id="members"
//                   type="number"
//                   min="1"
//                   value={members}
//                   onChange={(e) => setMembers(parseInt(e.target.value) || 1)}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="tripType"
//                   className="text-sm font-medium text-gray-700 dark:text-gray-300"
//                 >
//                   Who are you traveling with?
//                 </label>
//                 <Select value={tripType} onValueChange={setTripType}>
//                   <SelectTrigger
//                     id="tripType"
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//                   >
//                     <SelectValue placeholder="Select trip type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="friends">Friends</SelectItem>
//                     <SelectItem value="family">Family</SelectItem>
//                     <SelectItem value="couple">Couple</SelectItem>
//                     <SelectItem value="single">Single</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label
//                   htmlFor="startLocation"
//                   className="text-sm font-medium text-gray-700 dark:text-gray-300"
//                 >
//                   Departure Location
//                 </label>
//                 <StandaloneSearchBox
//                   onLoad={onStartLocationLoad}
//                   onPlacesChanged={onStartLocationPlacesChanged}
//                 >
//                   <Input
//                     id="startLocation"
//                     placeholder="Your starting point"
//                     value={startLocation}
//                     onChange={(e) => setStartLocation(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
//                   />
//                 </StandaloneSearchBox>
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="endLocation"
//                   className="text-sm font-medium text-gray-700 dark:text-gray-300"
//                 >
//                   Arrival Location
//                 </label>
//                 <StandaloneSearchBox
//                   onLoad={onEndLocationLoad}
//                   onPlacesChanged={onEndLocationPlacesChanged}
//                 >
//                   <Input
//                     id="endLocation"
//                     placeholder="Your destination"
//                     value={endLocation}
//                     onChange={(e) => setEndLocation(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 ease-in-out"
//                   />
//                 </StandaloneSearchBox>
//               </div>
//             </div>

//             <Button
//               type="submit"
//               className="
//     relative
//     overflow-hidden w-full lg:w-full md:px-8 mt-4 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-300 group animated-button md:w-full
//   "
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <span className="flex items-center justify-center">
//                     <Loader2 className="mr-2 h-5 w-5 animate-spin text-white" />
//                     Generating Plan...
//                   </span>
//                 </>
//               ) : (
//                 <span className="flex items-center justify-center">
//                   <Plane className="mr-2 h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />{" "}
//                   Generate Trip Plan
//                 </span>
//               )}

//               <span className="button-border border-top"></span>
//               <span className="button-border border-right"></span>
//               <span className="button-border border-bottom"></span>
//               <span className="button-border border-left"></span>
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//       {tripPlan && (
//         <Card className="mt-12 shadow-xl rounded-lg border-2 border-indigo-400 dark:border-indigo-600 animate-fade-in">
//           <CardHeader className="bg-indigo-50 dark:bg-indigo-900/50 p-6 rounded-t-lg">
//             <CardTitle className="text-indigo-800 dark:text-indigo-200 text-3xl font-bold">
//               {tripPlan.tripTitle}
//             </CardTitle>
//             <CardDescription className="text-indigo-600 dark:text-indigo-300 mt-1 text-lg">
//               Your personalized itinerary is ready!
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="p-6 space-y-8">
            
//             {/* Places to Visit */}
//             <div>
//               <h3 className="text-2xl font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-100">
//                 <Landmark className="inline-block mr-3 h-6 w-6 text-green-600" />
//                 Must-Visit Places
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {tripPlan.placesToVisit.map((place, index) => (
//                   <Card key={index} className="overflow-hidden group">
//                     <div className="relative h-48 w-full">
//                        <Image src={place.photoUrl} alt={place.name} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105"/>
//                     </div>
//                     <CardHeader>
//                       <CardTitle>{place.name}</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <p className="text-gray-600 dark:text-gray-400 mb-4">{place.description}</p>
//                       <a href={place.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
//                         View on Map <MapPin className="inline-block h-4 w-4 ml-1"/>
//                       </a>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>

//             {/* Hotels, Restaurants, Fuel Stops */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                <div>
//                  <h3 className="text-xl font-semibold mb-3 flex items-center"><Hotel className="mr-2 h-5 w-5 text-blue-600" /> Hotels</h3>
//                  <ul className="space-y-2">
//                    {tripPlan.hotelsOnTheWay.map((hotel, index) => (
//                      <li key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md"><strong>{hotel.name}</strong> ({hotel.location}) - <span className="font-mono">{hotel.price}</span></li>
//                    ))}
//                  </ul>
//                </div>
//                <div>
//                  <h3 className="text-xl font-semibold mb-3 flex items-center"><UtensilsCrossed className="mr-2 h-5 w-5 text-red-600" /> Restaurants</h3>
//                  <ul className="space-y-2">
//                    {tripPlan.restaurantsOnTheWay.map((item, index) => (
//                      <li key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md"><strong>{item.name}</strong> - {item.location}</li>
//                    ))}
//                  </ul>
//                </div>
//                <div>
//                  <h3 className="text-xl font-semibold mb-3 flex items-center"><Fuel className="mr-2 h-5 w-5 text-yellow-600" /> Fuel Stops</h3>
//                  <ul className="space-y-2">
//                    {tripPlan.fuelStopsOnTheWay.map((item, index) => (
//                      <li key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md"><strong>{item.name}</strong> - {item.location}</li>
//                    ))}
//                  </ul>
//                </div>
//             </div>

//             {/* Estimated Cost */}
//             <div className="bg-indigo-100 dark:bg-indigo-900/50 p-6 rounded-lg text-center">
//               <h3 className="text-xl font-semibold mb-2 text-indigo-800 dark:text-indigo-200 flex items-center justify-center">
//                 <Wallet className="mr-2 h-6 w-6"/> Estimated Trip Cost
//               </h3>
//               <p className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300">
//                 {tripPlan.estimatedCost}
//               </p>
//                <p className="text-sm text-indigo-500 dark:text-indigo-400 mt-1">
//                  For {members} {members === 1 ? "person" : "people"}
//                </p>
//             </div>

//             {/* Download Button */}
//             <Button onClick={downloadPdf} disabled={!pdfId} className="w-full py-3 text-lg">
//               <Download className="mr-2 h-5 w-5" />
//               Download Plan as PDF
//             </Button>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   ) : (
//         <>
//           <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
//             Or, Explore Our Pre-Planned Adventures
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {presetTrips.map((trip, index) => (
//               <Card
//                 key={index}
//                 className="overflow-hidden shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
//               >
//                 <div
//                   className="h-48 bg-cover bg-center"
//                   style={{ backgroundImage: `url(${trip.image})` }}
//                 />
//                 <CardHeader className="p-4">
//                   <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
//                     {trip.title}
//                   </CardTitle>
//                   <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">
//                     {trip.description}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="p-4 pt-0">
//                   <Button
//                     variant="outline"
//                     className="w-full border-indigo-500 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200"
//                   >
//                     View Details
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// I:\New folder-Splits\components\ai-trip-planner.tsx
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plane, Loader2 } from "lucide-react";
import { TripPlan, ApiResponse, ITrip } from "@/lib/types"; // Import ITrip and ApiResponse

// Import the new components from the same folder
import TripForm from "@/components/TripForm";
import TripResults from "@/components/TripResults";
import PresetTrips from "@/components/PresetTrips";

export default function AiTripPlanner() {
  // All state is managed here in the parent component
  const [prompt, setPrompt] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [members, setMembers] = useState<number>();
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [tripType, setTripType] = useState<string>("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTrip, setGeneratedTrip] = useState<ITrip | null>(null); // State now holds the full Trip object from DB

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || !startDate || !endDate || !members || !startLocation || !endLocation || !tripType) {
      toast.error("Please fill all the details to generate your trip plan.");
      return;
    }
    
    setIsLoading(true);
    setGeneratedTrip(null); // Clear previous results

    try {
      const response = await fetch("/api/generate-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
          members,
          startLocation,
          endLocation,
          tripType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const result: ApiResponse = await response.json();
      // Store the entire ITrip object received from the backend
      setGeneratedTrip({
          _id: result._id,
          tripTitle: result.tripPlan.tripTitle,
          placesToVisit: result.tripPlan.placesToVisit,
          hotelsOnTheWay: result.tripPlan.hotelsOnTheWay,
          restaurantsOnTheWay: result.tripPlan.restaurantsOnTheWay,
          fuelStopsOnTheWay: result.tripPlan.fuelStopsOnTheWay,
          estimatedCost: result.tripPlan.estimatedCost,
          createdBy: "user-id-placeholder", // This will be correctly populated by the backend, here for type safety
          pdfUrl: result.pdfUrl,
      });
      
      toast.success("Your amazing trip plan has been generated and saved!");
    } catch (error: any) {
      console.error("Error generating trip plan:", error);
      toast.error(error.message || "Failed to generate trip plan.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPdf = () => {
    if (!generatedTrip?.pdfUrl) {
      toast.error("No PDF available to download.");
      return;
    }
    // The PDF URL is now directly from the saved trip object
    window.open(generatedTrip.pdfUrl, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* The form component is always visible */}
      <TripForm
        prompt={prompt}
        setPrompt={setPrompt}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        members={members}
        setMembers={setMembers}
        startLocation={startLocation}
        setStartLocation={setStartLocation}
        endLocation={endLocation}
        setEndLocation={setEndLocation}
        tripType={tripType}
        setTripType={setTripType}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
      />

      {/* --- CORRECTED CONDITIONAL RENDERING LOGIC --- */}
      
      {/* 1. Show a loading spinner when a request is in progress */}
      {isLoading && (
        <div className="text-center mt-12 flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Crafting your perfect journey...</p>
        </div>
      )}

      {/* 2. Show the results only when the plan is generated and not loading */}
      {generatedTrip && !isLoading && (
        <TripResults 
            tripPlan={generatedTrip} // Pass the entire trip object as TripPlan
            members={members}
            downloadPdf={downloadPdf}
            pdfId={generatedTrip.pdfUrl.split('/').pop()?.replace('.pdf', '') || null} // Extract PDF ID from URL if needed by TripResults, though pdfUrl is better.
        />
      )}

      {/* 3. Show the preset trips only initially (no plan and not loading) */}
      {!generatedTrip && !isLoading && (
        <PresetTrips />
      )}
    </div>
  );
}

