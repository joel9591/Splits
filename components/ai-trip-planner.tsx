"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plane, Loader2 } from "lucide-react";
import { TripPlan, ApiResponse, ITripClient } from "@/lib/types";
import TripForm from "@/components/TripForm";
import TripResults from "@/components/TripResults";
import PresetTrips from "@/components/PresetTrips";

export default function AiTripPlanner() {
  const [prompt, setPrompt] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [members, setMembers] = useState<number | "">("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [tripType, setTripType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTrip, setGeneratedTrip] = useState<ITripClient | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !prompt ||
      !startDate ||
      !endDate ||
      !members ||
      !startLocation ||
      !endLocation ||
      !tripType
    ) {
      toast.error("Please fill all the details to generate your trip plan.", {
        icon: "❌",
        style: {
          color: "#dc2626",
        },
      });
      return;
    }
    setIsLoading(true);
    setGeneratedTrip(null);

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
      setGeneratedTrip({
        _id: result._id,
        tripTitle: result.tripPlan.tripTitle,
        placesToVisit: result.tripPlan.placesToVisit,
        hotelsOnTheWay: result.tripPlan.hotelsOnTheWay,
        restaurantsOnTheWay: result.tripPlan.restaurantsOnTheWay,
        fuelStopsOnTheWay: result.tripPlan.fuelStopsOnTheWay,
        estimatedCost: result.tripPlan.estimatedCost,
        createdBy: result.createdBy,
        pdfUrl: result.pdfUrl,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      });
      toast.success("Your amazing trip plan has been generated and saved!");
    } catch (error: any) {
      console.error("Error generating trip plan:", error);
      toast.error(error.message || "Failed to generate trip plan.", {
        icon: "❌",
        style: {
          color: "#dc2626",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPdf = () => {
    if (!generatedTrip?.pdfUrl) {
      toast.error("No PDF available to download.", {
        icon: "❌",
        style: {
          color: "#dc2626",
        },
      });
      return;
    }
    window.open(generatedTrip.pdfUrl, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
           {" "}
      <TripForm
        prompt={prompt}
        setPrompt={setPrompt}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        members={typeof members === "number" ? members : ""}
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
           {" "}
      {isLoading && (
        <div className="text-center mt-12 flex flex-col items-center justify-center">
                     {" "}
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />       
             {" "}
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Crafting your perfect journey...
          </p>
                 {" "}
        </div>
      )}
           {" "}
      {generatedTrip && !isLoading && (
        <TripResults
          tripPlan={generatedTrip}
          members={typeof members === "number" ? members : 0}
          downloadPdf={downloadPdf}
          pdfId={
            generatedTrip.pdfUrl.split("/").pop()?.replace(".pdf", "") || null
          }
        />
      )}
            {!generatedTrip && !isLoading && <PresetTrips />}   {" "}
    </div>
  );
}
