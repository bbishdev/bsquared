import type { Components } from "react-markdown";

/**
 * Custom inline code renderer for react-markdown
 * Renders backtick content with subtle emphasis instead of monospace code styling
 */
export const inlineCodeRenderer: Components["code"] = ({ children }) => {
  return (
    <span className="font-semibold text-foreground">{children}</span>
  );
};
