"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  CommandAutocomplete,
  type CommandOption,
} from "./command-autocomplete";

interface TerminalInputProps {
  onSubmit: (input: string) => void;
  disabled?: boolean;
  placeholder?: string;
  commands?: CommandOption[];
}

export function TerminalInput({
  onSubmit,
  disabled,
  placeholder,
  commands = [],
}: TerminalInputProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if we should show autocomplete
  const showAutocomplete = input.startsWith("/") && input.length >= 1;
  const filter = input.slice(1); // Text after "/"

  // Get filtered commands for keyboard navigation
  const filteredCommands = useMemo(
    () =>
      commands.filter((cmd) =>
        cmd.name.toLowerCase().startsWith(filter.toLowerCase()),
      ),
    [commands, filter],
  );

  // Reset selection when filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filter]);

  // Focus input on mount and when enabled
  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const selectCommand = useCallback((commandName: string) => {
    setInput(`/${commandName}`);
    setSelectedIndex(0);
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Handle autocomplete navigation
      if (showAutocomplete && filteredCommands.length > 0) {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1,
          );
          return;
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0,
          );
          return;
        } else if (e.key === "Tab") {
          e.preventDefault();
          const selected = filteredCommands[selectedIndex];
          if (selected) {
            selectCommand(selected.name);
          }
          return;
        } else if (e.key === "Escape") {
          setInput("");
          return;
        }
      }

      // Handle submit
      if (e.key === "Enter" && input.trim() && !disabled) {
        // If autocomplete is open and something is selected, use that
        if (showAutocomplete && filteredCommands.length > 0) {
          const selected = filteredCommands[selectedIndex];
          if (selected && filter !== selected.name) {
            // Complete the command first, then submit on next enter
            selectCommand(selected.name);
            return;
          }
        }

        onSubmit(input);
        setHistory((prev) => [...prev, input]);
        setHistoryIndex(-1);
        setInput("");
      } else if (e.key === "ArrowUp" && !showAutocomplete) {
        e.preventDefault();
        if (history.length > 0) {
          const newIndex =
            historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
          setHistoryIndex(newIndex);
          setInput(history[history.length - 1 - newIndex] || "");
        }
      } else if (e.key === "ArrowDown" && !showAutocomplete) {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(history[history.length - 1 - newIndex] || "");
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInput("");
        }
      }
    },
    [
      input,
      history,
      historyIndex,
      disabled,
      onSubmit,
      showAutocomplete,
      filteredCommands,
      selectedIndex,
      selectCommand,
      filter,
    ],
  );

  return (
    <div className="relative border-t border-zinc-800 bg-zinc-900/30 p-3">
      {/* Command autocomplete dropdown */}
      <CommandAutocomplete
        commands={commands}
        filter={filter}
        selectedIndex={selectedIndex}
        onSelect={selectCommand}
        visible={showAutocomplete}
      />

      <div
        className="flex items-center gap-2 bg-zinc-800/40 rounded-md px-3 py-2 
                   border border-zinc-700/50 focus-within:border-zinc-600 
                   transition-colors"
        onClick={() => inputRef.current?.focus()}
      >
        <span className="text-cyan-500 select-none">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder ?? "Type / for commands, or ask anything..."}
          className="flex-1 bg-transparent outline-none text-zinc-200 
                     placeholder:text-zinc-600 text-sm caret-zinc-400"
          autoComplete="off"
          spellCheck={false}
        />
        {/* Blinking cursor indicator when input is empty */}
        {!input && (
          <span className="w-2 h-4 bg-zinc-400 animate-pulse rounded-sm" />
        )}
      </div>
    </div>
  );
}
