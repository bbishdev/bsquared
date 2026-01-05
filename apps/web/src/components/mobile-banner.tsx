"use client";

import { useEffect, useState } from "react";
import { X, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  isMobileDevice,
  hasDismissedMobileBanner,
  dismissMobileBanner,
} from "@/lib/device";

export function MobileBanner() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only show on mobile if not previously dismissed
    if (isMobileDevice() && !hasDismissedMobileBanner()) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    dismissMobileBanner();
    setIsVisible(false);
  };

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted || !isVisible) return null;

  return (
    <>
      {/* Spacer to push content down */}
      <div className="h-14" />
      {/* Fixed banner */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900",
          "border-b border-zinc-700",
          "px-4 py-3",
          "flex items-center justify-between gap-3"
        )}
      >
        <div className="flex items-center gap-3 text-sm text-zinc-300">
          <Monitor className="h-4 w-4 shrink-0 text-blue-400" />
          <span>
            For the full experience including{" "}
            <span className="font-mono text-red-400">HARDCORE</span> mode, visit
            on desktop.
          </span>
        </div>
        <button
          onClick={handleDismiss}
          className={cn(
            "shrink-0 rounded-full p-1.5",
            "text-zinc-400 hover:text-white",
            "hover:bg-zinc-700 transition-colors"
          )}
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}

