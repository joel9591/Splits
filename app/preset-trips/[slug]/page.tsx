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
      map_url:
        "https://www.google.com/maps/place/Taj+Fort+Aguada+Resort+%26+Spa,+Goa/@15.4975365,73.7645119,17z/data=!4m9!3m8!1s0x3bbfc17572c6093d:0xc2b14e0b1a4873ef!5m2!4m1!1i2!8m2!3d15.4975365!4d73.7670868!16s%2Fg%2F1tkks9qr?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "The St. Regis Goa Resort",
      location: "Mobor, Cavelossim, South Goa",
      map_url:
        "https://www.google.com/maps/place/The+St.+Regis+Goa+Resort/@15.1570331,73.9483661,17z/data=!4m9!3m8!1s0x3bbe4daf60cc0c4b:0xcd347cd019711a0f!5m2!4m1!1i2!8m2!3d15.1570331!4d73.950941!16s%2Fg%2F11t2rn5c95?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "W Goa",
      location: "Vagator Beach, Bardez, North Goa",
      map_url:
        "https://www.google.com/maps/place/W+Goa/@15.6024636,73.7343728,17z/data=!3m1!4b1!4m9!3m8!1s0x3bbfe96f8008739f:0x466052ed5d25e27e!5m2!4m1!1i2!8m2!3d15.6024636!4d73.7369477!16s%2Fg%2F11cmyv90ck?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Marriott Resort & Spa",
      location: "Miramar, Panaji, North Goa",
      map_url:
        "https://www.google.com/maps/search/Marriott+Resort+%26+Spa/@12.877012,75.4138196,8z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Alila Diwa Goa",
      location: "Majorda Beach, South Goa",
      map_url:
        "https://www.google.com/maps/place/Alila+Diwa+Goa/@15.3064127,73.9088464,17z/data=!3m1!4b1!4m9!3m8!1s0x3bbfb6eab401aa19:0x38bbba7780c87de4!5m2!4m1!1i2!8m2!3d15.3064127!4d73.9114213!16s%2Fg%2F1thr5mh8?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
  ],
  restaurants: [
    {
      name: "Brittos",
      cuisine: "Goan, Seafood",
      location: "Baga Beach, Calangute, North Goa",
      map_url:
        "https://www.google.com/maps/place/Britto%E2%80%99s+Restaurant+at+Baga+Beach+%E2%80%93+Iconic+Seafood+%26+Cocktail+Bar+Since+1965/@15.5614892,73.7471596,17z/data=!3m1!4b1!4m6!3m5!1s0x3bbfea1ddfc53547:0x4af2a99129e6d044!8m2!3d15.5614892!4d73.7497345!16s%2Fg%2F11b7twst9v?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Thalassa",
      cuisine: "Greek, Mediterranean",
      location: "Vagator, North Goa",
      map_url:
        "https://www.google.com/maps/place/Thalassa/@15.6055716,73.7249104,14z/data=!4m10!1m2!2m1!1sThalassa+-+Vagator,+North+Goa!3m6!1s0x3bbfe970ad8bd35f:0x60425614f6bda5bc!8m2!3d15.6163537!4d73.7555322!15sCh1UaGFsYXNzYSAtIFZhZ2F0b3IsIE5vcnRoIEdvYVocIhp0aGFsYXNzYSB2YWdhdG9yIG5vcnRoIGdvYZIBEGdyZWVrX3Jlc3RhdXJhbnSqAWAKDS9nLzExbGN0X2tfM3kQASoMIgh0aGFsYXNzYSgAMh8QASIbtMsigE1Mx72709p70L2gW1o7QOZ5bXWZbQouMh4QAiIadGhhbGFzc2EgdmFnYXRvciBub3J0aCBnb2HgAQA!16s%2Fg%2F1tdfx4t6?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Martin's Corner",
      cuisine: "Goan, Seafood",
      location: "Betalbatim, South Goa",
      map_url:
        "https://www.google.com/maps/place/Martin's+Corner/@15.3037876,73.9117252,17z/data=!3m1!4b1!4m6!3m5!1s0x3bbfb6dda67ab363:0x7be42cfd4e9de95!8m2!3d15.3037876!4d73.9143001!16s%2Fg%2F11b5wkpk7y?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Pousada by the Beach",
      cuisine: "Goan, Portuguese",
      location: "Calangute Beach, North Goa",
      map_url:
        "https://www.google.com/maps/place/Pousada+by+the+Beach/@15.5345871,73.7558019,17z/data=!3m1!4b1!4m6!3m5!1s0x3bbfc1faecaf297b:0x7a19cda76bffe1e1!8m2!3d15.5345871!4d73.7583768!16s%2Fg%2F12lvwc3vr?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Fisherman's Wharf",
      cuisine: "Goan, Seafood",
      location: "Cavelossim, South Goa",
      map_url:
        "https://www.google.com/maps/place/The+Fishermans+Wharf/@15.1576183,73.949616,17z/data=!3m1!4b1!4m6!3m5!1s0x3bbe4c8e3c183545:0x86a5d36c0de501c4!8m2!3d15.1576183!4d73.9521909!16s%2Fg%2F1tlgwdkv?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
  ],
  fuel_stations_on_way: [
    {
      name: "Hindustan Petroleum",
      location: "Mumbai-Pune Expressway",
      map_url:
        "https://www.google.com/maps/place/Hindustan+Petroleum+Corporation+Limited/@18.8144953,72.7681777,9z/data=!4m10!1m2!2m1!1sHindustan+Petroleum+-+Mumbai-Pune+Expressway!3m6!1s0x3bc2abcbce1c6b9d:0xdeb5acdb19274fef!8m2!3d18.7498419!4d73.51749!15sCixIaW5kdXN0YW4gUGV0cm9sZXVtIC0gTXVtYmFpLVB1bmUgRXhwcmVzc3dheSIDiAEBWiwiKmhpbmR1c3RhbiBwZXRyb2xldW0gbXVtYmFpIHB1bmUgZXhwcmVzc3dheZIBC2dhc19zdGF0aW9uqgGHAQoNL2cvMTFiYzZzOHc5MgoKL20vMDI2dDRfXxABKhciE2hpbmR1c3RhbiBwZXRyb2xldW0oADIfEAEiGziVBg78sQ8lzGvzB3MZiV6uKCpZL2supHzOcjIuEAIiKmhpbmR1c3RhbiBwZXRyb2xldW0gbXVtYmFpIHB1bmUgZXhwcmVzc3dheeABAA!16s%2Fg%2F1hhv_jg3t?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Indian Oil - Kolhapur",
      location: "NH 48, near Kolhapur",
      map_url:
        "https://www.google.com/maps/place/IndianOil/@16.679726,74.1223074,12z/data=!4m10!1m2!2m1!1sIndian+Oil+-+Kolhapur+-+NH+48,+near+Kolhapur!3m6!1s0x3bc10001183a3593:0x602f41bff11b6cd7!8m2!3d16.679726!4d74.2213664!15sCixJbmRpYW4gT2lsIC0gS29saGFwdXIgLSBOSCA0OCwgbmVhciBLb2xoYXB1ciIDiAEBWikiJ2luZGlhbiBvaWwga29saGFwdXIgbmggNDggbmVhciBrb2xoYXB1cpIBC2dhc19zdGF0aW9uqgGKAQoNL2cvMTFiYzV0aGNkcAoKL20vMDI2bHpncRABKh0iGWluZGlhbiBvaWwga29saGFwdXIgbmggNDgoADIfEAEiGwIaDeBS8nPJLH6N9U3l_ef2quera4qAX1DOZTIrEAIiJ2luZGlhbiBvaWwga29saGFwdXIgbmggNDggbmVhciBrb2xoYXB1cuABAA!16s%2Fg%2F11cs9_qbnt?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Bharat Petroleum - Belgaum",
      location: "NH 48, near Belgaum",
      map_url:
        "https://www.google.com/maps/place/Bharat+Petroleum,+Petrol+Pump+-Narayan+Das+Shamji/@16.1270632,74.0398749,9.75z/data=!4m10!1m2!2m1!1sBharat+Petroleum+-+Belgaum+-+NH+48,+near+Belgaum!3m6!1s0x3bbf67a448cf0209:0x2d114c63d04d6b2d!8m2!3d15.8333465!4d74.5463705!15sCjBCaGFyYXQgUGV0cm9sZXVtIC0gQmVsZ2F1bSAtIE5IIDQ4LCBuZWFyIEJlbGdhdW0iA4gBAZIBC2dhc19zdGF0aW9uqgGTAQoNL2cvMTFiYzZodDhzZgoKL20vMDI2dDQzMhABKiIiHmJoYXJhdCBwZXRyb2xldW0gYmVsZ2F1bSBuaCA0OCgAMh8QASIbBa2uHbW0ZjzYLDyhB_907D7sVXXSKwF6vpRQMi8QAiIrYmhhcmF0IHBldHJvbGV1bSBiZWxnYXVtIG5oIDQ4IG5lYXIgYmVsZ2F1beABAA!16s%2Fg%2F1tcxn3gc?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Indian Oil - Maharashtra",
      location: "Ajinkya Colony, Powai Naka, Satara",
      map_url:
        "https://www.google.com/maps/place/IndianOil/@17.6863229,73.9956923,15z/data=!4m10!1m2!2m1!1ssatara+petrol+pump!3m6!1s0x3bc239eb23aa6d0d:0x115cdaebeaadf2c4!8m2!3d17.6875784!4d74.0076431!15sChJzYXRhcmEgcGV0cm9sIHB1bXCSAQtnYXNfc3RhdGlvbqoBVgoIL20vMDV3eTIQASoPIgtwZXRyb2wgcHVtcCgAMh8QASIbEKwiwmr_d3SASwvT1lhQxl8aP-0T-kMUe9rrMhYQAiISc2F0YXJhIHBldHJvbCBwdW1w4AEA!16s%2Fg%2F1tkrk7jz?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Hindustan Petroleum Corporation Limited",
      location: "Sawantwadi, before entering Goa",
      map_url:
        "http://google.com/maps/place/Hindustan+Petroleum+Corporation+Limited/@15.9154834,73.7754201,13.06z/data=!4m10!1m2!2m1!1ssawantwadi+petrol+pump!3m6!1s0x3bbff55dcfa931c5:0x9e85e12d80fb528b!8m2!3d15.9071961!4d73.8207243!15sChZzYXdhbnR3YWRpIHBldHJvbCBwdW1wkgELZ2FzX3N0YXRpb26qAVoKCC9tLzA1d3kyEAEqDyILcGV0cm9sIHB1bXAoADIfEAEiG1N7q-mDbLN9DkQKAXsY_LLK9-WQurqYPWTkYDIaEAIiFnNhd2FudHdhZGkgcGV0cm9sIHB1bXDgAQA!16s%2Fg%2F11b807w1qc?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
  ],
  places_to_visit: [
    {
      name: "Baga Beach",
      description:
        "Famous for its vibrant nightlife, beach shacks, and water sports.",
      map_url:
        "https://www.google.com/maps/place/Baga+Beach/@15.557323,73.7455182,16z/data=!4m10!1m2!2m1!1sbaga+beach!3m6!1s0x3bbfea1cd8a1deff:0xba7066c0ee35c1e0!8m2!3d15.5552787!4d73.7517307!15sCgpiYWdhIGJlYWNokgEFYmVhY2jgAQA!16s%2Fg%2F11c53dbgcr?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Calangute Beach",
      description:
        "The largest beach in North Goa, known as the 'Queen of Beaches'.",
      map_url:
        "https://www.google.com/maps/place/Calangute+Beach/@15.5468346,73.7330899,14z/data=!3m1!4b1!4m6!3m5!1s0x3bbfea0148f4ed2b:0xcb592fad5d257d17!8m2!3d15.549441!4d73.7534857!16s%2Fg%2F1tfkzn7s?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Fort Aguada",
      description:
        "A well-preserved 17th-century Portuguese fort with a lighthouse offering scenic views of the sea.",
      map_url:
        "https://www.google.com/maps/place/Fort+Aguada/@15.4922519,73.7711713,17z/data=!3m1!4b1!4m6!3m5!1s0x3bbfc175c68cbd6b:0xa3837630b3697b1c!8m2!3d15.4922519!4d73.7737462!16zL20vMDk0MDNx?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Dudhsagar Falls",
      description:
        "A magnificent four-tiered waterfall located on the Mandovi River, accessible by jeep.",
      map_url:
        "https://www.google.com/maps/place/Dudhsagar+Falls/@15.3144755,74.3130093,18z/data=!4m10!1m2!2m1!1sdudhsagar+falls!3m6!1s0x3bbfa618142b8b43:0xfd9448e7283b0225!8m2!3d15.3144375!4d74.3143073!15sCg9kdWRoc2FnYXIgZmFsbHNaESIPZHVkaHNhZ2FyIGZhbGxzkgELc2NlbmljX3Nwb3SqATcQATIeEAEiGmr7EIR_mOxhZ_71lKpENYIWnkKWEBG8MUmPMhMQAiIPZHVkaHNhZ2FyIGZhbGxz4AEA!16zL20vMDdxOXp0?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Anjuna Flea Market",
      description:
        "A famous Wednesday market offering a variety of goods, from handicrafts to clothes.",
      map_url:
        "https://www.google.com/maps/place/Anjuna+Flea+Market/@15.5763676,73.7420657,17z/data=!3m1!4b1!4m6!3m5!1s0x3bbfe912d4858f15:0xbbe5c0aaad4f57c9!8m2!3d15.5763676!4d73.7446406!16s%2Fg%2F11rpzhq14k?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Old Goa (Velha Goa)",
      description:
        "A UNESCO World Heritage site, home to historic churches like the Basilica of Bom Jesus.",
      map_url:
        "https://www.google.com/maps/place/Old+Goa,+Goa/@15.5026139,73.8814631,13z/data=!3m1!4b1!4m6!3m5!1s0x3bbfbe8cf00e90a1:0x9c3d04969bd13976!8m2!3d15.5013509!4d73.9134937!16zL20vMDFyanM5?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
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
      name: "Mountain Top Hotel In Manali",
      location: "Near Hadimba Temple, Manali",
      map_url:
        "https://www.google.com/maps/place/Mountain+Top+Hotel+In+Manali/@32.2467599,77.1761911,17z/data=!4m10!3m9!1s0x390487b3074c5263:0x88f26debef2a3364!5m3!1s2025-08-21!4m1!1i2!8m2!3d32.2467554!4d77.178766!16s%2Fg%2F11j2z9xrtg?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "The Orchard Greens",
      location: "Log Huts Area, Manali",
      map_url:
        "https://www.google.com/maps/place/The+Orchard+Greens/@22.2163642,66.7588083,5z/data=!4m17!1m5!2m4!1sThe+Orchard+Greens!5m2!5m1!1s2025-08-21!3m10!1s0x390487d37017db07:0x37fd2c35eb20acd!5m3!1s2025-08-21!4m1!1i2!8m2!3d32.2509122!4d77.1791013!15sChJUaGUgT3JjaGFyZCBHcmVlbnOSAQVob3RlbKoBOhABMh4QASIaKpyluDY9RqaRkeAfA0bRa5aH00ysQBZMaX0yFhACIhJ0aGUgb3JjaGFyZCBncmVlbnPgAQA!16s%2Fg%2F11nnlfqvj_?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Zostel Manali",
      location: "Old Manali",
      map_url:
        "https://www.google.com/maps/place/Zostel+Old+Manali/@32.2561503,77.1607447,15z/data=!4m17!1m5!2m4!1sZostel+Manali!5m2!5m1!1s2025-08-21!3m10!1s0x390487ef1f3cec9f:0xb956108d8eb863db!5m3!1s2025-08-21!4m1!1i2!8m2!3d32.2561503!4d77.1787691!15sCg1ab3N0ZWwgTWFuYWxpIgOIAQFaDyINem9zdGVsIG1hbmFsaZIBBmhvc3RlbKoBXwoNL2cvMTFjMmtjbWRsNQoNL2cvMTFmeGI4aHIyaBABKgoiBnpvc3RlbCgAMh4QASIa3r7SErkQ9AfGlf9cqdsluz94hMtOPxa4DokyERACIg16b3N0ZWwgbWFuYWxp4AEA!16s%2Fg%2F11cn0tv3_n?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Snow Valley Resorts",
      location: "Log Hut Area",
      map_url:
        "https://www.google.com/maps/place/Snow+Valley+Resorts+Manali/@32.2504866,58.7204888,5z/data=!4m17!1m5!2m4!1sSnow+Valley+Resorts!5m2!5m1!1s2025-08-21!3m10!1s0x390487e5d53284a1:0x289892bc86cb3f8e!5m3!1s2025-08-21!4m1!1i2!8m2!3d32.2504866!4d77.1775201!15sChNTbm93IFZhbGxleSBSZXNvcnRzWhUiE3Nub3cgdmFsbGV5IHJlc29ydHOSAQxyZXNvcnRfaG90ZWyqATsQATIeEAEiGpZrLLFvm5YmxF_y0Byr4Pe7n2wv9XH-A0K3MhcQAiITc25vdyB2YWxsZXkgcmVzb3J0c-ABAA!16s%2Fg%2F11bbrls6k8?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Hotel Greenfields",
      location: "Log Hut Road",
      map_url:
        "https://www.google.com/maps/place/Hotel+Greenfields/@32.2503995,77.1751453,17z/data=!3m1!4b1!4m10!3m9!1s0x390487e8c63628e1:0xb5e4c22e5926af3f!5m3!1s2025-08-21!4m1!1i2!8m2!3d32.2503995!4d77.1777202!16s%2Fg%2F1hd_2q9ht?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
  ],
  restaurants: [
    {
      name: "Cafe 1947",
      cuisine: "Italian, Continental",
      location: "Old Manali",
      map_url:
        "https://www.google.com/maps/place/Cafe+1947/@32.2682215,77.1579611,14z/data=!4m14!1m2!2m1!1sCafe+1947+-+Old+Manali!3m10!1s0x390487e59b4bcafd:0xe2e46dd4fa66d42c!5m3!1s2025-08-21!4m1!1i2!8m2!3d32.282985!4d77.1805034!15sChZDYWZlIDE5NDcgLSBPbGQgTWFuYWxpWhYiFGNhZmUgMTk0NyBvbGQgbWFuYWxpkgESaXRhbGlhbl9yZXN0YXVyYW50qgFMCg0vZy8xMWg3ZHMwbDJuEAEyHxABIhvYcigcRhnqgWVJ4DSg-P6576dSydkZEKzOOXEyGBACIhRjYWZlIDE5NDcgb2xkIG1hbmFsaeABAA!16s%2Fg%2F11b6bbmzp4?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "The Johnson's Cafe",
      cuisine: "Himachali, Continental",
      location: "Circuit House Road",
      map_url:
        "https://www.google.com/maps/place/The+Johnson's+Cafe+Hotel+%26+Bar/@32.247391,77.185211,17z/data=!4m17!1m5!2m4!1sThe+Johnson's+Cafe!5m2!5m1!1s2025-08-21!3m10!1s0x390487fc401ff40f:0xe4e5c685e58100d5!5m3!1s2025-08-21!4m1!1i2!8m2!3d32.2475075!4d77.1873987!15sChJUaGUgSm9obnNvbidzIENhZmVaFCISdGhlIGpvaG5zb24ncyBjYWZlkgEKcmVzdGF1cmFudKoBUgoML2cvMTFyOW55MjFnEAEqByIDdGhlKAAyHxABIhtRUB-wASdKmLS8QhNcxN4-47HBfA5Of2IRbWgyFhACIhJ0aGUgam9obnNvbidzIGNhZmXgAQA!16s%2Fg%2F11r9ny21g?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Drifters' Inn & Cafe by The Hidden Tribe",
      cuisine: "European, Himachali",
      location: "Old Manali",
      map_url:
        "https://www.google.com/maps/place/Drifters'+Inn+%26+Cafe+by+The+Hidden+Tribe/@32.2550286,77.172434,17z/data=!4m17!1m5!2m4!1sDrifter's+Cafe+-+Old+Manali!5m2!5m1!1s2025-08-21!3m10!1s0x390487e8b4fae4e5:0x72c83cfeb3bfce34!5m3!1s2025-08-21!4m1!1i2!8m2!3d32.2550286!4d77.1769401!15sChtEcmlmdGVyJ3MgQ2FmZSAtIE9sZCBNYW5hbGmSAQNpbm6qAU8KCy9nLzF0aHowMTNnEAEyHxABIhu-RkvZ9GL6-xCZvzpjb_F4atgGfpf9iDadgX4yHRACIhlkcmlmdGVyJ3MgY2FmZSBvbGQgbWFuYWxp4AEA!16s%2Fg%2F1thz013g?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Chopsticks",
      cuisine: "Tibetan, Chinese",
      location: "Mall Road",
      map_url:
        "https://www.google.com/maps/place/Chopsticks+Restaurant/@32.2439296,77.1866324,17z/data=!3m1!4b1!4m6!3m5!1s0x390487fe037474b3:0x12809306c42f972d!8m2!3d32.2439251!4d77.1892073!16s%2Fg%2F11b7tth59f?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Renaissance Manali",
      cuisine: "Multi-Cuisine",
      location: "Mall Road",
      map_url:
        "https://www.google.com/maps/place/Renaissance/@32.2552779,77.174346,17z/data=!3m1!4b1!4m6!3m5!1s0x390487fe64e8049d:0x8dca845b77de5442!8m2!3d32.2552734!4d77.1769209!16s%2Fg%2F11b6jbzqyh?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
  ],
  fuel_stations_on_way: [
    {
      name: "IOCL Fuel Station",
      location: "Chandigarh to Manali Highway",
      map_url:
        "https://www.google.com/maps/place/IndianOil/@30.714531,76.7343672,13z/data=!4m10!1m2!2m1!1sIOCL+Fuel+Station+chandigarh+highway!3m6!1s0x390fecdc4e2c6caf:0x647d2aea3bc2b523!8m2!3d30.714531!4d76.806465!15sCiRJT0NMIEZ1ZWwgU3RhdGlvbiBjaGFuZGlnYXJoIGhpZ2h3YXkiA4gBAVomIiRpb2NsIGZ1ZWwgc3RhdGlvbiBjaGFuZGlnYXJoIGhpZ2h3YXmSAQtnYXNfc3RhdGlvbqoBiQEKDS9nLzExYmM1dGhjZHAKCi9tLzAyNmx6Z3EKCC9tLzAyeXdkEAEqFSIRaW9jbCBmdWVsIHN0YXRpb24oADIfEAEiG1UNYWB6iX9vcXzS84Oq4k0Imw6VNyY0tH_rDDIoEAIiJGlvY2wgZnVlbCBzdGF0aW9uIGNoYW5kaWdhcmggaGlnaHdheeABAA!16s%2Fg%2F1hf2pnlwj?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "HP Petrol Pump",
      location: "Bilaspur",
      map_url:
        "https://www.google.com/maps/place/Hindustan+Petroleum+Corporation+Limited/@22.0671279,82.1113064,13z/data=!4m10!1m2!2m1!1sHP+Petrol+Pump+-+Bilaspur!3m6!1s0x3a280ac4dcdc39ef:0xc561eba058f096a1!8m2!3d22.0671279!4d82.1834042!15sChlIUCBQZXRyb2wgUHVtcCAtIEJpbGFzcHVyIgOIAQGSAQtnYXNfc3RhdGlvbqoBeQoNL2cvMTFiYzZzOHc5MgoKL20vMDI2dDRfXwoIL20vMDV3eTIQASoSIg5ocCBwZXRyb2wgcHVtcCgAMh8QASIbXOtcTLmzyM7PKw4sZkaGhMluX9j8l6xiXlRmMhsQAiIXaHAgcGV0cm9sIHB1bXAgYmlsYXNwdXLgAQA!16s%2Fg%2F11bx2kyrg9?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Bharat Petroleum",
      location: "Sundernagar",
      map_url:
        "https://www.google.com/maps/place/Bharat+Petroleum,+Petrol+Pump+-Kuldip+Chand+And+Sons/@31.5409938,76.8947439,17z/data=!3m2!4b1!5s0x3905199fb89349cb:0xd001abbda99c13f0!4m6!3m5!1s0x390519b01ba7a273:0x23764c676bea9754!8m2!3d31.5409893!4d76.8973188!16s%2Fg%2F11g0g4ymq0?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Shell Petrol Pump",
      location: "Mandi",
      map_url:
        "https://www.google.com/maps/place/Shell+Filling+station/@32.5747802,71.1718805,8z/data=!4m10!1m2!2m1!1sShell+Petrol+Pump+-+Mandi!3m6!1s0x391f7d3f8cddae19:0x8b177e4f28140b81!8m2!3d32.5747802!4d73.4790094!15sChlTaGVsbCBQZXRyb2wgUHVtcCAtIE1hbmRpIgOIAQFaGSIXc2hlbGwgcGV0cm9sIHB1bXAgbWFuZGmSAQtnYXNfc3RhdGlvbqoBegoNL2cvMTFiYzVndGYwZAoIL20vMDV3eTIKCC9tLzBnNXZ5EAEqFSIRc2hlbGwgcGV0cm9sIHB1bXAoADIfEAEiG5hVJxR9GX_d6l54AMyjUx1-A-Ih_-cYi1PItjIbEAIiF3NoZWxsIHBldHJvbCBwdW1wIG1hbmRp4AEA!16s%2Fg%2F11rx3x3lpd?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Reliance Fuel Station",
      location: "Kullu-Manali Road",
      map_url:
        "https://www.google.com/maps/place/Reliance+Petroleum/@32.1074534,76.9982111,12z/data=!4m10!1m2!2m1!1sReliance+Fuel+Station+-+Kullu-Manali+Road!3m6!1s0x39048921967bc90b:0x6351f561077b7347!8m2!3d32.1074534!4d77.1424067!15sCilSZWxpYW5jZSBGdWVsIFN0YXRpb24gLSBLdWxsdS1NYW5hbGkgUm9hZJIBC2dhc19zdGF0aW9uqgF1CggvbS8wMnl3ZBABKhkiFXJlbGlhbmNlIGZ1ZWwgc3RhdGlvbigAMh8QASIbS8y917utQbs7y4B8YrG3fBs_RmwzFhIPtRWdMisQAiIncmVsaWFuY2UgZnVlbCBzdGF0aW9uIGt1bGx1IG1hbmFsaSByb2Fk4AEA!16s%2Fg%2F11f612xfvb?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
  ],
  places_to_visit: [
    {
      name: "Solang Valley",
      description:
        "Adventure paradise for paragliding, zorbing, skiing, and more.",
      map_url:
        "https://www.google.com/maps/place/Solang+Valley/@32.3161825,77.1362475,14z/data=!3m1!4b1!4m6!3m5!1s0x39048725a6136a93:0x95049c93f3995845!8m2!3d32.3161847!4d77.1568471!16s%2Fm%2F02w4lv_?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Rohtang Pass",
      description:
        "Scenic mountain pass with snow activities and stunning views.",
      map_url:
        "https://www.google.com/maps/place/Rohtang+La/@32.3717248,77.2416866,16z/data=!3m1!4b1!4m6!3m5!1s0x39047ef0b27a15ad:0xbfdd7e65efefc66b!8m2!3d32.3716426!4d77.2466221!16zL20vMDNsX2Jo?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Hadimba Temple",
      description: "Ancient wooden temple surrounded by cedar forests.",
      map_url:
        "https://www.google.com/maps/place/Hadimba+Devi+Temple/@32.2483526,77.1789978,17z/data=!3m1!4b1!4m6!3m5!1s0x39048806c068e53d:0x2daa244b3eee879c!8m2!3d32.2483526!4d77.1815727!16zL20vMGdfOHM1?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Old Manali",
      description: "Chill cafes, boho vibe, riverside walks.",
      map_url:
        "https://www.google.com/maps/place/Old+Manali,+Manali,+Himachal+Pradesh+175131/@32.2530276,77.1656102,15z/data=!3m1!4b1!4m6!3m5!1s0x390487e61f6db769:0x53487b951c2dfe55!8m2!3d32.2521478!4d77.1787114!16s%2Fg%2F1pt_gxyhn?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      name: "Vashisht Hot Springs",
      description: "Natural hot water springs with ancient temples.",
      map_url:
        "https://www.google.com/maps/place/Hot+Water+Spring/@32.2668394,77.1669336,14z/data=!3m1!4b1!4m6!3m5!1s0x3904878cbe56d8c7:0xc58733913ea0f702!8m2!3d32.2668416!4d77.1875332!16s%2Fg%2F11b6bpz1cd?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
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
          fuelStopsOnTheWay: plan.fuel_stations_on_way.map((station: any) => ({
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
                    <div>
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
