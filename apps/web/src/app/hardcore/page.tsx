import { TerminalWindow } from "@/components/terminal/terminal-window";
import { loadTUIData } from "@/lib/tui-data";

export const metadata = {
  title: "Hardcore Mode | Brenden Bishop",
  description: "Terminal interface for exploring Brenden's portfolio",
};

export default function HardcorePage() {
  const data = loadTUIData();

  return (
    <main className="min-h-screen bg-black overflow-hidden">
      {/* Centered terminal container */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <TerminalWindow data={data} />

        {/* SSH hint - fixed at bottom */}
        <div className="fixed bottom-4 left-0 right-0 text-center z-10 pointer-events-none">
          <p className="text-zinc-600 text-xs font-mono">
            coming soon: <code className="text-zinc-500">ssh</code>
          </p>
        </div>
      </div>
    </main>
  );
}
