"use client";

import { Fragment } from "react";

/**
 * ANSI escape code parser that converts terminal output to React elements
 * Supports basic colors, bold, dim, underline, and reset
 */

interface TextSegment {
  text: string;
  styles: {
    bold?: boolean;
    dim?: boolean;
    underline?: boolean;
    color?: string;
  };
}

// ANSI color codes to CSS colors (matching our terminal theme)
const ANSI_COLORS: Record<number, string> = {
  30: "#0c0c0c", // black
  31: "#ef4444", // red
  32: "#22c55e", // green
  33: "#eab308", // yellow
  34: "#3b82f6", // blue
  35: "#a855f7", // magenta
  36: "#22d3ee", // cyan
  37: "#d4d4d4", // white
  90: "#525252", // bright black (dim)
  91: "#f87171", // bright red
  92: "#4ade80", // bright green
  93: "#facc15", // bright yellow
  94: "#60a5fa", // bright blue
  95: "#c084fc", // bright magenta
  96: "#67e8f9", // bright cyan
  97: "#ffffff", // bright white
};

function parseAnsi(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  const ansiRegex = /\x1b\[([0-9;]*)m/g;

  let lastIndex = 0;
  let currentStyles: TextSegment["styles"] = {};
  let match;

  while ((match = ansiRegex.exec(text)) !== null) {
    // Add text before this escape sequence
    if (match.index > lastIndex) {
      const textBefore = text.slice(lastIndex, match.index);
      if (textBefore) {
        segments.push({ text: textBefore, styles: { ...currentStyles } });
      }
    }

    // Parse the escape sequence
    const codes = match[1].split(";").map(Number);

    for (const code of codes) {
      if (code === 0) {
        // Reset
        currentStyles = {};
      } else if (code === 1) {
        // Bold
        currentStyles.bold = true;
      } else if (code === 2) {
        // Dim
        currentStyles.dim = true;
      } else if (code === 4) {
        // Underline
        currentStyles.underline = true;
      } else if (code === 22) {
        // Normal intensity (not bold, not dim)
        currentStyles.bold = false;
        currentStyles.dim = false;
      } else if (code === 24) {
        // Underline off
        currentStyles.underline = false;
      } else if (code >= 30 && code <= 37) {
        // Foreground color
        currentStyles.color = ANSI_COLORS[code];
      } else if (code >= 90 && code <= 97) {
        // Bright foreground color
        currentStyles.color = ANSI_COLORS[code];
      } else if (code === 39) {
        // Default foreground
        currentStyles.color = undefined;
      }
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    const remaining = text.slice(lastIndex);
    if (remaining) {
      segments.push({ text: remaining, styles: { ...currentStyles } });
    }
  }

  return segments;
}

function segmentToStyle(styles: TextSegment["styles"]): React.CSSProperties {
  const css: React.CSSProperties = {};

  if (styles.bold) css.fontWeight = "bold";
  if (styles.dim) css.opacity = 0.6;
  if (styles.underline) css.textDecoration = "underline";
  if (styles.color) css.color = styles.color;

  return css;
}

interface AnsiTextProps {
  text: string;
  className?: string;
}

export function AnsiText({ text, className }: AnsiTextProps) {
  // Split by lines first to preserve line breaks
  const lines = text.split("\n");

  return (
    <div className={className}>
      {lines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          {lineIndex > 0 && <br />}
          {parseAnsi(line).map((segment, segIndex) => (
            <span key={segIndex} style={segmentToStyle(segment.styles)}>
              {segment.text}
            </span>
          ))}
        </Fragment>
      ))}
    </div>
  );
}
