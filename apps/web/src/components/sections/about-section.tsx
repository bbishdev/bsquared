import Markdown from "react-markdown";
import { BlurFade } from "@/components/ui/blur-fade";
import { inlineCodeRenderer } from "@/lib/markdown";

export interface AboutSectionProps {
  bio: string;
  blurFadeDelay: number;
}

export function AboutSection({ bio, blurFadeDelay }: AboutSectionProps) {
  return (
    <section id="about">
      <BlurFade delay={blurFadeDelay * 3}>
        <h2 className="text-xl font-bold">About</h2>
      </BlurFade>
      <BlurFade delay={blurFadeDelay * 4}>
        <div className="prose max-w-full text-pretty font-sans text-md text-muted-foreground dark:prose-invert [&>p]:mb-4 [&>p:last-child]:mb-0">
          <Markdown components={{ code: inlineCodeRenderer }}>
            {bio}
          </Markdown>
        </div>
      </BlurFade>
    </section>
  );
}

