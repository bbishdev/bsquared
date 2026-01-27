"use client";

import { useEffect, useRef } from "react";

export interface CommandOption {
  name: string;
  description: string;
}

interface CommandAutocompleteProps {
  commands: CommandOption[];
  filter: string; // Current input after "/"
  selectedIndex: number;
  onSelect: (command: string) => void;
  visible: boolean;
}

export function CommandAutocomplete({
  commands,
  filter,
  selectedIndex,
  onSelect,
  visible,
}: CommandAutocompleteProps) {
  const listRef = useRef<HTMLDivElement>(null);

  // Filter commands based on input
  const filtered = commands.filter((cmd) =>
    cmd.name.toLowerCase().startsWith(filter.toLowerCase()),
  );

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current && selectedIndex >= 0) {
      const items = listRef.current.querySelectorAll("[data-command-item]");
      items[selectedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  if (!visible || filtered.length === 0) {
    return null;
  }

  return (
    <div
      ref={listRef}
      className="absolute bottom-full left-0 right-0 mb-1 mx-2
                 bg-zinc-900 border border-zinc-700 rounded-md
                 shadow-lg shadow-black/50 overflow-hidden
                 max-h-48 overflow-y-auto z-50"
    >
      {filtered.map((cmd, index) => (
        <button
          key={cmd.name}
          data-command-item
          type="button"
          onClick={() => onSelect(cmd.name)}
          className={`
            w-full px-3 py-2 text-left flex items-center gap-3
            transition-colors duration-75
            ${
              index === selectedIndex
                ? "bg-zinc-700/80 text-white"
                : "text-zinc-300 hover:bg-zinc-800"
            }
          `}
        >
          <span className="text-yellow-400 font-medium min-w-[80px]">
            /{cmd.name}
          </span>
          <span className="text-zinc-500 text-sm truncate">
            {cmd.description}
          </span>
        </button>
      ))}
    </div>
  );
}
