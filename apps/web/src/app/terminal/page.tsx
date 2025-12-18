"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const ASCII_ART = `
 ██████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗ ██████╗ 
██╔════╝██╔═══██╗████╗ ████║██║████╗  ██║██╔════╝ 
██║     ██║   ██║██╔████╔██║██║██╔██╗ ██║██║  ███╗
██║     ██║   ██║██║╚██╔╝██║██║██║╚██╗██║██║   ██║
╚██████╗╚██████╔╝██║ ╚═╝ ██║██║██║ ╚████║╚██████╔╝
 ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
                 ███████╗ ██████╗  ██████╗ ███╗   ██╗
                 ██╔════╝██╔═══██╗██╔═══██╗████╗  ██║
                 ███████╗██║   ██║██║   ██║██╔██╗ ██║
                 ╚════██║██║   ██║██║   ██║██║╚██╗██║
                 ███████║╚██████╔╝╚██████╔╝██║ ╚████║
                 ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝
`;

const TYPING_MESSAGES = [
  "$ initializing terminal...",
  "$ loading terminal mode...",
  "$ ERROR: module not yet deployed",
  "$ status: UNDER CONSTRUCTION 🚧",
  "$ check back soon...",
];

export default function TerminalPage() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= TYPING_MESSAGES.length) return;

    const currentLine = TYPING_MESSAGES[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          if (newLines.length <= currentLineIndex) {
            newLines.push(currentLine.slice(0, currentCharIndex + 1));
          } else {
            newLines[currentLineIndex] = currentLine.slice(
              0,
              currentCharIndex + 1
            );
          }
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, 30 + Math.random() * 20);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono">
      {/* Header */}
      <div className="fixed top-4 left-4 z-10">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* ASCII Art */}
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-[6px] sm:text-[8px] md:text-xs leading-tight text-green-500/80 mb-8 overflow-x-auto max-w-full"
        >
          {ASCII_ART}
        </motion.pre>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-zinc-900 rounded-lg border border-zinc-700 overflow-hidden shadow-2xl">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border-b border-zinc-700">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-zinc-400">
                bsquared.dev — terminal
              </span>
            </div>

            {/* Terminal content */}
            <div className="p-4 min-h-[200px]">
              {displayedLines.map((line, index) => (
                <div key={index} className="text-sm mb-1">
                  {line}
                </div>
              ))}
              {currentLineIndex < TYPING_MESSAGES.length && (
                <span className="inline-block w-2 h-4 bg-green-500 animate-pulse" />
              )}
            </div>
          </div>
        </motion.div>

        {/* SSH teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-zinc-500 text-sm mb-2">Coming soon:</p>
          <code className="bg-zinc-900 px-4 py-2 rounded border border-zinc-700 text-green-400 text-sm">
            ssh bsquared.dev
          </code>
        </motion.div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.5 }}
          className="mt-6"
        >
          <Button
            variant="outline"
            size="sm"
            asChild
            className="text-zinc-400 border-zinc-700 hover:text-green-400 hover:border-green-500/50"
          >
            <Link
              href="https://github.com/btbishop93/bsquared"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Terminal className="h-4 w-4 mr-2" />
              Follow progress on GitHub
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
