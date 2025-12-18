import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";

export interface ContactSectionProps {
  blurFadeDelay: number;
}

export function ContactSection({ blurFadeDelay }: ContactSectionProps) {
  return (
    <section id="contact">
      <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
        <BlurFade delay={blurFadeDelay * 16}>
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
              Contact
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Best way to reach me is{" "}
              <Link
                href="mailto:btbishop93@gmail.com"
                className="text-blue-500 hover:underline"
              >
                email
              </Link>{" "}
              or a quick{" "}
              <Link
                href="https://x.com/bbish937"
                className="text-blue-500 hover:underline"
              >
                DM on X
              </Link>
              . I&apos;ll reply when I can.
            </p>
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-blue-500 hover:underline"
            >
              View my resume →
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
