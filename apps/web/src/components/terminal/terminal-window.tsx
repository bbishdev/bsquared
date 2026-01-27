"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ResizableContainer } from "./resizable-container";
import { TitleBar } from "./title-bar";
import { WelcomeSection } from "./welcome";
import { MessageList, type TerminalMessage } from "./message-list";
import { TerminalInput } from "./input";
import { TerminalFooter } from "./footer";
import { HardcoreDock } from "./hardcore-dock";
import { createTUI, type TUIData } from "@bsquared/tui";
import type { CommandOption } from "./command-autocomplete";

interface TerminalWindowProps {
  data: TUIData;
}

export function TerminalWindow({ data }: TerminalWindowProps) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<TerminalMessage[]>([]);
  const tuiRef = useRef<ReturnType<typeof createTUI> | null>(null);
  const outputBufferRef = useRef<string>("");

  const handleMinimize = useCallback(() => {
    setIsMinimizing(true);
  }, []);

  const handleMinimizeComplete = useCallback(() => {
    setIsMinimized(true);
    setIsMinimizing(false);
  }, []);

  const handleRestore = useCallback(() => {
    setIsMinimized(false);
  }, []);

  const handleMaximize = useCallback(() => {
    setIsMaximized((prev) => !prev);
  }, []);

  // Initialize TUI once
  useEffect(() => {
    const tui = createTUI({ data, welcome: "", prompt: "" });
    tuiRef.current = tui;

    tui.onOutput((text) => {
      if (!text) return;
      outputBufferRef.current += text;
    });

    return () => {
      tuiRef.current = null;
    };
  }, [data]);

  // Get available commands for autocomplete
  const commands: CommandOption[] = useMemo(() => {
    if (!tuiRef.current) {
      return [
        { name: "help", description: "List all available commands" },
        { name: "about", description: "Learn about Brenden" },
        { name: "tldr", description: "Quick summary" },
        { name: "resume", description: "View work experience and education" },
        { name: "skills", description: "View technical skills" },
        { name: "projects", description: "View personal projects" },
        { name: "writing", description: "View blog posts and articles" },
        { name: "links", description: "Get social links and contact info" },
        { name: "clear", description: "Clear the terminal screen" },
      ];
    }

    const dispatcher = tuiRef.current.getDispatcher?.();
    if (!dispatcher) return [];

    return dispatcher.getCommands().map((cmd) => ({
      name: cmd.name,
      description: cmd.description,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (input: string) => {
      if (!input.trim() || !tuiRef.current) return;

      if (showWelcome) {
        setShowWelcome(false);
      }

      if (input.trim().toLowerCase() === "/clear") {
        setMessages([]);
        return;
      }

      const userMessage: TerminalMessage = {
        id: `user-${Date.now()}`,
        type: "user",
        content: input,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMessage]);

      setIsProcessing(true);
      outputBufferRef.current = "";
      await tuiRef.current.handleInput(input);

      if (outputBufferRef.current) {
        const systemMessage: TerminalMessage = {
          id: `system-${Date.now()}`,
          type: "system",
          content: outputBufferRef.current.trim(),
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, systemMessage]);
      }

      setIsProcessing(false);
    },
    [showWelcome],
  );

  // Terminal content component (shared between normal and maximized modes)
  const terminalContent = (
    <div
      className={`bg-[#0c0c0c] border border-zinc-800 border-t-0 overflow-hidden h-full flex flex-col font-mono ${isMaximized ? "" : "rounded-b-lg"}`}
    >
      {/* Welcome section - shown initially, scrollable */}
      {showWelcome && (
        <div className="flex-1 min-h-0 overflow-auto terminal-scrollbar">
          <WelcomeSection onCommandClick={handleSubmit} />
        </div>
      )}

      {/* Message list - React-based output, scrollable */}
      {!showWelcome && <MessageList messages={messages} />}

      {/* Styled input with autocomplete - fixed, never shrinks */}
      <div className="shrink-0">
        <TerminalInput
          onSubmit={handleSubmit}
          disabled={isProcessing}
          commands={commands}
        />
      </div>

      {/* Footer hints - fixed, never shrinks */}
      <div className="shrink-0">
        <TerminalFooter />
      </div>
    </div>
  );

  return (
    <>
      {/* Terminal window with exit animation */}
      {/* Maximized mode */}
      <AnimatePresence>
        {isMaximized && !isMinimized && (
          <motion.div
            key="terminal-max"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isMinimizing
                ? { opacity: 0, scale: 0.1, y: window.innerHeight / 2 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: isMinimizing ? 0.35 : 0.15,
              ease: isMinimizing ? [0.4, 0, 0.2, 1] : "easeOut",
            }}
            onAnimationComplete={() => {
              if (isMinimizing) {
                handleMinimizeComplete();
              }
            }}
            className="fixed inset-0 z-50"
          >
            <div className="w-full h-full flex flex-col">
              <TitleBar
                showCompactLogo={!showWelcome}
                onMinimize={handleMinimize}
                onMaximize={handleMaximize}
                isMaximized={true}
              />
              <div className="flex-1 min-h-0">{terminalContent}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Normal windowed mode - always mounted to preserve size/position */}
      {!isMaximized && (
        <ResizableContainer
          minWidth={400}
          minHeight={200}
          defaultWidth={840}
          defaultHeight={768}
          titleBarHeight={44}
          isMinimizing={isMinimizing}
          isHidden={isMinimized && !isMinimizing}
          onMinimizeComplete={handleMinimizeComplete}
          titleBar={
            <TitleBar
              showCompactLogo={!showWelcome}
              onMinimize={handleMinimize}
              onMaximize={handleMaximize}
              isMaximized={false}
            />
          }
        >
          {terminalContent}
        </ResizableContainer>
      )}

      {/* Dock appears when minimized */}
      <AnimatePresence>
        {isMinimized && <HardcoreDock onRestore={handleRestore} />}
      </AnimatePresence>
    </>
  );
}
