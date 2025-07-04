"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { User, MessageCircle, Bot, Brain, Sparkles } from "lucide-react";

const steps = [
  { icon: User, label: "User" },
  { icon: MessageCircle, label: "Chat Window" },
  { icon: Bot, label: "AI Agents" },
  { icon: Brain, label: "AI Engine" },
  { icon: Sparkles, label: "Final Output" },
];

export function FlowchartScroll({ className }: { className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Animate the path line based on scroll progress
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={cn("relative h-[200vh] w-full", className)}>
      <div className="sticky top-32 z-10 flex items-center justify-center h-[400px] md:h-[500px]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid meet"
          className="absolute left-0 top-0 w-full h-full"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d="M100 200 C 250 50, 450 350, 600 200 S 950 50, 1100 200"
            stroke="#38bdf8"
            strokeWidth="4"
            fill="none"
            style={{ pathLength }}
            filter="url(#glow)"
          />
        </svg>

        {/* Nodes */}
        <div className="flex w-full max-w-[1200px] justify-between items-center px-4">
          {steps.map((step) => (
            <div
              key={step.label}
              className="flex flex-col items-center group relative z-20"
            >
              <div className="bg-gradient-to-br from-[#38bdf8] to-[#6366f1] rounded-full p-3 shadow-xl group-hover:scale-110 transition-transform">
                <step.icon className="text-white w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="text-sm md:text-base mt-2 text-white font-medium text-center">
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FlowchartScroll;
