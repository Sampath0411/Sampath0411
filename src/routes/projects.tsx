import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Selected Projects — Sampath Satya Saran" },
      { name: "description", content: "Production-grade projects: student management, campus food, WriteConnect, ResumePlus, Tony assistant and more." },
      { property: "og:title", content: "Selected Projects — Sampath Satya Saran" },
    ],
  }),
  component: Projects,
});

const projects = [
  {
    name: "Student Management Platform",
    blurb: "Full-stack system with separate student and admin dashboards. Attendance, assignments, AI study assistant, QR scan flows, Excel export.",
    stack: ["React", "Vite", "TypeScript", "Supabase", "Edge Functions"],
    featured: true,
  },
  {
    name: "Campus Food Ordering Platform",
    blurb: "Campus dining with real-time order management, cart, secure payments across Android and web. Hostel delivery, group orders, in-app cost splitting.",
    stack: ["Full-Stack", "REST APIs", "Modular Arch"],
  },
  {
    name: "WriteConnect",
    blurb: "Two-role marketplace connecting students with writers. Writers list services; students browse and manage requests. Full Supabase auth.",
    stack: ["React", "TypeScript", "Vite", "Supabase", "shadcn/ui"],
  },
  {
    name: "ResumePlus — ATS Resume Builder",
    blurb: "Fill in details and instantly get a clean, ATS-readable resume. Multiple templates for dev, design, content, and data entry roles.",
    stack: ["JavaScript", "HTML", "CSS"],
  },
  {
    name: "Tony — Personal Voice Assistant",
    blurb: "Works offline and online, switching modes per command. Handles system tasks, web searches, and automation.",
    stack: ["Python", "Speech Recognition", "NLP"],
  },
  {
    name: "Personal Portfolio Website",
    blurb: "Black and white theme with a custom cursor and scroll-triggered animations. Every spacing decision made manually.",
    stack: ["HTML", "CSS", "JavaScript", "Vercel"],
  },
];

function Projects() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1 px-8 md:px-14 pt-32 pb-12 max-w-7xl mx-auto w-full">
        <h1 className="font-display text-5xl md:text-7xl uppercase">
          Portfolio: Selected Projects
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl">
          Six shipped in year one. Not tutorials, not clones — real features built for real users.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article
              key={p.name}
              className={[
                "group relative rounded-xl border p-6 flex flex-col transition-all",
                p.featured
                  ? "border-foreground shadow-[0_0_60px_-15px_oklch(1_0_0/0.4)]"
                  : "border-border hover:border-foreground/60",
              ].join(" ")}
            >
              <h2 className="font-display text-xl md:text-2xl uppercase leading-tight">{p.name}</h2>
              <p className="mt-4 text-sm text-foreground/80 leading-relaxed flex-1">{p.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md border border-border text-xs bg-secondary/50">{t}</span>
                ))}
              </div>
              <button className="mt-6 w-full rounded-md border border-border py-2.5 text-sm font-medium hover:bg-foreground hover:text-background transition-colors">
                View Project
              </button>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
