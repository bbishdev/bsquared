/**
 * Curated UI gradients for fallback when project images are missing.
 * Inspired by gradient.page/ui-gradients
 */

export const UI_GRADIENTS = [
  // Omolon - Deep blue
  "linear-gradient(135deg, #091E3A 0%, #2F80ED 50%, #2D9EE0 100%)",
  // Flare - Warm sunset
  "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
  // Shifter - Purple dream
  "linear-gradient(135deg, #bc4e9c 0%, #f80759 100%)",
  // Relay - Teal vibes
  "linear-gradient(135deg, #3A1C71 0%, #D76D77 50%, #FFAF7B 100%)",
  // Sublime - Deep indigo
  "linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)",
  // Moonlit Asteroid
  "linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)",
  // JShine
  "linear-gradient(135deg, #12c2e9 0%, #c471ed 50%, #f64f59 100%)",
  // Cosmic Fusion
  "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)",
  // Lawrencium
  "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
  // Cool Blues
  "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
  // Piggy Pink
  "linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)",
  // Grade Grey
  "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)",
  // Harvey
  "linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)",
  // Aubergine
  "linear-gradient(135deg, #AA076B 0%, #61045F 100%)",
  // Royal Blue
  "linear-gradient(135deg, #536976 0%, #292E49 100%)",
] as const;

/**
 * Get a consistent gradient for a given string (like project title).
 * Uses simple hash to always return the same gradient for the same input.
 */
export function getGradientForString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  const index = Math.abs(hash) % UI_GRADIENTS.length;
  return UI_GRADIENTS[index];
}
