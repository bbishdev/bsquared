"use client";

export function TerminalFooter() {
  return (
    <div className="flex items-center justify-between px-4 py-2 text-xs border-t border-zinc-800/50">
      <div className="text-zinc-600">
        <span className="text-zinc-500">enter</span> send
        <span className="mx-3 text-zinc-700">|</span>
        <span className="text-zinc-500">up/down</span> history
      </div>
      <div className="text-zinc-600">
        <span className="text-zinc-500">AI Agent</span>
        <span className="ml-2 text-zinc-700">coming soon</span>
      </div>
    </div>
  );
}
