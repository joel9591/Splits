"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Calculator,
  CreditCard,
  Shield,
  Smartphone,
  TrendingUp,
  Map,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import AnimatedLoginButton from "@/components/animated-login-button";

export default function LandingPage() {
  console.log("LandingPage");
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="fixed w-full top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800 m-0 p-0 ">
        <div className=" px-2 sm:px-4 py-2 flex justify-between items-center w-full">
          <div className="flex items-center space-x-0 lg:space-x-2">
            <img
              src="./Splits_logo.png"
              alt="Logo"
              className="w-12 h-12 sm:w-12 sm:h-12 md:w-12 md:h-12 "
            />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Splits
            </span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-3 md:space-x-4  lg:ml-[10%] ">
            <ThemeToggle />
            <AnimatedLoginButton
              href="/auth/signin"
              className="relative z-10 bg-white dark:bg-gray-900 font-medium transition-all duration-200 text-black dark:text-white text-xs px-[1%] py-[3%] shadow-2xl whitespace-nowrap lg:px-[1.2%] lg:py-[2.5%]"
            >
              Sign In
            </AnimatedLoginButton>
            <Link href="/auth/signup">
              <Button className="text-sm h-8 px-2 py-1 whitespace-nowrap font-medium mb-1">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-5 leading-snug">
            Split Expenses
            <span className="text-primary"> Effortlessly 💸</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
            Share expenses with friends and family. Track who owes what, settle
            debts instantly, and keep your relationships money-stress free.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="text-sm sm:text-base px-6 py-2 sm:px-8 sm:py-3 hover:bg-slate-200 hover:text-black"
              >
                Start Splitting Now
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button
                variant="outline"
                size="lg"
                className="text-sm sm:text-base px-6 py-2 sm:px-8 sm:py-3  bg-slate-800 text-white"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Trip Planner Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-900/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
                <Sparkles className="h-4 w-4 mr-2" />
                New Feature
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Plan Your Trips with AI
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6">
                Our new AI-powered trip planner helps you create the perfect
                itinerary for your group travels. Just tell us where you want to
                go, and our AI will suggest the best routes, places to visit,
                hotels, restaurants, and more.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Personalized travel recommendations",
                  "Optimized routes and itineraries",
                  "Budget estimates based on group size",
                  "Downloadable trip plans",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="rounded-full bg-green-500/10 p-1 mr-3 mt-1">
                      <svg
                        className="h-3 w-3 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup">
                <Button
                  className="
    text-white 
    bg-gradient-to-r 
    from-green-500 
    to-purple-600 
    hover:from-blue-500 
    hover:to-purple-600 
    dark:from-secondary 
    dark:to-purple-600 
    dark:hover:from-green-500 
    dark:hover:to-purple-600
  "
                >
                  <Map className="h-4 w-4 mr-2" />
                  Try AI Trip Planner
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-75 blur"></div>
                <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                  <div className="space-y-4">
                    <div className="h-10 w-full rounded-md bg-gray-100 dark:bg-gray-800 flex items-center px-3">
                      <span className="text-gray-500 dark:text-gray-400">
                        I want to go to Goa with my friends for a weekend...
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-8 w-full rounded-md bg-gray-100 dark:bg-gray-800"></div>
                      <div className="h-8 w-full rounded-md bg-gray-100 dark:bg-gray-800"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-8 w-full rounded-md bg-gray-100 dark:bg-gray-800"></div>
                      <div className="h-8 w-full rounded-md bg-gray-100 dark:bg-gray-800"></div>
                    </div>
                    <div className="h-40 w-full rounded-md bg-gray-100 dark:bg-gray-800 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-4 w-4 rounded-full bg-primary"></div>
                        <div className="h-3 w-24 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                        <div className="h-2 w-5/6 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                        <div className="h-2 w-4/6 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Splits?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Users,
                title: "Group Management",
                description:
                  "Create groups for different occasions - trips, roommates, dinners, and more.",
              },
              {
                icon: Calculator,
                title: "Smart Splitting",
                description:
                  "Split equally or customize amounts. Our algorithm handles complex calculations.",
              },
              {
                icon: CreditCard,
                title: "Instant Payments",
                description:
                  "Settle debts instantly with integrated payment gateway. No more IOUs.",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description:
                  "Your financial data is encrypted and secure. We never store payment details.",
              },
              {
                icon: Smartphone,
                title: "Mobile Friendly",
                description:
                  "Works perfectly on all devices. Add expenses on-the-go with our mobile app.",
              },
              {
                icon: Map,
                title: "AI Trip Planning",
                description:
                  "Plan your group trips with our AI assistant. Get personalized recommendations and cost estimates.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader>
                  <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary mb-2" />
                  <CardTitle className="text-lg sm:text-xl">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <Card className="max-w-4xl mx-auto border-none shadow-2xl bg-gradient-to-r from-primary/10 to-purple-500/10">
            <CardContent className="p-6 sm:p-10 md:p-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Simplify Your Expenses?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
                Join thousands of users who trust Splits for their expense
                sharing needs.
              </p>
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="text-sm sm:text-base px-8 sm:px-12 py-3 sm:py-4"
                >
                  Get Started Free
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 px-4 ">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Calculator className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-lg sm:text-xl font-bold">Splits</span>
          </div>
          <p className="text-gray-400 text-sm sm:text-base">
            © 2025 Splits. All rights reserved. Built with ❤️ for seamless
            expense sharing by
          </p>
          <h1 className="text-sm sm:text-base md:text-xl font-semibold md:font-bold text-blue-500 md:text-purple-600 dark:text-white tracking-wide">
            Joel J
          </h1>
        </div>
      </footer>
    </div>
  );
}
