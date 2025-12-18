"use client";

import Link from "next/link";
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
import {
  HomeIcon,
  NotebookIcon,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

const navItems = [
  { href: "/home", icon: HomeIcon, label: "Home" },
  { href: "/writing", icon: NotebookIcon, label: "Writing" },
];

const socialItems = [
  { href: "https://github.com/btbishop93", icon: Github, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/brenden-bishop/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "https://x.com/bbish937", icon: Twitter, label: "X" },
];

export function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto flex justify-center pb-6">
      <div className="fixed bottom-0 inset-x-0 h-24 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background" />
      <Dock
        iconSize={40}
        iconMagnification={60}
        iconDistance={140}
        className="z-50 pointer-events-auto relative mx-auto flex items-center gap-1 px-1 rounded-full bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      >
        {navItems.map((item) => (
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
        ))}
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
      </Dock>
    </div>
  );
}
