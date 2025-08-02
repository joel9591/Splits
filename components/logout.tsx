// "use client";

// import { useEffect, useState } from "react";
// import { signOut, useSession } from "next-auth/react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { LogOut } from "lucide-react";
// import { useRouter } from "next/navigation";
// import LoadingSpinner from "@/components/loading-spinner";

// interface SignOutProps {
//   setsignout: React.Dispatch<React.SetStateAction<boolean>>;
// }
// export default function Logout({ setsignout }: SignOutProps) {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [isLoading, setIsLoading] = useState(false);

//   // If no session, redirect to sign in
//   useEffect(() => {
//     if (!session && !isLoading) {
//       router.push("/auth/signin");
//     }
//   }, [session, router, isLoading]);

//   const handleSignOut = async () => {
//     setIsLoading(true);
//     try {
//       // Clear all cookies by setting them to expire
//       document.cookie.split(";").forEach((cookie) => {
//         const [name] = cookie.trim().split("=");
//         document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
//       });

//       // Use NextAuth signOut
//       await signOut({ redirect: false });

//       // Redirect to sign in page
//       router.push("/auth/signin");
//     } catch (error) {
//       console.error("Error during sign out:", error);
//       setIsLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setsignout(false);
//   };

//   // if (!session) {
//   //   return (
//   //     <div className="flex justify-center items-center  w-full h-full">
//   //       <LoadingSpinner size="w-24 h-24" />
//   //     </div>
//   //   );
//   // }

//   return (
//     <Card className="w-full max-w-md shadow-lg">
//       <CardHeader className="space-y-1 text-center">
//         <CardTitle className="text-2xl font-bold text-red-700">
//           Sign Out
//         </CardTitle>
//         <CardDescription>
//           Are you sure you want to sign out of your account?
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="flex justify-center">
//         <LogOut className="h-16 w-16 text-gray-400" />
//       </CardContent>
//       <CardFooter className="flex flex-col sm:flex-row gap-3">
//         <Button
//           variant="destructive"
//           className="w-full bg-red-700 hover:bg-red-600 text-white hover:font-bold py-2 px-4 rounded"
//           onClick={handleSignOut}
//           disabled={isLoading}
//         >
//           {isLoading ? "Signing Out" : "Sign Out"}
//         </Button>
//         <Button
//           variant="outline"
//           className="w-full hover:font-bold"
//           onClick={handleCancel}
//           disabled={isLoading}
//         >
//           Cancel
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loading-spinner";

interface SignOutProps {
  setsignout: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Logout({ setsignout }: SignOutProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!session && !isLoading) {
      router.push("/auth/signin");
    }
  }, [session, router, isLoading]);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      // Clear all cookies
      document.cookie.split(";").forEach((cookie) => {
        const [name] = cookie.trim().split("=");
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });

      // Sign out using NextAuth
      await signOut({ redirect: false });

      // Redirect to sign in
      router.push("/auth/signin");
    } catch (error) {
      console.error("Error during sign out:", error);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setsignout(false);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
        <LoadingSpinner size="w-24 h-24" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-red-700">
          Sign Out
        </CardTitle>
        <CardDescription>
          Are you sure you want to sign out of your account?
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <LogOut className="h-16 w-16 text-gray-400" />
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="destructive"
          className="w-full bg-red-700 hover:bg-red-600 text-white hover:font-bold py-2 px-4 rounded"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          {isLoading ? "Signing Out..." : "Sign Out"}
        </Button>
        <Button
          variant="outline"
          className="w-full hover:font-bold"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
