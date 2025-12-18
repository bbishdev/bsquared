import { Globe } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { ProjectCard } from "@/components/project-card";

export interface ProjectLinkItem {
  type: string;
  href: string;
}

export interface ProjectItem {
  title: string;
  href?: string;
  description: string;
  dates: string;
  technologies: readonly string[];
  image?: string;
  links?: readonly ProjectLinkItem[];
}

export interface ProjectsSectionProps {
  projects: readonly ProjectItem[];
  blurFadeDelay: number;
}

export function ProjectsSection({
  projects,
  blurFadeDelay,
}: ProjectsSectionProps) {
  return (
    <section id="projects">
      <div className="space-y-12 w-full py-12">
        <BlurFade delay={blurFadeDelay * 11}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-md bg-foreground text-background px-3 py-1 text-sm">
                My Projects
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Check out my latest work
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I&apos;ve worked on a variety of projects, from AI-powered tools
                to trading algorithms. Here are a few of my favorites.
              </p>
            </div>
          </div>
        </BlurFade>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
          {projects.map((project, id) => (
            <BlurFade
              key={project.title}
              delay={blurFadeDelay * 12 + id * 0.05}
            >
              <ProjectCard
                href={project.href}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                links={project.links?.map((link) => ({
                  icon: <Globe className="size-3" />,
                  type: link.type,
                  href: link.href,
                }))}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
