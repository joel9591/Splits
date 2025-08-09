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
    image:
      "https://www.shutterstock.com/image-photo/asian-woman-traveller-take-photo-600nw-2262818911.jpg",
  },
];

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
    {
      name: "Marriott Resort & Spa",
      location: "Miramar, Panaji, North Goa",
      map_url: "https://maps.app.goo.gl/qgyn6nJbDk91GLwm8",
    },
    {
      name: "Alila Diwa Goa",
      location: "Majorda Beach, South Goa",
      map_url: "https://maps.app.goo.gl/Qq7tNFRDf4AAytvf7",
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
    {
      name: "Pousada by the Beach",
      cuisine: "Goan, Portuguese",
      location: "Calangute Beach, North Goa",
      map_url: "https://maps.app.goo.gl/N9m5WqpLPeyodUjZ9",
    },
    {
      name: "Fisherman's Wharf",
      cuisine: "Goan, Seafood",
      location: "Cavelossim, South Goa",
      map_url: "https://maps.app.goo.gl/b1XcRoTHr7jAUihj9",
    },
  ],
  fuel_stations_on_way: [
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
    {
      name: "Bharat Petroleum - Belgaum",
      location: "NH 48, near Belgaum",
      map_url: "https://maps.app.goo.gl/pQWdEKNVqMXyXjWi6",
    },
    {
      name: "Shell Petrol Pump",
      location: "Near Satara, NH 48",
      map_url: "https://maps.app.goo.gl/JrMgsH8pZ16c7wtZ9",
    },
    {
      name: "Reliance Fuel Station",
      location: "Sawantwadi, before entering Goa",
      map_url: "https://maps.app.goo.gl/yNJe7G53h6i4gV9J8",
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
    {
      name: "Dudhsagar Falls",
      description:
        "A magnificent four-tiered waterfall located on the Mandovi River, accessible by jeep.",
      map_url: "https://maps.app.goo.gl/4ZZQHa7U9jUEWcyq8",
    },
    {
      name: "Anjuna Flea Market",
      description:
        "A famous Wednesday market offering a variety of goods, from handicrafts to clothes.",
      map_url: "https://maps.app.goo.gl/nPbSmsoWkNYeEUem6",
    },
    {
      name: "Old Goa (Velha Goa)",
      description:
        "A UNESCO World Heritage site, home to historic churches like the Basilica of Bom Jesus.",
      map_url: "https://maps.app.goo.gl/ok5Me3hERFPCrRu48",
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
    {
      name: "Snow Valley Resorts",
      location: "Log Hut Area",
      map_url: "https://maps.app.goo.gl/rJxtcWWdUGAJkXoP6",
    },
    {
      name: "Hotel Greenfields",
      location: "Log Hut Road",
      map_url: "https://maps.app.goo.gl/C1qVuEvMHFGCCGUP9",
    },
  ],
  restaurants: [
    {
      name: "Cafe 1947",
      cuisine: "Italian, Continental",
      location: "Old Manali",
      map_url: "https://maps.app.goo.gl/ujh2BM1b5qXDhDCc9",
    },
    {
      name: "The Johnson's Cafe",
      cuisine: "Himachali, Continental",
      location: "Circuit House Road",
      map_url: "https://maps.app.goo.gl/gRij1qb7XciDu1xU6",
    },
    {
      name: "Drifter's Cafe",
      cuisine: "European, Himachali",
      location: "Old Manali",
      map_url: "https://maps.app.goo.gl/ZGfpqToz1UtACkTSA",
    },
    {
      name: "Chopsticks",
      cuisine: "Tibetan, Chinese",
      location: "Mall Road",
      map_url: "https://maps.app.goo.gl/MqzpjbLqLbZJz26x7",
    },
    {
      name: "Renaissance Manali",
      cuisine: "Multi-Cuisine",
      location: "Mall Road",
      map_url: "https://maps.app.goo.gl/UTazw4hvN86J3tGr7",
    },
  ],
  fuel_stations_on_way: [
    {
      name: "IOCL Fuel Station",
      location: "Chandigarh to Manali Highway",
      map_url: "https://maps.app.goo.gl/S1yxHNdRGCgBLV1Q9",
    },
    {
      name: "HP Petrol Pump",
      location: "Bilaspur",
      map_url: "https://maps.app.goo.gl/gNLfPYUs61tk5Qjy6",
    },
    {
      name: "Bharat Petroleum",
      location: "Sundernagar",
      map_url: "https://maps.app.goo.gl/LzXT57JeX7eN7Gst8",
    },
    {
      name: "Shell Petrol Pump",
      location: "Mandi",
      map_url: "https://maps.app.goo.gl/Fn5n3bcRRA2VtEuR8",
    },
    {
      name: "Reliance Fuel Station",
      location: "Kullu-Manali Road",
      map_url: "https://maps.app.goo.gl/SLq5RRwFqMpK1x7v7",
    },
  ],
  places_to_visit: [
    {
      name: "Solang Valley",
      description:
        "Adventure paradise for paragliding, zorbing, skiing, and more.",
      map_url: "https://maps.app.goo.gl/xYNszrwbWx9fhHbB7",
    },
    {
      name: "Rohtang Pass",
      description:
        "Scenic mountain pass with snow activities and stunning views.",
      map_url: "https://maps.app.goo.gl/fTTWSq6koVE4uCBu5",
    },
    {
      name: "Hadimba Temple",
      description: "Ancient wooden temple surrounded by cedar forests.",
      map_url: "https://maps.app.goo.gl/DXmtDJkkG4aTSBEy5",
    },
    {
      name: "Old Manali",
      description: "Chill cafes, boho vibe, riverside walks.",
      map_url: "https://maps.app.goo.gl/ewKihjVtfgByHVHz6",
    },
    {
      name: "Vashisht Hot Springs",
      description: "Natural hot water springs with ancient temples.",
      map_url: "https://maps.app.goo.gl/2VA6ctz56JqEcmbZ7",
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
    {
      name: "Hotel Kalyan",
      location: "Ajmer Road",
      map_url: "https://maps.app.goo.gl/xdiXf8ctxyHH6RtL6",
    },
    {
      name: "Zostel Jaipur",
      location: "Near Hawa Mahal",
      map_url: "https://maps.app.goo.gl/dc8aTSBngnxpHxCB8",
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
      name: "Chokhi Dhani",
      cuisine: "Traditional Rajasthani",
      location: "Tonk Road",
      map_url: "https://maps.app.goo.gl/2cN3BdyS1qMCPiPB6",
    },
    {
      name: "Tapri Central",
      cuisine: "Modern Indian",
      location: "C Scheme",
      map_url: "https://maps.app.goo.gl/GzG6prcfEo9vmqUE8",
    },
    {
      name: "Rawat Mishtan Bhandar",
      cuisine: "North Indian, Snacks",
      location: "Station Road",
      map_url: "https://maps.app.goo.gl/pTjWcw8zR6YkLz5S8",
    },
    {
      name: "The Grand Peacock",
      cuisine: "Multi-Cuisine",
      location: "MI Road",
      map_url: "https://maps.app.goo.gl/zNUdEKsPi5VkMnme6",
    },
  ],
  fuel_stations_on_way: [
    {
      name: "HP Petrol Pump",
      location: "Gurugram-Jaipur Highway",
      map_url: "https://maps.app.goo.gl/B1R19iAxtXn3CSkZ7",
    },
    {
      name: "Indian Oil",
      location: "Neemrana",
      map_url: "https://maps.app.goo.gl/ndbmDwY64uEYc39w6",
    },
    {
      name: "Bharat Petroleum",
      location: "Behror",
      map_url: "https://maps.app.goo.gl/1URRRGsoSpjXvShg7",
    },
    {
      name: "Shell",
      location: "Shahpura",
      map_url: "https://maps.app.goo.gl/Y8DhzsWDZTV9ueRG7",
    },
    {
      name: "Reliance Petrol Pump",
      location: "Before Jaipur Toll",
      map_url: "https://maps.app.goo.gl/F4CE1KZPHG1n3vkcA",
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
    {
      name: "Jantar Mantar",
      description:
        "Historic observatory with ancient astronomical instruments.",
      map_url: "https://maps.app.goo.gl/MRfsKqbyXJ8BzYV18",
    },
    {
      name: "Nahargarh Fort",
      description: "Offers panoramic views of the city especially at sunset.",
      map_url: "https://maps.app.goo.gl/RBKDXRFP14WeAKQq8",
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
      location: "Dashashwamedh Ghat",
      map_url: "https://maps.app.goo.gl/t8cHbgBPXU6jz3rBA",
    },
    {
      name: "Zostel Varanasi",
      location: "Near Assi Ghat",
      map_url: "https://maps.app.goo.gl/FSdMBkScPj4rZW5V7",
    },
    {
      name: "Ganpati Guest House",
      location: "Near Meer Ghat",
      map_url: "https://maps.app.goo.gl/N7mULFDnTTrRpQGm8",
    },
    {
      name: "Suryauday Haveli",
      location: "Shivala Ghat",
      map_url: "https://maps.app.goo.gl/KdvAp2UskWftM9Lf7",
    },
  ],
  restaurants: [
    {
      name: "Kashi Chat Bhandar",
      cuisine: "Street Food",
      location: "Godowlia",
      map_url: "https://maps.app.goo.gl/HxQ6LCPRD2k9ikUPA",
    },
    {
      name: "Brown Bread Bakery",
      cuisine: "Organic, Bakery",
      location: "Near Dashashwamedh Ghat",
      map_url: "https://maps.app.goo.gl/VzL81v7xdrAvEG7U9",
    },
    {
      name: "Baati Chokha",
      cuisine: "Authentic UP & Bhojpuri",
      location: "Teliyabagh",
      map_url: "https://maps.app.goo.gl/MxVfZu14fCoXjPoT8",
    },
    {
      name: "The Mark Cafe",
      cuisine: "Indian, Continental",
      location: "Assi Ghat",
      map_url: "https://maps.app.goo.gl/VjsK4D85NYnRrBVs5",
    },
    {
      name: "Spicy Bites",
      cuisine: "Vegetarian",
      location: "Bhelupur",
      map_url: "https://maps.app.goo.gl/gYKnZKBaKRzEwnUB7",
    },
  ],
  fuel_stations_on_way: [
    {
      name: "HP Petrol Pump",
      location: "Prayagraj Road",
      map_url: "https://maps.app.goo.gl/CkQUdxgE8UJMAeRB7",
    },
    {
      name: "Indian Oil",
      location: "Mughalsarai",
      map_url: "https://maps.app.goo.gl/jhzxWhgS8ed1LKf79",
    },
    {
      name: "Bharat Petroleum",
      location: "Varanasi Cantt",
      map_url: "https://maps.app.goo.gl/J9MHdqPzdeN2BrMc7",
    },
    {
      name: "Reliance Petrol Pump",
      location: "NH 2",
      map_url: "https://maps.app.goo.gl/XJArAgb5Q1dt5r8g6",
    },
    {
      name: "Essar Fuel",
      location: "Near BHU",
      map_url: "https://maps.app.goo.gl/BJyz44hdoNm6DZko8",
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
    {
      name: "Banaras Hindu University (BHU)",
      description: "Historic university with Bharat Kala Bhavan museum.",
      map_url: "https://maps.app.goo.gl/Wk6xEYcrJSJSPzoZ6",
    },
    {
      name: "Ramnagar Fort",
      description: "Ancient fort across the Ganges with museum.",
      map_url: "https://maps.app.goo.gl/FHZCBUKF3zmyiNzP8",
    },
  ],
};

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
            <CardContent className="">
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
