import { BlurFade } from "@/components/ui/blur-fade";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface HeroSectionProps {
  name: string;
  initials: string;
  intro: string;
  avatarUrl: string;
  blurFadeDelay: number;
}

export function HeroSection({
  name,
  initials,
  intro,
  avatarUrl,
  blurFadeDelay,
}: HeroSectionProps) {
  return (
    <section id="hero">
      <div className="mx-auto w-full space-y-8">
        <div className="gap-2 flex justify-between">
          <div className="flex-col flex flex-1 space-y-1.5">
            <BlurFade delay={blurFadeDelay}>
              <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
                Hi, I&apos;m {name.split(" ")[0]} 👋
              </h1>
            </BlurFade>
            <BlurFade delay={blurFadeDelay * 2}>
              <p className="pt-4 md:text-xl">{intro}</p>
            </BlurFade>
          </div>
          <BlurFade delay={blurFadeDelay}>
            <Avatar className="size-28 border">
              <AvatarImage alt={name} src={avatarUrl} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
