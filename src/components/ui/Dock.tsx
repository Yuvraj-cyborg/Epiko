"use client";

import React from "react";
import Link from "next/link";
import { Bot } from "lucide-react";
import LoginButton from "@/components/login-button";

export default function Dock() {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center justify-center w-[500px] h-16 px-6 bg-black/30 backdrop-blur-lg rounded-full shadow-lg border border-white/10">
        <nav className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">EPiko</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/chat/dev" className="text-sm text-gray-300 hover:text-white transition-colors">
              Chat
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <LoginButton />
          </div>
        </nav>
      </div>
    </div>
  );
} 