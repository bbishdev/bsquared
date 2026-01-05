"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getLinkIcon } from "@/lib/link-icons";

interface ResumeCardProps {
  logoUrl?: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  links?: readonly { type: string; href: string }[];
}

export function ResumeCard({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  links,
}: ResumeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const cardContent = (
    <div className="flex items-start">
      <div className="flex-none mr-4">
        <Avatar className="border size-12 bg-muted dark:bg-foreground">
          <AvatarImage src={logoUrl} alt={altText} className="object-cover" />
          <AvatarFallback>{altText[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="grow">
        <div className="flex items-center justify-between gap-x-2 text-base">
          <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
            {title}
            {badges && (
              <span className="inline-flex gap-x-1 ml-1">
                {badges.map((badge, index) => (
                  <Badge
                    variant="secondary"
                    className="align-middle text-xs"
                    key={index}
                  >
                    {badge}
                  </Badge>
                ))}
              </span>
            )}
            <ChevronRightIcon
              className={cn(
                "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                isExpanded ? "rotate-90" : "rotate-0"
              )}
            />
          </h3>
          <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right whitespace-nowrap">
            {period}
          </div>
        </div>
        {subtitle && (
          <div className="font-sans text-xs text-muted-foreground mt-0.5">
            {subtitle}
          </div>
        )}
        {description && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isExpanded ? 1 : 0,
              height: isExpanded ? "auto" : 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-2 text-xs sm:text-sm text-muted-foreground"
          >
            {description}
            {links && links.length > 0 && (
              <div className="flex flex-row flex-wrap items-start gap-1 py-4">
                {links.map((link, idx) => (
                  <Link
                    href={link.href}
                    key={idx}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                      {getLinkIcon(link.type)}
                      {link.type}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );

  // Use div wrapper when expandable (has description) to avoid nested <a> tags
  // Use Link wrapper when not expandable but has href for navigation
  if (description) {
    return (
      <div
        onClick={handleClick}
        className="block cursor-pointer group"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClick();
          }
        }}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <Link href={href || "#"} className="block cursor-pointer group">
      {cardContent}
    </Link>
  );
}
