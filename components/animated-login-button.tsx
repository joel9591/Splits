"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AnimatedLoginButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function AnimatedLoginButton({
  href,
  className,
  children,
}: AnimatedLoginButtonProps) {
  const [position, setPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) return;

    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % 360);
    }, 20);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <Link href={href}>
      <div
        className={cn(
          "relative inline-block overflow-hidden rounded-full p-[3px] transition-all duration-300",
          isHovered ? "scale-105" : "",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: `linear-gradient(${position}deg, #4f46e5, #8b5cf6, #ec4899, #3b82f6, #4f46e5)`,
          backgroundSize: "400% 400%",
        }}
      >
        <div className="relative z-10 rounded-full bg-white dark:bg-gray-900 px-6 py-2 font-medium transition-all duration-200">
          {children}
        </div>
      </div>
    </Link>
  );
}

export function AiTripPlannerButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  const [position, setPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) return;

    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % 360);
    }, 20);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-block overflow-hidden rounded-full p-[3px] transition-all duration-300",
        isHovered ? "scale-105" : "",
        "w-max", // Make the button's width fit its content
        "text-sm sm:text-base w-full lg:w-auto md:w-auto mb-20 lg:mb-0 md:mb-0",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: `linear-gradient(${position}deg, #4f46e5, #8b5cf6, #ec4899, #3b82f6, #4f46e5)`,
        backgroundSize: "400% 400%",
      }}
    >
      <div
        className={cn(
          "relative z-10 rounded-full bg-white dark:bg-gray-900 font-medium transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2",
          "px-4 py-2 sm:px-6 sm:py-2",
          "whitespace-nowrap" // Prevents text from wrapping
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" // Add flex-shrink-0 to SVG
        >
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.99 6.57 2.64" />
          <path d="M21 3v9h-9" />
        </svg>
        Plan Trip with AI
      </div>
    </button>
  );
}
