import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";

export interface SkillsSectionProps {
  featured: readonly string[];
  blurFadeDelay: number;
}

export function SkillsSection({ featured, blurFadeDelay }: SkillsSectionProps) {
  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={blurFadeDelay * 9}>
          <h2 className="text-xl font-bold">Skills</h2>
        </BlurFade>
        <div className="flex flex-wrap gap-1">
          {featured.map((skill, id) => (
            <BlurFade key={skill} delay={blurFadeDelay * 10 + id * 0.05}>
              <Badge>{skill}</Badge>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
