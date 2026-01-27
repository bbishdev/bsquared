"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Globe, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModePanelProps {
  mode: "normal" | "hardcore";
  href: string;
  disabled?: boolean;
}

function ModePanel({ mode, href, disabled }: ModePanelProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isNormal = mode === "normal";

  return (
    <Link
      href={disabled ? "#" : href}
      className={cn(
        "relative flex flex-1 flex-col items-center pt-[20vh] md:pt-[35vh]",
        "min-h-[50vh] md:min-h-screen",
        "transition-all duration-500 ease-out",
        "group cursor-pointer",
        isNormal
          ? "bg-linear-to-br from-zinc-900 to-zinc-950"
          : "bg-linear-to-br from-black to-zinc-950",
        disabled && "cursor-not-allowed"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => disabled && e.preventDefault()}
    >
      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Icon */}
        <motion.div
          className={cn(
            "rounded-2xl p-6",
            "transition-all duration-300",
            isNormal
              ? "bg-zinc-800/50 group-hover:bg-blue-500/20"
              : "bg-zinc-900/50 group-hover:bg-red-500/20"
          )}
          animate={{
            rotate: isHovered ? [0, -5, 5, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          {isNormal ? (
            <Globe
              className={cn(
                "h-16 w-16 md:h-20 md:w-20",
                "text-zinc-400 transition-colors duration-300",
                "group-hover:text-blue-400"
              )}
              strokeWidth={1.5}
            />
          ) : (
            <Terminal
              className={cn(
                "h-16 w-16 md:h-20 md:w-20",
                "text-zinc-400 transition-colors duration-300",
                "group-hover:text-red-400"
              )}
              strokeWidth={1.5}
            />
          )}
        </motion.div>

        {/* Label */}
        <div className="text-center">
          {isNormal ? (
            <h2
              className={cn(
                "text-3xl md:text-5xl font-semibold tracking-tight",
                "text-zinc-300 transition-colors duration-300",
                "group-hover:text-white"
              )}
            >
              Normal
            </h2>
          ) : (
            <h2
              className={cn(
                "text-3xl md:text-5xl font-black tracking-widest uppercase",
                "font-mono",
                "text-zinc-400 transition-colors duration-300",
                "group-hover:text-red-400",
                "drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"
              )}
              style={{
                textShadow: isHovered
                  ? "0 0 20px rgba(239, 68, 68, 0.6), 0 0 40px rgba(239, 68, 68, 0.4)"
                  : "none",
              }}
            >
              Hardcore
            </h2>
          )}

          {/* Subtitle */}
          <motion.p
            className={cn(
              "mt-3 text-sm md:text-base",
              "text-zinc-500 transition-colors duration-300",
              isNormal
                ? "group-hover:text-zinc-300"
                : "group-hover:text-zinc-400"
            )}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            {isNormal
              ? "Clean, modern portfolio experience"
              : disabled
              ? "Coming soon... in progress"
              : "Terminal-based experience"}
          </motion.p>

          {/* Disabled badge for hardcore */}
          {disabled && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              className="mt-4 inline-block rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400"
            >
              🚧 Under construction
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Divider line (only on normal side, right edge) */}
      {isNormal && (
        <div className="absolute right-0 top-1/4 hidden h-1/2 w-px bg-linear-to-b from-transparent via-zinc-700 to-transparent md:block" />
      )}
    </Link>
  );
}

export function ModeSelector() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <ModePanel mode="normal" href="/home" />
      <ModePanel mode="hardcore" href="/hardcore" />
    </div>
  );
}

