import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import sampath from "@/assets/sampath.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Experience & Skills — Sampath Satya Saran" },
      { name: "description", content: "Education, AI & automation work, and the full technical stack Sampath builds with." },
      { property: "og:title", content: "Experience & Skills — Sampath Satya Saran" },
    ],
  }),
  component: About,
});

const timeline = [
  {
    tag: "Education",
    title: "B.Tech — Computer Science & Engineering",
    sub: "Andhra University, Visakhapatnam · 2025 – 2029",
    points: [
      "Coursework: Data Structures in C, OOP, upcoming Computer Networks",
      "Shipping 6+ production projects in first year rather than waiting to graduate",
    ],
  },
  {
    tag: "AI & Automation",
    title: "AI Innovation Challenge — Builder & Startup Events 2025",
    sub: "Live demo as a first-year against more experienced competitors",
    points: [
      "Telegram bot that remotely controls a PC, generates PDF notes, analyses photos",
      "WhatsApp + Gmail integrations; integrated 5+ third-party APIs across projects",
    ],
  },
  {
    tag: "Content",
    title: "Instagram — @samxeditz.56 / @_exotic_sampath.56",
    sub: "Runs two pages with distinct audiences and styles",
    points: [
      "Built a fully animated Instagram Reel in pure HTML and CSS — no libraries",
      "Designs branding graphics using Python + Pillow",
    ],
  },
];

const skills = {
  Languages: ["JavaScript", "TypeScript", "HTML5", "CSS3", "Python", "C"],
  Frontend: ["React.js", "Vite", "Tailwind CSS", "scroll-reveal", "custom cursors"],
  "Backend / DB": ["Node.js", "Firebase", "Supabase", "Edge Functions", "REST APIs"],
  "AI / Automation": ["Claude Code", "Anthropic API", "Telegram Bot API", "Slack Webhooks"],
  Tools: ["Git", "GitHub", "VS Code", "Figma", "Canva", "Vercel", "Netlify", "CapCut"],
};

function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1 px-8 md:px-14 pt-32 pb-16 max-w-6xl mx-auto w-full">
        <h1 className="font-display text-4xl md:text-6xl text-center uppercase">
          Experience &amp; Skills
        </h1>

        <section className="mt-14 rounded-2xl border border-border bg-card p-6 md:p-10">
          <div className="flex items-center gap-3 pb-6 border-b border-border">
            <img src={sampath} alt="" className="size-10 rounded-full object-cover" />
            <span className="font-medium">Sampath Satya Saran</span>
          </div>

          <div className="mt-8 grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr] gap-x-6 md:gap-x-12">
            {timeline.map((item, i) => (
              <div key={item.title} className="contents">
                <div className="text-right text-sm text-muted-foreground pt-1.5">{item.tag}</div>
                <div className="relative pl-8 pb-10 border-l border-border last:pb-0">
                  <span className="absolute -left-[7px] top-2 size-3 rounded-full bg-foreground ring-4 ring-background" />
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.sub}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-foreground/80 list-disc pl-5">
                    {item.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
                {i === timeline.length - 1 ? null : null}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="font-display text-2xl md:text-3xl uppercase">Technical Skills</h2>
            <div className="mt-2 border-t border-border" />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {Object.entries(skills).map(([cat, list]) => (
                <div key={cat}>
                  <p className="text-sm text-muted-foreground mb-3">{cat}:</p>
                  <div className="flex flex-wrap gap-2">
                    {list.map((s) => (
                      <span key={s} className="px-3 py-1 rounded-md border border-border bg-secondary text-sm">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
