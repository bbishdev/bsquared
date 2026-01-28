import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGradientForString } from "@/lib/gradients";
import { cn } from "@/lib/utils";
import { inlineCodeRenderer } from "@/lib/markdown";
import { ProjectStatus, STATUS_CONFIG } from "@/types/project";

interface ProjectCardProps {
  title: string;
  href?: string;
  description: string;
  dates: string;
  status?: ProjectStatus;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  status,
  tags,
  link,
  image,
  video,
  links,
  className,
}: ProjectCardProps) {
  const statusConfig = status ? STATUS_CONFIG[status] : null;
  const gradient = getGradientForString(title);

  return (
    <Card className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full !py-0">
      <Link
        href={href || "#"}
        className={cn("block cursor-pointer", className)}
      >
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none h-40 w-full object-cover object-top"
          />
        ) : (
          <div
            className="relative h-40 w-full flex items-center justify-center"
            style={{ background: gradient }}
          >
            {/* Gradient is the background, image overlays on top */}
            {image && (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover object-top"
              />
            )}
            {/* "coming soon" only shows when no image (gradient visible) */}
            {!image && (
              <span className="text-sm font-medium text-white/80 tracking-wide">
                coming soon...
              </span>
            )}
          </div>
        )}
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="mt-1 text-base">{title}</CardTitle>
            {statusConfig && (
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] px-1.5 py-0",
                  statusConfig.className
                )}
              >
                {statusConfig.label}
              </Badge>
            )}
          </div>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            <Markdown components={{ code: inlineCodeRenderer }}>
              {description}
            </Markdown>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
