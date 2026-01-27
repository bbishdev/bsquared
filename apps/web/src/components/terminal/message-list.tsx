"use client";

import { useRef, useEffect, useCallback } from "react";
import { AnsiText } from "./ansi-parser";

export interface TerminalMessage {
  id: string;
  type: "user" | "system";
  content: string;
  timestamp: number;
}

interface MessageListProps {
  messages: TerminalMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle wheel events even when input is focused
  const handleWheel = useCallback((e: React.WheelEvent) => {
    const container = containerRef.current;
    if (!container) return;

    // Scroll the container
    container.scrollTop += e.deltaY;

    // Prevent the event from bubbling to avoid double-scroll
    e.stopPropagation();
  }, []);

  // Empty state - still takes flex space but shows nothing
  if (messages.length === 0) {
    return <div className="flex-1 min-h-0" />;
  }

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 py-2 space-y-1 terminal-scrollbar"
    >
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`
            py-2 px-3 rounded-md
            ${
              msg.type === "user"
                ? "bg-zinc-800/50 border-l-2 border-cyan-500/50"
                : "bg-transparent"
            }
          `}
        >
          {msg.type === "user" ? (
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 select-none">❯</span>
              <span className="text-zinc-100 break-words whitespace-pre-wrap">
                {msg.content}
              </span>
            </div>
          ) : (
            <AnsiText
              text={msg.content}
              className="text-zinc-300 break-words whitespace-pre-wrap leading-relaxed"
            />
          )}
        </div>
      ))}
    </div>
  );
}
