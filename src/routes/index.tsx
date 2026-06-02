import { createFileRoute } from "@tanstack/react-router";
import { Github, Instagram, Linkedin } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import sampath from "@/assets/sampath.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sampath Satya Saran — Full-Stack Developer" },
      { name: "description", content: "Full-Stack Developer, UI/UX Designer and AI-Assisted Web Builder based in Visakhapatnam, India." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen radial-vignette relative overflow-hidden">
      <SiteNav />
      <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 px-8 md:px-14 pt-32 pb-16">
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-[280px] sm:w-[360px] md:w-[440px] aspect-square rounded-full overflow-hidden shadow-[0_0_120px_-20px_oklch(0.4_0.12_250/0.6)]">
            <img src={sampath} alt="Portrait of Sampath Satya Saran" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] uppercase">
            Sampath<br />Satya Saran
          </h1>
          <p className="mt-6 font-mono text-base md:text-lg text-foreground/90">
            Full-Stack Developer | UI/UX Designer |<br />AI-Assisted Web Builder<span className="inline-block w-2 h-5 bg-foreground/70 align-middle ml-1 animate-pulse" />
          </p>
          <p className="mt-6 text-sm md:text-base text-muted-foreground max-w-lg leading-relaxed">
            First-year CSE student shipping production-grade projects — student management systems, campus food apps, and event platforms with real features and real users in mind.
          </p>
          <div className="mt-7 flex items-center gap-4">
            <a href="https://linkedin.com/in/sampath1904" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 rounded hover:bg-accent transition-colors"><Linkedin className="size-5" /></a>
            <a href="https://github.com/Sampath0411" target="_blank" rel="noreferrer" aria-label="GitHub" className="p-2 rounded hover:bg-accent transition-colors"><Github className="size-5" /></a>
            <a href="https://instagram.com/_exotic_sampath.56" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded hover:bg-accent transition-colors"><Instagram className="size-5" /></a>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            <a href="mailto:sampathlox@gmail.com" className="hover:text-foreground">sampathlox@gmail.com</a>
            <span className="mx-3 text-border">|</span>
            <a href="tel:+919291493225" className="hover:text-foreground">+91 92914 93225</a>
          </p>
        </div>
      </main>
    </div>
  );
}
