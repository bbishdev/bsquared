import { BlurFade } from "@/components/ui/blur-fade";
import { ResumeCard } from "@/components/resume-card";

export interface EducationItem {
  school: string;
  logoUrl?: string;
  degree?: string;
  href?: string;
  start: string;
  end: string;
}

export interface EducationSectionProps {
  education: readonly EducationItem[];
  blurFadeDelay: number;
}

export function EducationSection({
  education,
  blurFadeDelay,
}: EducationSectionProps) {
  return (
    <section id="education">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={blurFadeDelay * 7}>
          <h2 className="text-xl font-bold">Education</h2>
        </BlurFade>
        {education.map((item, id) => (
          <BlurFade key={item.school} delay={blurFadeDelay * 8 + id * 0.05}>
            <ResumeCard
              logoUrl={item.logoUrl}
              altText={item.school}
              title={item.school}
              subtitle={item.degree}
              href={item.href}
              period={`${item.start} - ${item.end}`}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
