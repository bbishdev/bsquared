"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Dock, DockIcon } from "@/components/ui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Globe, HomeIcon, NotebookIcon, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon, XTwitterIcon } from "@/components/icons";

const navItems = [
  { href: "/home", icon: HomeIcon, label: "Home" },
  { href: "/writing", icon: NotebookIcon, label: "Writing" },
];

const socialItems = [
  { href: "https://github.com/bbishdev", icon: GithubIcon, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/brenden-bishop/",
    icon: LinkedinIcon,
    label: "LinkedIn",
  },
  { href: "https://x.com/bbish937", icon: XTwitterIcon, label: "X" },
];

interface NavbarProps {
  variant?: "normal" | "hardcore";
  onRestore?: () => void;
  animateIn?: boolean;
}

interface DockContentProps {
  isHardcore: boolean;
  onRestore: () => void;
}

function DockContent({ isHardcore, onRestore }: DockContentProps) {
  return (
    <>
      {isHardcore ? (
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={onRestore}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12"
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
              <p>Reopen Terminal</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      ) : (
        navItems.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  scroll={true}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "instant" })
                  }
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12"
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
        ))
      )}

      <Separator orientation="vertical" className="h-full" />

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
                  "size-12"
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

      <Separator orientation="vertical" className="h-full py-2" />

      {isHardcore ? (
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/home"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12"
                )}
              >
                <Globe className="size-4 text-zinc-300" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Normal Mode</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      ) : (
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      )}
    </>
  );
}

export function Navbar({
  variant = "normal",
  onRestore,
  animateIn = false,
}: NavbarProps) {
  const isHardcore = variant === "hardcore";
  const handleRestore = onRestore ?? (() => undefined);

  const backdropClassName = cn(
    "fixed bottom-0 inset-x-0 h-24 w-full to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)]",
    isHardcore ? "bg-black/70" : "bg-background dark:bg-background"
  );

  const dockClassName = cn(
    "relative mx-auto flex items-center gap-1 px-1",
    isHardcore ? "text-zinc-200" : "text-zinc-900 dark:text-zinc-100"
  );

  const dockContent = (
    <>
      <div className={backdropClassName} />
      <Dock
        iconSize={40}
        iconMagnification={60}
        iconDistance={140}
        className={dockClassName}
      >
        <DockContent isHardcore={isHardcore} onRestore={handleRestore} />
      </Dock>
    </>
  );

  if (animateIn) {
    return (
      <motion.div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto flex justify-center pb-6"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {dockContent}
      </motion.div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto flex justify-center pb-6">
      {dockContent}
    </div>
  );
}
