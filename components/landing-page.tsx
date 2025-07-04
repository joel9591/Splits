'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calculator, CreditCard, Shield, Smartphone, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* <Calculator className="h-8 w-8 text-primary" /> */}
            <img src="./Splits_logo.png" alt="Logo" className='w-16' />
            <span className="text-3xl font-bold text-gray-900 dark:text-white">Splits</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Split Expenses
            <span className="text-primary"> Effortlessly</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Share expenses with friends and family. Track who owes what, settle debts instantly, 
            and keep your relationships money-stress free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="px-8 py-3 text-lg">
                Start Splitting Now
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Why Choose Splits?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Group Management</CardTitle>
                <CardDescription>
                  Create groups for different occasions - trips, roommates, dinners, and more.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Calculator className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Smart Splitting</CardTitle>
                <CardDescription>
                  Split equally or customize amounts. Our algorithm handles complex calculations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CreditCard className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Instant Payments</CardTitle>
                <CardDescription>
                  Settle debts instantly with integrated payment gateway. No more IOUs.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your financial data is encrypted and secure. We never store payment details.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Smartphone className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Mobile Friendly</CardTitle>
                <CardDescription>
                  Works perfectly on all devices. Add expenses on-the-go with our mobile app.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Expense Analytics</CardTitle>
                <CardDescription>
                  Track spending patterns and get insights into your group expenses.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="max-w-4xl mx-auto border-none shadow-2xl bg-gradient-to-r from-primary/10 to-purple-500/10">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Simplify Your Expenses?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Join thousands of users who trust Splits for their expense sharing needs.
              </p>
              <Link href="/auth/signup">
                <Button size="lg" className="px-12 py-4 text-lg">
                  Get Started Free
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calculator className="h-6 w-6" />
            <span className="text-xl font-bold">Splits</span>
          </div>
          <p className="text-gray-400">
            © 2024 Splits. All rights reserved. Built with ❤️ for seamless expense sharing.
          </p>
        </div>
      </footer>
    </div>
  );
}