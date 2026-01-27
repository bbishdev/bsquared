"use client";

import { motion } from "motion/react";
import { Terminal } from "lucide-react";

interface CommandRowProps {
  cmd: string;
  desc: string;
  onClick?: (cmd: string) => void;
}

function CommandRow({ cmd, desc, onClick }: CommandRowProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(cmd)}
      className="flex items-center gap-6 py-1 px-2 rounded hover:bg-zinc-800/50 transition-colors group w-full"
    >
      <span className="text-yellow-500 font-medium w-20 text-left group-hover:text-yellow-400">
        {cmd}
      </span>
      <span className="text-zinc-500 group-hover:text-zinc-400">{desc}</span>
    </button>
  );
}

interface WelcomeSectionProps {
  onCommandClick?: (cmd: string) => void;
}

export function WelcomeSection({ onCommandClick }: WelcomeSectionProps) {
  const commands = [
    { cmd: "/help", desc: "show all commands" },
    { cmd: "/about", desc: "learn about brenden" },
    { cmd: "/resume", desc: "view work experience" },
    { cmd: "/skills", desc: "view technical skills" },
    { cmd: "/projects", desc: "view personal projects" },
    { cmd: "/links", desc: "get social links" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 flex flex-col items-center justify-center py-12 px-4 overflow-auto terminal-scrollbar"
    >
      {/* Terminal Icon - matches mode-selector hover state */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="rounded-xl p-4 mb-4"
        style={{
          backgroundColor: "rgba(127, 29, 29, 0.6)", // dark red background
          boxShadow:
            "0 0 30px rgba(239, 68, 68, 0.3), 0 0 60px rgba(239, 68, 68, 0.15)",
        }}
      >
        <Terminal
          className="h-10 w-10 md:h-12 md:w-12 text-red-400"
          strokeWidth={1.5}
        />
      </motion.div>

      {/* Logo */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl md:text-5xl font-black tracking-widest uppercase text-red-500"
        style={{
          textShadow:
            "0 0 30px rgba(239, 68, 68, 0.5), 0 0 60px rgba(239, 68, 68, 0.3)",
        }}
      >
        HARDCORE
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-3 text-zinc-500 text-sm"
      >
        terminal portfolio experience
      </motion.p>

      {/* Command list */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-10 flex flex-col items-center"
      >
        {commands.map((c, i) => (
          <motion.div
            key={c.cmd}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.05, duration: 0.3 }}
          >
            <CommandRow cmd={c.cmd} desc={c.desc} onClick={onCommandClick} />
          </motion.div>
        ))}
      </motion.div>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-10 text-zinc-600 text-xs"
      >
        or just ask me anything in plain english
      </motion.p>
    </motion.div>
  );
}
