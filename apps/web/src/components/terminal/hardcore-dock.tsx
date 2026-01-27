"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Terminal, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon, XTwitterIcon } from "@/components/icons";

const socialItems = [
  { href: "https://github.com/bbishdev", icon: GithubIcon, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/brenden-bishop/",
    icon: LinkedinIcon,
    label: "LinkedIn",
  },
  { href: "https://x.com/bbish937", icon: XTwitterIcon, label: "X" },
];

interface HardcoreDockProps {
  onRestore: () => void;
}

export function HardcoreDock({ onRestore }: HardcoreDockProps) {
  const router = useRouter();

  const handleNormalMode = () => {
    router.push("/home");
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 mx-auto flex justify-center pb-6"
    >
      <div className="fixed bottom-0 inset-x-0 h-24 w-full bg-black to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)]" />
      <TooltipProvider delayDuration={0}>
        <Dock
          iconSize={40}
          iconMagnification={60}
          iconDistance={140}
          className="z-50 pointer-events-auto relative mx-auto flex items-center gap-1 px-1 rounded-full bg-zinc-900 [box-shadow:0_0_0_1px_rgba(255,255,255,.05),0_2px_4px_rgba(0,0,0,.3),0_12px_24px_rgba(0,0,0,.4)] transform-gpu border border-zinc-800"
        >
          {/* Terminal restore button */}
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onRestore}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12",
                  )}
                >
                  <Terminal
                    className="size-5 text-red-400"
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))",
                    }}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open Terminal</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <Separator orientation="vertical" className="h-full bg-zinc-700" />

          {/* Social links */}
          {socialItems.map((item) => (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 text-zinc-300",
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          <Separator
            orientation="vertical"
            className="h-full py-2 bg-zinc-700"
          />

          {/* Normal mode button (replaces theme toggle) */}
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleNormalMode}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12",
                  )}
                >
                  <Globe className="size-4 text-zinc-400" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Normal Mode</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </motion.div>
  );
}
