// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Download,
//   Hotel,
//   UtensilsCrossed,
//   Fuel,
//   MapPin,
//   Landmark,
//   Wallet,
//   ArrowLeft,
// } from "lucide-react";
// import { TripPlan } from "@/lib/types";

// // Import the preset trip data
// const beachGetawayTripPlan = {
//   title: "Beach Getaway",
//   destination: "Goa, India",
//   description:
//     "A relaxing and rejuvenating road trip to the beautiful beaches of Goa.",
//   image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
//   duration: "3 Days, 2 Nights",
//   estimated_cost_inr: 30000,
//   hotels: [
//     {
//       name: "Taj Fort Aguada Resort & Spa",
//       location: "Sinquerim, Candolim, North Goa",
//       map_url: "https://maps.app.goo.gl/WuTz5eo1pY3aXh9j6",
//     },
//     {
//       name: "The Leela Goa",
//       location: "Mobor, Cavelossim, South Goa",
//       map_url: "https://maps.app.goo.gl/3iRYUnNUxidmhWfK8",
//     },
//     {
//       name: "W Goa",
//       location: "Vagator Beach, Bardez, North Goa",
//       map_url: "https://maps.app.goo.gl/L3i1vZYfTCDnF3Ze8",
//     },
//   ],
//   restaurants: [
//     {
//       name: "Brittos",
//       cuisine: "Goan, Seafood",
//       location: "Baga Beach, Calangute, North Goa",
//       map_url: "https://maps.app.goo.gl/TwKSCq2gpmZtbUVA6",
//     },
//     {
//       name: "Thalassa",
//       cuisine: "Greek, Mediterranean",
//       location: "Vagator, North Goa",
//       map_url: "https://maps.app.goo.gl/m7VGyFEu39GSZ1Vy7",
//     },
//     {
//       name: "Martin's Corner",
//       cuisine: "Goan, Seafood",
//       location: "Betalbatim, South Goa",
//       map_url: "https://maps.app.goo.gl/azKQemK9tvSYgMdx9",
//     },
//   ],
//   fuel_stations: [
//     {
//       name: "Hindustan Petroleum",
//       location: "Mumbai-Pune Expressway",
//       map_url: "https://maps.app.goo.gl/fv3t6sT5gyLt4ETP9",
//     },
//     {
//       name: "Indian Oil - Kolhapur",
//       location: "NH 48, near Kolhapur",
//       map_url: "https://maps.app.goo.gl/2HQo3tBaURDpoM1YA",
//     },
//   ],
//   places_to_visit: [
//     {
//       name: "Baga Beach",
//       description:
//         "Famous for its vibrant nightlife, beach shacks, and water sports.",
//       map_url: "https://maps.app.goo.gl/PkkBvVFn6qMFxqVz5",
//     },
//     {
//       name: "Calangute Beach",
//       description:
//         "The largest beach in North Goa, known as the 'Queen of Beaches'.",
//       map_url: "https://maps.app.goo.gl/V6Db7vXW7KEDXerP9",
//     },
//     {
//       name: "Fort Aguada",
//       description:
//         "A well-preserved 17th-century Portuguese fort with a lighthouse offering scenic views of the sea.",
//       map_url: "https://maps.app.goo.gl/vvUDgJAPU2cAAonX6",
//     },
//   ],
// };

// const mountainAdventureTripPlan = {
//   title: "Mountain Adventure",
//   destination: "Manali, Himachal Pradesh",
//   description:
//     "Thrilling hikes, snow-capped peaks, and serene valleys in the Himalayas.",
//   image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
//   duration: "4 Days, 3 Nights",
//   estimated_cost_inr: 28000,
//   hotels: [
//     {
//       name: "Hotel Mountain Top",
//       location: "Near Hadimba Temple, Manali",
//       map_url: "https://maps.app.goo.gl/DPTu8Zdmsyr25REd6",
//     },
//     {
//       name: "The Orchard Greens",
//       location: "Log Huts Area, Manali",
//       map_url: "https://maps.app.goo.gl/5vU3smv4n7B7sSw88",
//     },
//     {
//       name: "Zostel Manali",
//       location: "Old Manali",
//       map_url: "https://maps.app.goo.gl/4dfRx9kkzFLRUaXD6",
//     },
//   ],
//   restaurants: [
//     {
//       name: "Café 1947",
//       cuisine: "Italian, Continental",
//       location: "Old Manali",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//     {
//       name: "Johnson's Café",
//       cuisine: "Multi-cuisine",
//       location: "Circuit House Road",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//     {
//       name: "Renaissance Café",
//       cuisine: "Continental, Indian",
//       location: "Old Manali Road",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//   ],
//   fuel_stations: [
//     {
//       name: "Indian Oil",
//       location: "Manali-Leh Highway",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//     {
//       name: "Hindustan Petroleum",
//       location: "Kullu-Manali Highway",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//   ],
//   places_to_visit: [
//     {
//       name: "Solang Valley",
//       description:
//         "Adventure sports hub with paragliding, zorbing, and skiing in winter.",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//     {
//       name: "Rohtang Pass",
//       description:
//         "Snow-covered mountain pass with breathtaking views (permit required).",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//     {
//       name: "Hadimba Temple",
//       description: "Ancient wooden temple dedicated to Goddess Hadimba.",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//   ],
// };

// const cityExplorationTripPlan = {
//   title: "City Exploration",
//   destination: "Jaipur, Rajasthan",
//   description:
//     "Explore majestic forts, colorful bazaars, and vibrant Rajasthani culture.",
//   image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
//   duration: "3 Days, 2 Nights",
//   estimated_cost_inr: 20000,
//   hotels: [
//     {
//       name: "Umaid Mahal",
//       location: "Bani Park, Jaipur",
//       map_url: "https://maps.app.goo.gl/yBoGdLdrELCvqBPz7",
//     },
//     {
//       name: "Pearl Palace Heritage",
//       location: "Ajmer Road",
//       map_url: "https://maps.app.goo.gl/Unph7ZP4sn8tNe1n8",
//     },
//     {
//       name: "Hotel Arya Niwas",
//       location: "Sansar Chandra Road",
//       map_url: "https://maps.app.goo.gl/9iLvW5qZHt6HScJx8",
//     },
//   ],
//   restaurants: [
//     {
//       name: "Laxmi Mishthan Bhandar (LMB)",
//       cuisine: "Rajasthani, Indian",
//       location: "Johari Bazaar",
//       map_url: "https://maps.app.goo.gl/NtzRokM8KgCCvQKh6",
//     },
//     {
//       name: "Peacock Rooftop Restaurant",
//       cuisine: "Multi-cuisine",
//       location: "Hotel Pearl Palace",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//     {
//       name: "Chokhi Dhani",
//       cuisine: "Rajasthani",
//       location: "Tonk Road",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//   ],
//   fuel_stations: [
//     {
//       name: "Indian Oil",
//       location: "MI Road",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//     {
//       name: "Hindustan Petroleum",
//       location: "Tonk Road",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//   ],
//   places_to_visit: [
//     {
//       name: "Hawa Mahal",
//       description:
//         "Iconic 'Palace of Winds' with intricate pink sandstone windows.",
//       map_url: "https://maps.app.goo.gl/naPfwhEnKGGhGM9d8",
//     },
//     {
//       name: "Amber Fort",
//       description: "Magnificent fort with elephant rides and light show.",
//       map_url: "https://maps.app.goo.gl/ndFJ5QU3xJNPRAes7",
//     },
//     {
//       name: "City Palace",
//       description: "Blend of Rajasthani and Mughal architecture.",
//       map_url: "https://maps.app.goo.gl/PCb2zZQppZcsYvjq6",
//     },
//   ],
// };

// const culturalJourneyTripPlan = {
//   title: "Cultural Journey",
//   destination: "Varanasi, Uttar Pradesh",
//   description:
//     "Experience spiritual rituals, ancient temples, and the Ganges ghats.",
//   image:
//     "https://www.shutterstock.com/image-photo/asian-woman-traveller-take-photo-600nw-2262818911.jpg",
//   duration: "3 Days, 2 Nights",
//   estimated_cost_inr: 18000,
//   hotels: [
//     {
//       name: "BrijRama Palace",
//       location: "Darbhanga Ghat",
//       map_url: "https://maps.app.goo.gl/p31JhCZ7N2VCmQvs5",
//     },
//     {
//       name: "Hotel Alka",
//       location: "Meer Ghat",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//     {
//       name: "Zostel Varanasi",
//       location: "Assi Ghat",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//   ],
//   restaurants: [
//     {
//       name: "Varanasi Cafe",
//       cuisine: "North Indian, Continental",
//       location: "Assi Ghat",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//     {
//       name: "Brown Bread Bakery",
//       cuisine: "Continental, Bakery",
//       location: "Near Dashashwamedh Ghat",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//     {
//       name: "Pizzeria Vaatika Cafe",
//       cuisine: "Italian, Indian",
//       location: "Assi Ghat",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//   ],
//   fuel_stations: [
//     {
//       name: "Indian Oil",
//       location: "Varanasi Cantt",
//       map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
//     },
//     {
//       name: "Bharat Petroleum",
//       location: "Varanasi Cantt",
//       map_url: "https://maps.app.goo.gl/J9MHdqPzdeN2BrMc7",
//     },
//   ],
//   places_to_visit: [
//     {
//       name: "Dashashwamedh Ghat",
//       description: "Most famous ghat for Ganga Aarti and rituals.",
//       map_url: "https://maps.app.goo.gl/hXKQQUxBR99LbFxV6",
//     },
//     {
//       name: "Kashi Vishwanath Temple",
//       description: "One of the 12 Jyotirlingas, sacred Shiva temple.",
//       map_url: "https://maps.app.goo.gl/nLvwdyBquJHyRh3p8",
//     },
//     {
//       name: "Assi Ghat",
//       description: "Peaceful ghat known for morning yoga and music.",
//       map_url: "https://maps.app.goo.gl/H9sjzQgz8KxuZZMP8",
//     },
//   ],
// };

// const tripPlans = {
//   "beach-getaway": beachGetawayTripPlan,
//   "mountain-adventure": mountainAdventureTripPlan,
//   "city-exploration": cityExplorationTripPlan,
//   "cultural-journey": culturalJourneyTripPlan,
// };

// export default function PresetTripDetails() {
//   const router = useRouter();
//   const { slug } = useParams();
//   const [tripPlan, setTripPlan] = useState<any>(null);

//   useEffect(() => {
//     if (typeof slug === "string") {
//       const plan = tripPlans[slug as keyof typeof tripPlans];
//       if (plan) {
//         // Convert the preset trip data to match the TripPlan interface
//         const formattedPlan = {
//           tripTitle: `${plan.title} - ${plan.destination}`,
//           placesToVisit: plan.places_to_visit.map((place: any) => ({
//             name: place.name,
//             description: place.description,
//             link: place.map_url,
//           })),
//           hotelsOnTheWay: plan.hotels.map((hotel: any) => ({
//             name: hotel.name,
//             location: hotel.location,
//             price: "Contact for pricing",
//           })),
//           restaurantsOnTheWay: plan.restaurants.map((restaurant: any) => ({
//             name: restaurant.name,
//             location: restaurant.location,
//           })),
//           fuelStopsOnTheWay: plan.fuel_stations.map((station: any) => ({
//             name: station.name,
//             location: station.location,
//           })),
//           estimatedCost: `₹${plan.estimated_cost_inr.toLocaleString("en-IN")}`,
//         };
//         setTripPlan(formattedPlan);
//       }
//     }
//   }, [slug]);

//   if (!tripPlan) {
//     return (
//       <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
//         <Card className="w-full max-w-md p-8 text-center">
//           <CardTitle className="text-xl mb-4">Trip not found</CardTitle>
//           <CardDescription>
//             The requested trip details could not be found.
//           </CardDescription>
//           <Button className="mt-6" onClick={() => router.push("/")}>
//             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
//           </Button>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Button
//         variant="outline"
//         className="mb-6"
//         onClick={() => router.push("/")}
//       >
//         <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
//       </Button>

//       <Card className="shadow-xl rounded-lg border-2 border-indigo-400 dark:border-indigo-600 animate-fade-in">
//         <CardHeader className="bg-indigo-50 dark:bg-indigo-900/50 p-6 rounded-t-lg">
//           <CardTitle className="text-indigo-800 dark:text-indigo-200 text-3xl font-bold">
//             {tripPlan.tripTitle}
//           </CardTitle>
//           <CardDescription className="text-indigo-600 dark:text-indigo-300 mt-1 text-lg">
//             Your personalized itinerary is ready!
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="p-6 space-y-8">
//           <div>
//             <h3 className="text-2xl font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-100">
//               <Landmark className="inline-block mr-3 h-6 w-6 text-green-600" />{" "}
//               Must-Visit Places
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {tripPlan.placesToVisit.map((place: any, index: number) => (
//                 <Card key={index} className="overflow-hidden group">
//                   <CardHeader>
//                     <CardTitle>{place.name}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-gray-600 dark:text-gray-400 mb-4">
//                       {place.description}
//                     </p>
//                     <a
//                       href={place.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-indigo-600 hover:underline"
//                     >
//                       View on Map{" "}
//                       <MapPin className="inline-block h-4 w-4 ml-1" />
//                     </a>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div>
//               <h3 className="text-xl font-semibold mb-3 flex items-center">
//                 <Hotel className="mr-2 h-5 w-5 text-blue-600" /> Hotels
//               </h3>
//               <ul className="space-y-2">
//                 {tripPlan.hotelsOnTheWay.map((hotel: any, index: number) => (
//                   <li
//                     key={index}
//                     className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md flex justify-between items-center"
//                   >
//                     <div>
//                       <strong>{hotel.name}</strong> ({hotel.location}) -{" "}
//                       <span className="font-mono">{hotel.price}</span>
//                     </div>
//                     <a
//                       href={hotel.map_url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-3 flex items-center">
//                 <UtensilsCrossed className="mr-2 h-5 w-5 text-red-600" />{" "}
//                 Restaurants
//               </h3>
//               <ul className="space-y-2">
//                 {tripPlan.restaurantsOnTheWay.map(
//                   (item: any, index: number) => (
//                     <li
//                       key={index}
//                       className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md flex justify-between items-center"
//                     >
//                       <div>
//                         <strong>{item.name}</strong> - {item.location}
//                       </div>
//                       <a href={item.map_url}>
//                         <MapPin className="h-5 w-5 text-red-500 flex-shrink-0" />
//                       </a>
//                     </li>
//                   )
//                 )}
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-3 flex items-center">
//                 <Fuel className="mr-2 h-5 w-5 text-yellow-600" /> Fuel Stops
//               </h3>
//               <ul className="space-y-2">
//                 {tripPlan.fuelStopsOnTheWay.map((item: any, index: number) => (
//                   <li
//                     key={index}
//                     className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md flex justify-between items-center"
//                   >
//                     <div>
//                       <strong>{item.name}</strong> - {item.location}
//                     </div>
//                     <a href={item.map_url}>
//                       <MapPin className="h-5 w-5 text-yellow-500 flex-shrink-0" />
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <div className="bg-indigo-100 dark:bg-indigo-900/50 p-6 rounded-lg text-center">
//             <h3 className="text-xl font-semibold mb-2 text-indigo-800 dark:text-indigo-200 flex items-center justify-center">
//               <Wallet className="mr-2 h-6 w-6" /> Estimated Trip Cost
//             </h3>
//             <p className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300">
//               {tripPlan.estimatedCost}
//             </p>
//             <p className="text-sm text-indigo-500 dark:text-indigo-400 mt-1">
//               For 2 people
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  Hotel,
  UtensilsCrossed,
  Fuel,
  MapPin,
  Landmark,
  Wallet,
  ArrowLeft,
} from "lucide-react";
import { TripPlan } from "@/lib/types";

// Import the preset trip data
const beachGetawayTripPlan = {
  title: "Beach Getaway",
  destination: "Goa, India",
  description:
    "A relaxing and rejuvenating road trip to the beautiful beaches of Goa.",
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  duration: "3 Days, 2 Nights",
  estimated_cost_inr: 30000,
  hotels: [
    {
      name: "Taj Fort Aguada Resort & Spa",
      location: "Sinquerim, Candolim, North Goa",
      map_url: "https://maps.app.goo.gl/WuTz5eo1pY3aXh9j6",
    },
    {
      name: "The Leela Goa",
      location: "Mobor, Cavelossim, South Goa",
      map_url: "https://maps.app.goo.gl/3iRYUnNUxidmhWfK8",
    },
    {
      name: "W Goa",
      location: "Vagator Beach, Bardez, North Goa",
      map_url: "https://maps.app.goo.gl/L3i1vZYfTCDnF3Ze8",
    },
  ],
  restaurants: [
    {
      name: "Brittos",
      cuisine: "Goan, Seafood",
      location: "Baga Beach, Calangute, North Goa",
      map_url: "https://maps.app.goo.gl/TwKSCq2gpmZtbUVA6",
    },
    {
      name: "Thalassa",
      cuisine: "Greek, Mediterranean",
      location: "Vagator, North Goa",
      map_url: "https://maps.app.goo.gl/m7VGyFEu39GSZ1Vy7",
    },
    {
      name: "Martin's Corner",
      cuisine: "Goan, Seafood",
      location: "Betalbatim, South Goa",
      map_url: "https://maps.app.goo.gl/azKQemK9tvSYgMdx9",
    },
  ],
  fuel_stations: [
    {
      name: "Hindustan Petroleum",
      location: "Mumbai-Pune Expressway",
      map_url: "https://maps.app.goo.gl/fv3t6sT5gyLt4ETP9",
    },
    {
      name: "Indian Oil - Kolhapur",
      location: "NH 48, near Kolhapur",
      map_url: "https://maps.app.goo.gl/2HQo3tBaURDpoM1YA",
    },
  ],
  places_to_visit: [
    {
      name: "Baga Beach",
      description:
        "Famous for its vibrant nightlife, beach shacks, and water sports.",
      map_url: "https://maps.app.goo.gl/PkkBvVFn6qMFxqVz5",
    },
    {
      name: "Calangute Beach",
      description:
        "The largest beach in North Goa, known as the 'Queen of Beaches'.",
      map_url: "https://maps.app.goo.gl/V6Db7vXW7KEDXerP9",
    },
    {
      name: "Fort Aguada",
      description:
        "A well-preserved 17th-century Portuguese fort with a lighthouse offering scenic views of the sea.",
      map_url: "https://maps.app.goo.gl/vvUDgJAPU2cAAonX6",
    },
  ],
};

const mountainAdventureTripPlan = {
  title: "Mountain Adventure",
  destination: "Manali, Himachal Pradesh",
  description:
    "Thrilling hikes, snow-capped peaks, and serene valleys in the Himalayas.",
  image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  duration: "4 Days, 3 Nights",
  estimated_cost_inr: 28000,
  hotels: [
    {
      name: "Hotel Mountain Top",
      location: "Near Hadimba Temple, Manali",
      map_url: "https://maps.app.goo.gl/DPTu8Zdmsyr25REd6",
    },
    {
      name: "The Orchard Greens",
      location: "Log Huts Area, Manali",
      map_url: "https://maps.app.goo.gl/5vU3smv4n7B7sSw88",
    },
    {
      name: "Zostel Manali",
      location: "Old Manali",
      map_url: "https://maps.app.goo.gl/4dfRx9kkzFLRUaXD6",
    },
  ],
  restaurants: [
    {
      name: "Café 1947",
      cuisine: "Italian, Continental",
      location: "Old Manali",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
    {
      name: "Johnson's Café",
      cuisine: "Multi-cuisine",
      location: "Circuit House Road",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
    {
      name: "Renaissance Café",
      cuisine: "Continental, Indian",
      location: "Old Manali Road",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
  ],
  fuel_stations: [
    {
      name: "Indian Oil",
      location: "Manali-Leh Highway",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
    {
      name: "Hindustan Petroleum",
      location: "Kullu-Manali Highway",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
  ],
  places_to_visit: [
    {
      name: "Solang Valley",
      description:
        "Adventure sports hub with paragliding, zorbing, and skiing in winter.",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
    {
      name: "Rohtang Pass",
      description:
        "Snow-covered mountain pass with breathtaking views (permit required).",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
    {
      name: "Hadimba Temple",
      description: "Ancient wooden temple dedicated to Goddess Hadimba.",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
  ],
};

const cityExplorationTripPlan = {
  title: "City Exploration",
  destination: "Jaipur, Rajasthan",
  description:
    "Explore majestic forts, colorful bazaars, and vibrant Rajasthani culture.",
  image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
  duration: "3 Days, 2 Nights",
  estimated_cost_inr: 20000,
  hotels: [
    {
      name: "Umaid Mahal",
      location: "Bani Park, Jaipur",
      map_url: "https://maps.app.goo.gl/yBoGdLdrELCvqBPz7",
    },
    {
      name: "Pearl Palace Heritage",
      location: "Ajmer Road",
      map_url: "https://maps.app.goo.gl/Unph7ZP4sn8tNe1n8",
    },
    {
      name: "Hotel Arya Niwas",
      location: "Sansar Chandra Road",
      map_url: "https://maps.app.goo.gl/9iLvW5qZHt6HScJx8",
    },
  ],
  restaurants: [
    {
      name: "Laxmi Mishthan Bhandar (LMB)",
      cuisine: "Rajasthani, Indian",
      location: "Johari Bazaar",
      map_url: "https://maps.app.goo.gl/NtzRokM8KgCCvQKh6",
    },
    {
      name: "Peacock Rooftop Restaurant",
      cuisine: "Multi-cuisine",
      location: "Hotel Pearl Palace",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
    {
      name: "Chokhi Dhani",
      cuisine: "Rajasthani",
      location: "Tonk Road",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
  ],
  fuel_stations: [
    {
      name: "Indian Oil",
      location: "MI Road",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
    {
      name: "Hindustan Petroleum",
      location: "Tonk Road",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
  ],
  places_to_visit: [
    {
      name: "Hawa Mahal",
      description:
        "Iconic 'Palace of Winds' with intricate pink sandstone windows.",
      map_url: "https://maps.app.goo.gl/naPfwhEnKGGhGM9d8",
    },
    {
      name: "Amber Fort",
      description: "Magnificent fort with elephant rides and light show.",
      map_url: "https://maps.app.goo.gl/ndFJ5QU3xJNPRAes7",
    },
    {
      name: "City Palace",
      description: "Blend of Rajasthani and Mughal architecture.",
      map_url: "https://maps.app.goo.gl/PCb2zZQppZcsYvjq6",
    },
  ],
};

const culturalJourneyTripPlan = {
  title: "Cultural Journey",
  destination: "Varanasi, Uttar Pradesh",
  description:
    "Experience spiritual rituals, ancient temples, and the Ganges ghats.",
  image:
    "https://www.shutterstock.com/image-photo/asian-woman-traveller-take-photo-600nw-2262818911.jpg",
  duration: "3 Days, 2 Nights",
  estimated_cost_inr: 18000,
  hotels: [
    {
      name: "BrijRama Palace",
      location: "Darbhanga Ghat",
      map_url: "https://maps.app.goo.gl/p31JhCZ7N2VCmQvs5",
    },
    {
      name: "Hotel Alka",
      location: "Meer Ghat",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
    {
      name: "Zostel Varanasi",
      location: "Assi Ghat",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
  ],
  restaurants: [
    {
      name: "Varanasi Cafe",
      cuisine: "North Indian, Continental",
      location: "Assi Ghat",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
    {
      name: "Brown Bread Bakery",
      cuisine: "Continental, Bakery",
      location: "Near Dashashwamedh Ghat",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
    {
      name: "Pizzeria Vaatika Cafe",
      cuisine: "Italian, Indian",
      location: "Assi Ghat",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
  ],
  fuel_stations: [
    {
      name: "Indian Oil",
      location: "Varanasi Cantt",
      map_url: "https://maps.app.goo.gl/Yx9Nt1Yx9Nt1Yx9Nt",
    },
    {
      name: "Bharat Petroleum",
      location: "Varanasi Cantt",
      map_url: "https://maps.app.goo.gl/J9MHdqPzdeN2BrMc7",
    },
  ],
  places_to_visit: [
    {
      name: "Dashashwamedh Ghat",
      description: "Most famous ghat for Ganga Aarti and rituals.",
      map_url: "https://maps.app.goo.gl/hXKQQUxBR99LbFxV6",
    },
    {
      name: "Kashi Vishwanath Temple",
      description: "One of the 12 Jyotirlingas, sacred Shiva temple.",
      map_url: "https://maps.app.goo.gl/nLvwdyBquJHyRh3p8",
    },
    {
      name: "Assi Ghat",
      description: "Peaceful ghat known for morning yoga and music.",
      map_url: "https://maps.app.goo.gl/H9sjzQgz8KxuZZMP8",
    },
  ],
};

const tripPlans = {
  "beach-getaway": beachGetawayTripPlan,
  "mountain-adventure": mountainAdventureTripPlan,
  "city-exploration": cityExplorationTripPlan,
  "cultural-journey": culturalJourneyTripPlan,
};

export default function PresetTripDetails() {
  const router = useRouter();
  const { slug } = useParams();
  const [tripPlan, setTripPlan] = useState<any>(null);

  useEffect(() => {
    if (typeof slug === "string") {
      const plan = tripPlans[slug as keyof typeof tripPlans];
      if (plan) {
        // Convert the preset trip data to match the TripPlan interface
        const formattedPlan = {
          tripTitle: `${plan.title} - ${plan.destination}`,
          placesToVisit: plan.places_to_visit.map((place: any) => ({
            name: place.name,
            description: place.description,
            link: place.map_url,
          })),
          hotelsOnTheWay: plan.hotels.map((hotel: any) => ({
            name: hotel.name,
            location: hotel.location,
            price: "Contact for pricing",
            map_url: hotel.map_url,
          })),
          restaurantsOnTheWay: plan.restaurants.map((restaurant: any) => ({
            name: restaurant.name,
            location: restaurant.location,
            map_url: restaurant.map_url,
          })),
          fuelStopsOnTheWay: plan.fuel_stations.map((station: any) => ({
            name: station.name,
            location: station.location,
            map_url: station.map_url,
          })),
          estimatedCost: `₹${plan.estimated_cost_inr.toLocaleString("en-IN")}`,
        };
        setTripPlan(formattedPlan);
      }
    }
  }, [slug]);

  if (!tripPlan) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <Card className="w-full max-w-md p-8 text-center">
          <CardTitle className="text-xl mb-4">Trip not found</CardTitle>
          <CardDescription>
            The requested trip details could not be found.
          </CardDescription>
          <Button className="mt-6" onClick={() => router.push("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Button>

      <Card className="shadow-xl rounded-lg border-2 border-indigo-400 dark:border-indigo-600 animate-fade-in">
        <CardHeader className="bg-indigo-50 dark:bg-indigo-900/50 p-6 rounded-t-lg">
          <CardTitle className="text-indigo-800 dark:text-indigo-200 text-3xl font-bold">
            {tripPlan.tripTitle}
          </CardTitle>
          <CardDescription className="text-indigo-600 dark:text-indigo-300 mt-1 text-lg">
            Your personalized itinerary is ready!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-100">
              <Landmark className="inline-block mr-3 h-6 w-6 text-green-600" />{" "}
              Must-Visit Places
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tripPlan.placesToVisit.map((place: any, index: number) => (
                <Card key={index} className="overflow-hidden group">
                  <CardHeader>
                    <CardTitle>{place.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {place.description}
                    </p>
                    <a
                      href={place.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      View on Map{" "}
                      <MapPin className="inline-block h-4 w-4 ml-1" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Hotel className="mr-2 h-5 w-5 text-blue-600" /> Hotels
              </h3>
              <ul className="space-y-2">
                {tripPlan.hotelsOnTheWay.map((hotel: any, index: number) => (
                  <li
                    key={index}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md flex justify-between items-center"
                  >
                    <div>
                        <strong>{hotel.name}</strong> ({hotel.location}) -{" "}
                        <span className="font-mono">{hotel.price}</span>
                      </div>
                    <a
                      href={hotel.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-between items-center "
                    >
                      <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <UtensilsCrossed className="mr-2 h-5 w-5 text-red-600" />{" "}
                Restaurants
              </h3>
              <ul className="space-y-2">
                {tripPlan.restaurantsOnTheWay.map(
                  (item: any, index: number) => (
                    <li
                      key={index}
                      className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md flex justify-between items-center"
                    >
                      <div>
                          <strong>{item.name}</strong> - {item.location}
                        </div>
                      <a
                        href={item.map_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-between items-center"
                      >
                        <MapPin className="h-5 w-5 text-red-500 flex-shrink-0" />
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Fuel className="mr-2 h-5 w-5 text-yellow-600" /> Fuel Stops
              </h3>
              <ul className="space-y-2">
                {tripPlan.fuelStopsOnTheWay.map((item: any, index: number) => (
                  <li
                    key={index}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md flex justify-between items-center"
                  >
                    <div >
                      <strong>{item.name}</strong> - {item.location}
                    </div>
                    <a
                      href={item.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0"
                    >
                      <MapPin className="h-5 w-5 text-yellow-500" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-indigo-100 dark:bg-indigo-900/50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2 text-indigo-800 dark:text-indigo-200 flex items-center justify-center">
              <Wallet className="mr-2 h-6 w-6" /> Estimated Trip Cost
            </h3>
            <p className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300">
              {tripPlan.estimatedCost}
            </p>
            <p className="text-sm text-indigo-500 dark:text-indigo-400 mt-1">
              For 2 people
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
