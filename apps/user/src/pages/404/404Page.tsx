import React from "react";
import { Search, Heart, Sparkles } from "lucide-react";

export const Page404: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-center relative overflow-hidden px-6">
      <Search className="absolute left-[20%] top-[30%] w-10 h-10 text-gray-600" />
      <Heart className="absolute right-[22%] top-[35%] w-10 h-10 text-gray-600" />
      <Sparkles className="absolute left-[35%] top-[40%] w-8 h-8 text-gray-600" />

      <div className="relative flex items-center justify-center">
        <h1 className="text-[225px] font-extrabold tracking-tight text-gray-300">
          404
        </h1>

        <div className="absolute right-[-80px] bottom-[10px] rotate-[12deg]">
          <div className="w-36 h-64 bg-black rounded-[28px] p-2 shadow-2xl">
            <div className="w-full h-full rounded-[22px] bg-gradient-to-b from-[#1e293b] to-[#2563eb] flex flex-col items-center justify-center text-white text-3xl gap-3">
              <div className="flex gap-4">
                <span>✕</span>
                <span>✕</span>
              </div>
              <span className="text-4xl">︵</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[-30px] w-[420px] h-[60px] bg-gray-700/40 blur-xl rounded-full"></div>
      </div>

      <h2 className="text-4xl font-semibold text-gray-200 mt-10">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-400 mt-8 max-w-xl">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <a
        href="/"
        className="mt-6 text-blue-400 hover:text-blue-300 underline"
      >
        Return to Home Page
      </a>
    </div>
  );
};