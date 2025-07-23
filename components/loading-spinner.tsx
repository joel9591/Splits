export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white space-y-6">
      {/* Spinner */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-dashed border-blue-500 rounded-full animate-spin-fast"></div>
        <div className="absolute inset-4 border-4 border-dotted border-purple-500 rounded-full animate-reverse-spin"></div>
      </div>

      {/* Animated Text */}
      <div className="flex space-x-1 text-2xl font-bold text-gray-700">
        {"Splitting...".split("").map((letter, index) => (
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
  );
}
