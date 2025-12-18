import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { WorkSection } from "@/components/sections/work-section";
import { EducationSection } from "@/components/sections/education-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";
import config from "@/../../../data/config.json";
import resumeData from "@/../../../data/resume.json";
import skillsData from "@/../../../data/skills.json";
import projectsData from "@/../../../data/projects.json";

const BLUR_FADE_DELAY = 0.04;

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-dvh space-y-10">
      <HeroSection
        name={config.name}
        initials={config.initials}
        intro={config.intro}
        avatarUrl={config.avatarUrl}
        blurFadeDelay={BLUR_FADE_DELAY}
      />
      <AboutSection bio={config.bio} blurFadeDelay={BLUR_FADE_DELAY} />
      <WorkSection work={resumeData.work} blurFadeDelay={BLUR_FADE_DELAY} />
      <EducationSection
        education={resumeData.education}
        blurFadeDelay={BLUR_FADE_DELAY}
      />
      <SkillsSection
        featured={skillsData.featured}
        blurFadeDelay={BLUR_FADE_DELAY}
      />
      <ProjectsSection
        projects={projectsData.projects}
        blurFadeDelay={BLUR_FADE_DELAY}
      />
      <ContactSection blurFadeDelay={BLUR_FADE_DELAY} />
    </main>
  );
}
