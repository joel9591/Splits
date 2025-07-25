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

// AI Trip Planner Button with animation
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
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: `linear-gradient(${position}deg, #4f46e5, #8b5cf6, #ec4899, #3b82f6, #4f46e5)`,
        backgroundSize: "400% 400%",
      }}
    >
      <div className="relative z-10 rounded-full bg-white dark:bg-gray-900 px-6 py-2 font-medium transition-all duration-200 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.99 6.57 2.64" />
          <path d="M21 3v9h-9" />
        </svg>
        Plan Trip with AI
      </div>
    </button>
  );
}