import Link from "next/link";
import { headers } from "next/headers";
import { HardcoreBackground } from "@/components/terminal/hardcore-background";
import { TerminalWindow } from "@/components/terminal/terminal-window";
import { loadTUIData } from "@/lib/tui-data";

export const metadata = {
  title: "Hardcore Mode | Brenden Bishop",
  description: "Terminal interface for exploring Brenden's portfolio",
};

export default async function HardcorePage() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );

  if (isMobile) {
    return (
      <main className="min-h-screen bg-black text-zinc-100">
        <div className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.12),transparent_55%)]" />
          <div className="relative w-full rounded-2xl border border-zinc-800 bg-zinc-950/90 p-8 shadow-[0_0_50px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Hardcore Mode
            </div>
            <h1 className="mt-4 text-3xl font-mono font-semibold text-zinc-100">
              Desktop only
            </h1>
            <p className="mt-4 text-base text-zinc-400">
              The Hardcore terminal experience is not available on mobile. For the
              best experience on this device, switch to Normal mode.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/home"
                className="inline-flex items-center justify-center rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-red-400"
              >
                Go to Normal mode
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white"
              >
                Back to mode selector
              </Link>
            </div>
            <div className="mt-6 text-xs font-mono text-zinc-600">
              Tip: open on desktop for the full terminal.
            </div>
          </div>
        </div>
      </main>
    );
  }

  const data = loadTUIData();

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <HardcoreBackground />
      {/* Centered terminal container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
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
