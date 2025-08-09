"use client";

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
import { Loader2, Calendar as CalendarIcon, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

interface TripFormProps {
  prompt: string;
  setPrompt: (value: string) => void;
  startDate?: Date;
  setStartDate: (date?: Date) => void;
  endDate?: Date;
  setEndDate: (date?: Date) => void;
  members: number | "";
  setMembers: (value: number | "") => void;
  startLocation: string;
  setStartLocation: (value: string) => void;
  endLocation: string;
  setEndLocation: (value: string) => void;
  tripType: string;
  setTripType: (value: string) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function TripForm(props: TripFormProps) {
  const {
    prompt,
    setPrompt,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    members,
    setMembers,
    startLocation,
    setStartLocation,
    endLocation,
    setEndLocation,
    tripType,
    setTripType,
    isLoading,
    handleSubmit,
  } = props;

  return (
    <Card className="mb-12 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-t-lg">
        <CardTitle className="text-white text-2xl font-bold text-center">
          Craft Your Perfect Journey
        </CardTitle>
        <CardDescription className="text-indigo-100 mt-1 text-center">
          Tell us your dream trip, and we'll handle the details.
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
              placeholder="e.g., A spiritual bike trip to Kedarnath from Delhi"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
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
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      startDate.toLocaleDateString()
                    ) : (
                      <span>Pick a date</span>
                    )}
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
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      endDate.toLocaleDateString()
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) => (startDate ? date < startDate : false)}
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
                value={members}
                placeholder="Enter number of people"
                onChange={(e) => {
                  const value = e.target.value;
                  setMembers(value === "" ? "" : parseInt(value));
                }}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="tripType"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Traveling With
              </label>
              <Select value={tripType} onValueChange={setTripType}>
                <SelectTrigger id="tripType">
                  <SelectValue placeholder="Select group type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friends">Friends</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="couple">Couple</SelectItem>
                  <SelectItem value="solo">Solo</SelectItem>
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
              />
            </div>
          </div>

          <Button
            type="submit"
            className="
    relative bg-blue-800 lg:bg-blue-800
    overflow-hidden w-full lg:w-full md:px-8 mt-4 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-purple-700 group animated-button md:w-full
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
                Generate Trip Plan
              </span>
            )}

            <span className="button-border border-top"></span>
            <span className="button-border border-right"></span>
            <span className="button-border border-bottom"></span>
            <span className="button-border border-left"></span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
