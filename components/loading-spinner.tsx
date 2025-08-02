
// I:\New folder-Splits\components\LoadingSpinner.tsx
"use client"; // If this component is used in a Client Component

import React from 'react';

export default function LoadingSpinner({ size }: { size: string }) {
  console.log("loader is loading");
  return (
    // Added a style block for the custom animations
    <>
      <style jsx>{`
        @keyframes spin-fast {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes reverse-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg); /* Spin in reverse */
          }
        }

        @keyframes bounce-letter {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px); /* Adjust bounce height as needed */
          }
        }

        .animate-spin-fast {
          animation: spin-fast 1s linear infinite; /* Faster spin */
        }

        .animate-reverse-spin {
          animation: reverse-spin 1.5s linear infinite; /* Slower reverse spin */
        }

        .animate-bounce-letter {
          animation: bounce-letter 0.6s ease-in-out infinite alternate;
        }
      `}</style>

      <div className="w-full lg:w-full flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 space-y-6">
        {/* Spinner */}
        {/* Corrected syntax: template literal inside curly braces */}
        <div className={`${size} relative w-24 h-24`}> 
          <div className="absolute inset-0 border-4 border-dashed border-blue-500 rounded-full animate-spin-fast"></div>
          <div className="absolute inset-4 border-4 border-dotted border-purple-500 rounded-full animate-reverse-spin"></div>
        </div>

        {/* Animated Text */}
        <div className="flex space-x-1 text-2xl font-bold text-gray-700 dark:text-gray-300">
          {"Splitting...".split("").map((letter, index) => ( // Changed text to "Loading..."
            <span
              key={index}
              className={`animate-bounce-letter`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
