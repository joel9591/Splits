"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ITripClient } from "@/lib/types";
import { Download, ArrowLeft, Loader2, Trash, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TripHistoryProps {
  setShowHistory: (show: boolean) => void;
}

export default function TripHistory({ setShowHistory }: TripHistoryProps) {
  const [trips, setTrips] = useState<ITripClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tripToDelete, setTripToDelete] = useState<string | null>(null);
  const [showClearHistoryConfirm, setShowClearHistoryConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTrips = async () => {
    try {
      const response = await fetch("/api/trips");
      if (!response.ok) {
        throw new Error("Failed to fetch trips");
      }
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast.error("Failed to load trip history");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const downloadPdf = (pdfUrl: string) => {
    window.open(pdfUrl, "_blank");
  };

  const handleDeleteTrip = async () => {
    if (!tripToDelete) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/trips/${tripToDelete}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete trip");
      }
      
      setTrips(trips.filter(trip => trip._id !== tripToDelete));
      toast.success("Trip deleted successfully");
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast.error("Failed to delete trip");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
      setTripToDelete(null);
    }
  };

  const handleClearHistory = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch("/api/trips/clear-history", {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to clear trip history");
      }
      
      setTrips([]);
      toast.success("Trip history cleared successfully");
    } catch (error) {
      console.error("Error clearing trip history:", error);
      toast.error("Failed to clear trip history");
    } finally {
      setIsDeleting(false);
      setShowClearHistoryConfirm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <Button 
          onClick={() => setShowHistory(false)} 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Planner
        </Button>
        
        {trips.length > 0 && (
          <Button 
            onClick={() => setShowClearHistoryConfirm(true)} 
            variant="destructive" 
            size="sm"
            className="flex items-center gap-1"
          >
            <Trash className="h-4 w-4" /> Clear All History
          </Button>
        )}
      </div>
      
      <h2 className="text-2xl font-bold">Your Trip History</h2>
      
      {trips.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">You haven't created any trips yet.</p>
            <Button 
              onClick={() => setShowHistory(false)} 
              className="mt-4"
            >
              Create Your First Trip
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Card key={trip._id} className="overflow-hidden hover:shadow-lg transition-shadow relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90 z-10"
                onClick={() => {
                  setTripToDelete(trip._id);
                  setShowDeleteConfirm(true);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <CardTitle className="text-xl">{trip.tripTitle}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(trip.createdAt).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Estimated Cost</h4>
                    <p className="text-lg font-bold text-primary">{trip.estimatedCost}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium">Places</h4>
                      <p>{trip.placesToVisit.length} locations</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Hotels</h4>
                      <p>{trip.hotelsOnTheWay.length} options</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Restaurants</h4>
                      <p>{trip.restaurantsOnTheWay.length} options</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Fuel Stops</h4>
                      <p>{trip.fuelStopsOnTheWay.length} locations</p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => downloadPdf(trip.pdfUrl)} 
                    className="w-full mt-4"
                    variant="outline"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Trip Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Trip</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this trip? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTrip}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear History Confirmation Dialog */}
      <AlertDialog open={showClearHistoryConfirm} onOpenChange={setShowClearHistoryConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear Trip History</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all your trip history? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearHistory}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Clearing...
                </>
              ) : (
                "Clear All"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}