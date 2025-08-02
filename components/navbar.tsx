"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator, LogOut, User, Settings } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import Logout from "@/components/logout";

export default function Navbar() {
  const { data: session } = useSession();
  const [showSignout, setShowSignout] = useState(false);

  const handleSignOut = () => {
    setShowSignout(true);
  };

  // Add effect to disable scrolling when logout component is shown
  useEffect(() => {
    if (showSignout) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSignout]);

  return (
    <>
      {showSignout && (
        // <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center blur-background">
        //   <div className="no-blur">
        //     <Logout setsignout={setShowSignout} />
        //   </div>
        // </div>
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/30">
          <div className="relative z-[60] max-w-md w-full">
            <Logout setsignout={setShowSignout} />
          </div>
          <div className="fixed inset-0 z-50 bg-transparent" onClick={() => setShowSignout(false)}></div>
        </div>
      )}
      <nav
        className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 ${
          showSignout ? "blur-sm" : ""
        }`}
      >
        <div className=" mx-auto px-8 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center space-x-1">
            <img
              src="/Splits_logo.png"
              alt="logo"
              className="w-12 h-12 sm:w-12 sm:h-12 md:w-12 md:h-12 "
            />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Splits
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session?.user?.image || ""}
                      alt={session?.user?.name || ""}
                    />
                    <AvatarFallback>
                      {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{session?.user?.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <Link href="/">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  );
}
