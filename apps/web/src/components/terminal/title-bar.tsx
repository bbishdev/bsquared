"use client";

import { Terminal, Maximize, Minimize, Minus, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface TitleBarProps {
  showCompactLogo?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  isMaximized?: boolean;
}

export function TitleBar({
  showCompactLogo = false,
  onMinimize,
  onMaximize,
  onClose,
  isMaximized = false,
}: TitleBarProps) {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push("/");
    }
  };

  const handleMinimize = () => {
    onMinimize?.();
  };

  const handleMaximize = () => {
    onMaximize?.();
  };

  return (
    <div
      className={`flex items-center gap-2 px-4 py-3 bg-zinc-900 border border-zinc-800 border-b-0 select-none h-11 ${isMaximized ? "" : "rounded-t-lg"}`}
    >
      {/* Window controls - functional buttons, prevent drag on this area */}
      <div
        className="flex gap-2 group cursor-default"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="w-4 h-4 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors
                     flex items-center justify-center"
          title="Close"
        >
          <X
            className="h-2 w-2 text-red-900 opacity-0 group-hover:opacity-100"
            strokeWidth={5}
          />
        </button>
        <button
          type="button"
          onClick={handleMinimize}
          className="w-4 h-4 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors
                     flex items-center justify-center"
          title="Minimize"
        >
          <Minus
            className="h-2 w-2 text-yellow-900 opacity-0 group-hover:opacity-100"
            strokeWidth={5}
          />
        </button>
        <button
          type="button"
          onClick={handleMaximize}
          className="w-4 h-4 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors
                     flex items-center justify-center"
          title={isMaximized ? "Exit Fullscreen" : "Fullscreen"}
        >
          {isMaximized ? (
            <Minimize
              className="h-2 w-2 text-green-900 opacity-0 group-hover:opacity-100"
              strokeWidth={5}
            />
          ) : (
            <Maximize
              className="h-2 w-2 text-green-900 opacity-0 group-hover:opacity-100"
              strokeWidth={5}
            />
          )}
        </button>
      </div>

      {/* Title area - centered */}
      <div className="flex-1 flex items-center justify-center">
        {showCompactLogo ? (
          // Compact logo for active terminal mode
          <div className="flex items-center gap-2">
            <div
              className="rounded-md p-1.5"
              style={{
                backgroundColor: "rgba(127, 29, 29, 0.5)",
                boxShadow: "0 0 15px rgba(239, 68, 68, 0.25)",
              }}
            >
              <Terminal className="h-3 w-3 text-red-400" strokeWidth={2} />
            </div>
            <span
              className="text-sm font-black tracking-widest uppercase text-red-500 font-mono"
              style={{
                textShadow: "0 0 10px rgba(239, 68, 68, 0.5)",
              }}
            >
              HARDCORE
            </span>
          </div>
        ) : (
          // Default title
          <span className="text-xs text-zinc-500 font-mono">
            Brenden Bishop
          </span>
        )}
      </div>

      {/* Drag hint */}
      <span className="text-xs text-zinc-700 font-mono">drag to move</span>
    </div>
  );
}
