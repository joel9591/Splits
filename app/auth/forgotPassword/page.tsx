'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Calculator, Mail, ArrowRight } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [otpSent, setOtpSent] = useState(false);


  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Make a POST request to your backend or API route to handle password reset
      const res = await fetch('/api/auth/forgotPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('OTP sent to your email.');
        router.push(`/auth/verify-otp?email=${email}`);
      } else {
        toast.error(data.message || 'Failed to send reset email.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Splits</span>
          </Link>
          <ThemeToggle />
        </div>

        <Card className="border-none shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
            <CardDescription>
              Enter your email address and we’ll send you a OTP to reset your password.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Send OTP
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              <Link href="/auth/signin" className="text-primary hover:underline font-medium">
                Back to Sign In
              </Link>
            </div>
            
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
