'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AuthError() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const error = searchParams.get('error');
    
    // Map error codes to user-friendly messages
    if (error === 'Configuration') {
      setErrorMessage('There is a problem with the server configuration.');
    } else if (error === 'AccessDenied') {
      setErrorMessage('You do not have access to this resource.');
    } else if (error === 'Verification') {
      setErrorMessage('The verification link may have expired or already been used.');
    } else if (error === 'OAuthSignin' || error === 'OAuthCallback' || error === 'OAuthCreateAccount' || error === 'EmailCreateAccount' || error === 'Callback' || error === 'OAuthAccountNotLinked') {
      setErrorMessage('There was a problem with your authentication provider. Please try again.');
    } else if (error === 'EmailSignin') {
      setErrorMessage('The email could not be sent.');
    } else if (error === 'CredentialsSignin') {
      setErrorMessage('The email or password you entered is incorrect.');
    } else if (error === 'SessionRequired') {
      setErrorMessage('Please sign in to access this page.');
    } else if (error === 'Default') {
      setErrorMessage('An unknown error occurred.');
    } else {
      setErrorMessage('An authentication error occurred. Please try again.');
    }
  }, [searchParams]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Authentication Error</CardTitle>
          <CardDescription className="text-center">
            There was a problem signing you in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button 
            className="w-full" 
            onClick={() => router.push('/auth/signin')}
          >
            Back to Sign In
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => router.push('/')}
          >
            Go to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}