/**
 * Convert hex color to RGB array (normalized 0-1)
 */
export function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "").trim();

  // Handle shorthand (e.g., #fff)
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const match = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  if (!match) {
    return [1, 1, 1];
  }

  return [
    parseInt(match[1], 16) / 255,
    parseInt(match[2], 16) / 255,
    parseInt(match[3], 16) / 255,
  ];
}
