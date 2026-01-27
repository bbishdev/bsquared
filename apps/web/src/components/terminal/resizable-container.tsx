"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | null;

const CURSORS: Record<NonNullable<ResizeDirection>, string> = {
  n: "ns-resize",
  s: "ns-resize",
  e: "ew-resize",
  w: "ew-resize",
  ne: "nesw-resize",
  sw: "nesw-resize",
  nw: "nwse-resize",
  se: "nwse-resize",
};

// Padding from viewport edges (minimal for edge-to-edge dragging)
const VIEWPORT_PADDING = 0;

// Custom cursor SVGs for Safari - maximize-2 style, black stroke with white outline
// NWSE: arrows pointing top-left and bottom-right (↖↘)
const CURSOR_NWSE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 14v6h6' stroke='%23ffffff' stroke-width='5'/%3E%3Cpath d='M20 10V4h-6' stroke='%23ffffff' stroke-width='5'/%3E%3Cpath d='M14 10l6-6' stroke='%23ffffff' stroke-width='5'/%3E%3Cpath d='M10 14l-6 6' stroke='%23ffffff' stroke-width='5'/%3E%3Cpath d='M4 14v6h6'/%3E%3Cpath d='M20 10V4h-6'/%3E%3Cpath d='M14 10l6-6'/%3E%3Cpath d='M10 14l-6 6'/%3E%3C/svg%3E") 9 9, nwse-resize`;
// NESW: arrows pointing top-right and bottom-left (↗↙)
const CURSOR_NESW = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 14v6h-6' stroke='%23ffffff' stroke-width='5'/%3E%3Cpath d='M4 10V4h6' stroke='%23ffffff' stroke-width='5'/%3E%3Cpath d='M10 10L4 4' stroke='%23ffffff' stroke-width='5'/%3E%3Cpath d='M14 14l6 6' stroke='%23ffffff' stroke-width='5'/%3E%3Cpath d='M20 14v6h-6'/%3E%3Cpath d='M4 10V4h6'/%3E%3Cpath d='M10 10L4 4'/%3E%3Cpath d='M14 14l6 6'/%3E%3C/svg%3E") 9 9, nesw-resize`;

interface ResizableContainerProps {
  children: React.ReactNode;
  titleBar?: React.ReactNode;
  minWidth?: number;
  minHeight?: number;
  defaultWidth?: number;
  defaultHeight?: number;
  titleBarHeight?: number;
  className?: string;
  // Animation control
  isMinimizing?: boolean;
  isHidden?: boolean; // When hidden (minimized), used to control restore animation
  onMinimizeComplete?: () => void;
}

export function ResizableContainer({
  children,
  titleBar,
  minWidth = 400,
  minHeight = 200, // title bar + input + minimal content
  defaultWidth = 900,
  defaultHeight = 768,
  titleBarHeight = 44,
  className = "",
  isMinimizing = false,
  isHidden = false,
  onMinimizeComplete,
}: ResizableContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({
    width: defaultWidth,
    height: defaultHeight,
  });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [centered, setCentered] = useState(true); // Start centered, switch to absolute on first drag
  const [resizeDir, setResizeDir] = useState<ResizeDirection>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [minimizeTarget, setMinimizeTarget] = useState<{ x: number; y: number } | null>(null);
  const startRef = useRef({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
  });

  // Calculate minimize translation when isMinimizing becomes true
  useEffect(() => {
    if (isMinimizing && containerRef.current && !minimizeTarget) {
      const rect = containerRef.current.getBoundingClientRect();
      const currentCenterX = rect.left + rect.width / 2;
      const currentCenterY = rect.top + rect.height / 2;
      const targetX = window.innerWidth / 2;
      const targetY = window.innerHeight - 32; // Dock area
      
      setMinimizeTarget({
        x: targetX - currentCenterX,
        y: targetY - currentCenterY,
      });
    } else if (!isMinimizing) {
      setMinimizeTarget(null);
    }
  }, [isMinimizing, minimizeTarget]);

  // Get viewport-based max dimensions
  const getMaxDimensions = useCallback(() => {
    if (typeof window === "undefined")
      return { maxWidth: 1400, maxHeight: 800 };
    return {
      maxWidth: window.innerWidth - VIEWPORT_PADDING * 2,
      maxHeight: window.innerHeight - VIEWPORT_PADDING * 2 - 60, // Extra for nav/footer
    };
  }, []);

  // Initialize size based on viewport on mount
  useEffect(() => {
    if (initialized) return;

    const { maxWidth, maxHeight } = getMaxDimensions();
    const initialWidth = Math.min(defaultWidth, maxWidth);
    const initialHeight = Math.min(defaultHeight, maxHeight);

    setSize({ width: initialWidth, height: initialHeight });
    setInitialized(true);
  }, [defaultWidth, defaultHeight, getMaxDimensions, initialized]);

  // Respond to window resize - constrain terminal to fit
  useEffect(() => {
    const handleWindowResize = () => {
      const { maxWidth, maxHeight } = getMaxDimensions();

      setSize((prev) => ({
        width: Math.max(minWidth, Math.min(prev.width, maxWidth)),
        height: Math.max(minHeight, Math.min(prev.height, maxHeight)),
      }));

      // If not centered, also constrain position
      if (!centered) {
        setPosition((prev) => {
          const newX = Math.max(
            VIEWPORT_PADDING,
            Math.min(prev.x, window.innerWidth - size.width - VIEWPORT_PADDING),
          );
          const newY = Math.max(
            VIEWPORT_PADDING,
            Math.min(
              prev.y,
              window.innerHeight - size.height - VIEWPORT_PADDING,
            ),
          );
          return { x: newX, y: newY };
        });
      }
    };

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [
    centered,
    minWidth,
    minHeight,
    getMaxDimensions,
    size.width,
    size.height,
  ]);

  // Handle resize start
  const startResize = useCallback(
    (dir: ResizeDirection) => (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      e.preventDefault();
      e.stopPropagation();

      const rect = containerRef.current.getBoundingClientRect();

      // Use actual rect position when centered (since position state is 0,0)
      const actualPosX = centered ? rect.left : position.x;
      const actualPosY = centered ? rect.top : position.y;

      startRef.current = {
        x: e.clientX,
        y: e.clientY,
        width: rect.width,
        height: rect.height,
        posX: actualPosX,
        posY: actualPosY,
      };

      // Switch to absolute positioning on first interaction
      if (centered) {
        setPosition({ x: rect.left, y: rect.top });
        setSize({ width: rect.width, height: rect.height }); // Sync size with actual rendered size
        setCentered(false);
      }

      setResizeDir(dir);
    },
    [centered, position],
  );

  // Handle drag start (from title bar)
  const startDrag = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      e.preventDefault();

      const rect = containerRef.current.getBoundingClientRect();
      startRef.current = {
        x: e.clientX,
        y: e.clientY,
        width: rect.width,
        height: rect.height,
        posX: centered ? rect.left : position.x,
        posY: centered ? rect.top : position.y,
      };

      if (centered) {
        setPosition({ x: rect.left, y: rect.top });
        setSize({ width: rect.width, height: rect.height }); // Sync size with actual rendered size
        setCentered(false);
      }

      setIsDragging(true);
    },
    [centered, position],
  );

  // Handle resize drag
  useEffect(() => {
    if (!resizeDir) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y, width, height, posX, posY } = startRef.current;
      const deltaX = e.clientX - x;
      const deltaY = e.clientY - y;
      const { maxWidth, maxHeight } = getMaxDimensions();

      let newWidth = width;
      let newHeight = height;
      let newPosX = posX;
      let newPosY = posY;

      // Horizontal resize
      if (resizeDir.includes("e")) {
        newWidth = Math.max(minWidth, Math.min(maxWidth, width + deltaX));
      } else if (resizeDir.includes("w")) {
        const proposedWidth = width - deltaX;
        newWidth = Math.max(minWidth, Math.min(maxWidth, proposedWidth));
        newPosX = posX + (width - newWidth);
      }

      // Vertical resize
      if (resizeDir.includes("s")) {
        newHeight = Math.max(minHeight, Math.min(maxHeight, height + deltaY));
      } else if (resizeDir.includes("n")) {
        const proposedHeight = height - deltaY;
        newHeight = Math.max(minHeight, Math.min(maxHeight, proposedHeight));
        newPosY = posY + (height - newHeight);
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newPosX, y: newPosY });
    };

    const handleMouseUp = () => {
      setResizeDir(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.userSelect = "none";
    document.body.style.cursor = CURSORS[resizeDir];

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [resizeDir, minWidth, minHeight, getMaxDimensions]);

  // Handle position drag
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y, posX, posY, width, height } = startRef.current;
      const deltaX = e.clientX - x;
      const deltaY = e.clientY - y;

      // Constrain to viewport with padding
      const minX = VIEWPORT_PADDING;
      const minY = VIEWPORT_PADDING;
      const maxX = window.innerWidth - width - VIEWPORT_PADDING;
      const maxY = window.innerHeight - height - VIEWPORT_PADDING;

      const newX = Math.max(minX, Math.min(maxX, posX + deltaX));
      const newY = Math.max(minY, Math.min(maxY, posY + deltaY));

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isDragging]);

  const containerStyle: React.CSSProperties = centered
    ? {
        width: size.width,
        height: size.height,
        maxWidth: "calc(100vw - 120px)", // Responsive max
        maxHeight: "calc(100vh - 180px)", // Responsive max
        visibility: isHidden ? "hidden" : "visible",
        pointerEvents: isHidden ? "none" : "auto",
      }
    : {
        width: size.width,
        height: size.height,
        position: "fixed",
        left: position.x,
        top: position.y,
        visibility: isHidden ? "hidden" : "visible",
        pointerEvents: isHidden ? "none" : "auto",
      };

  // Animation states
  const getAnimateState = () => {
    if (isMinimizing && minimizeTarget) {
      return {
        opacity: 0,
        scale: 0.1,
        x: minimizeTarget.x,
        y: minimizeTarget.y,
      };
    }
    // Normal visible state
    return { opacity: 1, scale: 1, x: 0, y: 0 };
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      style={containerStyle}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={getAnimateState()}
      transition={{ 
        duration: isMinimizing ? 0.35 : 0.15, 
        ease: isMinimizing ? [0.4, 0, 0.2, 1] : "easeOut",
        // Opacity fades slower during minimize
        opacity: { duration: isMinimizing ? 0.4 : 0.15, ease: isMinimizing ? "easeIn" : "easeOut" },
      }}
      onAnimationComplete={() => {
        if (isMinimizing && onMinimizeComplete) {
          onMinimizeComplete();
        }
      }}
    >
      {/* Title bar - draggable */}
      {titleBar && (
        <div
          className="cursor-grab active:cursor-grabbing shrink-0"
          onMouseDown={startDrag}
        >
          {titleBar}
        </div>
      )}

      {/* Main content - fills remaining space */}
      <div
        className="w-full overflow-hidden flex-1 min-h-0"
        style={{
          height: titleBar ? `calc(100% - ${titleBarHeight}px)` : "100%",
        }}
      >
        {children}
      </div>

      {/* Edge resize handles - using row/col-resize for Safari compatibility */}
      <div
        className="absolute top-0 left-4 right-4 h-2 z-10"
        style={{ cursor: "row-resize", background: "rgba(0,0,0,0.001)" }}
        onMouseDown={startResize("n")}
      />
      <div
        className="absolute bottom-0 left-4 right-4 h-2 z-10"
        style={{ cursor: "row-resize", background: "rgba(0,0,0,0.001)" }}
        onMouseDown={startResize("s")}
      />
      <div
        className="absolute left-0 top-4 bottom-4 w-2 z-10"
        style={{ cursor: "col-resize", background: "rgba(0,0,0,0.001)" }}
        onMouseDown={startResize("w")}
      />
      <div
        className="absolute right-0 top-4 bottom-4 w-2 z-10"
        style={{ cursor: "col-resize", background: "rgba(0,0,0,0.001)" }}
        onMouseDown={startResize("e")}
      />

      {/* Corner resize handles - using custom cursors for Safari */}
      <div
        className="absolute top-0 left-0 w-4 h-4 z-20"
        style={{ cursor: CURSOR_NESW, background: "rgba(0,0,0,0.001)" }}
        onMouseDown={startResize("nw")}
      />
      <div
        className="absolute top-0 right-0 w-4 h-4 z-20"
        style={{ cursor: CURSOR_NWSE, background: "rgba(0,0,0,0.001)" }}
        onMouseDown={startResize("ne")}
      />
      <div
        className="absolute bottom-0 left-0 w-4 h-4 z-20"
        style={{ cursor: CURSOR_NWSE, background: "rgba(0,0,0,0.001)" }}
        onMouseDown={startResize("sw")}
      />
      <div
        className="absolute bottom-0 right-0 w-4 h-4 z-20"
        style={{ cursor: CURSOR_NESW, background: "rgba(0,0,0,0.001)" }}
        onMouseDown={startResize("se")}
      />
    </motion.div>
  );
}
