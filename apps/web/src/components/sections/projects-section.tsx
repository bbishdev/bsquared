import { BlurFade } from "@/components/ui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { getLinkIcon } from "@/lib/link-icons";
import type { ProjectItem } from "@/types/project";

export interface ProjectsSectionProps {
  projects: readonly ProjectItem[];
  blurFadeDelay: number;
}

export function ProjectsSection({
  projects,
  blurFadeDelay,
}: ProjectsSectionProps) {
  const mainProjects = projects.filter(
    (p) => p.status === "live" || p.status === "development"
  );
  const conceptProjects = projects.filter((p) => p.status === "concept");

  return (
    <section id="projects">
      <div className="space-y-12 w-full py-12">
        {/* Main Projects Section */}
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
                I&apos;ve worked on a variety of projects, from LLM Agents to
                mobile apps & extensions. Here are a few of my favorites.
              </p>
            </div>
          </div>
        </BlurFade>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
          {mainProjects.map((project, id) => (
            <BlurFade
              key={project.title}
              delay={blurFadeDelay * 12 + id * 0.05}
            >
              <ProjectCard
                href={project.href}
                title={project.title}
                description={project.description}
                dates={project.dates}
                status={project.status}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links?.map((link) => ({
                  icon: getLinkIcon(link.type),
                  type: link.type,
                  href: link.href,
                }))}
              />
            </BlurFade>
          ))}
        </div>

        {/* Concepts Section */}
        {conceptProjects.length > 0 && (
          <>
            <BlurFade delay={blurFadeDelay * 14}>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-md bg-muted text-muted-foreground px-3 py-1 text-sm">
                    Ideas & Concepts
                  </div>
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                    Things I&apos;m tinkering on
                  </h2>
                  <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                    Early-stage ideas and technologies I&apos;m passionate about
                    exploring.
                  </p>
                </div>
              </div>
            </BlurFade>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
              {conceptProjects.map((project, id) => (
                <BlurFade
                  key={project.title}
                  delay={blurFadeDelay * 15 + id * 0.05}
                >
                  <ProjectCard
                    href={project.href}
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    status={project.status}
                    tags={project.technologies}
                    image={project.image}
                    video={project.video}
                    links={project.links?.map((link) => ({
                      icon: getLinkIcon(link.type),
                      type: link.type,
                      href: link.href,
                    }))}
                  />
                </BlurFade>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
