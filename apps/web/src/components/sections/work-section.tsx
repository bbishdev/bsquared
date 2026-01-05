import { BlurFade } from "@/components/ui/blur-fade";
import { ResumeCard } from "@/components/resume-card";

export interface WorkLinkItem {
  type: string;
  href: string;
}

export interface WorkItem {
  company: string;
  logoUrl?: string;
  title: string;
  href?: string;
  start: string;
  end?: string | null;
  description?: string;
  links?: readonly WorkLinkItem[];
}

export interface WorkSectionProps {
  work: readonly WorkItem[];
  blurFadeDelay: number;
}

export function WorkSection({ work, blurFadeDelay }: WorkSectionProps) {
  return (
    <section id="work">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={blurFadeDelay * 5}>
          <h2 className="text-xl font-bold">Work Experience</h2>
        </BlurFade>
        {work.map((item, id) => (
          <BlurFade key={item.company} delay={blurFadeDelay * 6 + id * 0.05}>
            <ResumeCard
              logoUrl={item.logoUrl}
              altText={item.company}
              title={item.company}
              subtitle={item.title}
              href={item.href}
              period={`${item.start} - ${item.end ?? "Present"}`}
              description={item.description}
              links={item.links}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}

