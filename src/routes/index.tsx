import { createFileRoute } from "@tanstack/react-router";
import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import sampath from "@/assets/sampath.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sampath Satya Saran — Full-Stack Developer" },
      { name: "description", content: "Full-Stack Developer, UI/UX Designer and AI-Assisted Web Builder based in Visakhapatnam, India." },
    ],
  }),
  component: Home,
});

/* ─────────────────────── Projects Data ─────────────────────── */

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

/* ─────────────────────── About Data ─────────────────────── */

const timeline = [
  {
    tag: "Education",
    title: "B.Tech — Computer Science & Engineering",
    sub: "Andhra University, Visakhapatnam · 2025 – 2029",
    points: [
      "Coursework: Data Structures in C, OOP, upcoming Computer Networks",
      "Shipping 10+ production projects across two years rather than waiting to graduate",
    ],
  },
  {
    tag: "AI & Automation",
    title: "AI Innovation Challenge — Builder & Startup Events 2025",
    sub: "Live demo as a second-year against more experienced competitors",
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

/* ─────────────────────── Reveal Wrapper ─────────────────────── */

function Reveal({
  children,
  className = "",
  direction = "up",
  delay = "",
  speed = "",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  delay?: string;
  speed?: string;
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const dirClass = {
    up: "reveal",
    left: "reveal-left",
    right: "reveal-right",
    scale: "reveal-scale",
  }[direction];

  return (
    <div
      ref={ref}
      className={`${dirClass} ${isVisible ? "visible" : ""} ${delay} ${speed} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────────────────── Home (all sections) ─────────────────────── */

function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section id="home" className="min-h-screen radial-vignette relative overflow-hidden flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 px-8 md:px-14 pt-32 pb-16 max-w-7xl mx-auto w-full">
          <Reveal direction="scale" className="flex justify-center lg:justify-end">
            <div className="relative w-[280px] sm:w-[360px] md:w-[440px] aspect-square rounded-full overflow-hidden shadow-[0_0_120px_-20px_oklch(0.4_0.12_250/0.6)]">
              <img src={sampath} alt="Portrait of Sampath Satya Saran" className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <div className="max-w-2xl">
            <Reveal direction="up" speed="reveal-slow">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] uppercase">
                Sampath Satya Saran<VerifiedBadge />
              </h1>
            </Reveal>
            <Reveal direction="up" delay="reveal-delay-1">
              <p className="mt-6 font-mono text-base md:text-lg text-foreground/90">
                Full-Stack Developer | UI/UX Designer | AI-Assisted Web Builder
              </p>
            </Reveal>
            <Reveal direction="up" delay="reveal-delay-2">
              <p className="mt-6 text-sm md:text-base text-muted-foreground max-w-lg leading-relaxed">
                Second-year CSE student shipping production-grade projects — student management systems, campus food apps, and event platforms with real features and real users in mind.
              </p>
            </Reveal>
            <Reveal direction="up" delay="reveal-delay-3">
              <div className="mt-7 flex items-center gap-4">
                <a href="https://linkedin.com/in/sampath1904" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 rounded hover:bg-accent transition-colors"><Linkedin className="size-5" /></a>
                <a href="https://github.com/Sampath0411" target="_blank" rel="noreferrer" aria-label="GitHub" className="p-2 rounded hover:bg-accent transition-colors"><Github className="size-5" /></a>
                <a href="https://instagram.com/_exotic_sampath.56" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded hover:bg-accent transition-colors"><Instagram className="size-5" /></a>
              </div>
            </Reveal>
            <Reveal direction="up" delay="reveal-delay-4">
              <p className="mt-5 text-sm text-muted-foreground">
                <a href="mailto:sampathlox@gmail.com" className="hover:text-foreground">sampathlox@gmail.com</a>
                <span className="mx-3 text-border">|</span>
                <a href="tel:+919291493225" className="hover:text-foreground">+91 92914 93225</a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="scroll-mt-24 px-8 md:px-14 pt-24 pb-20 max-w-7xl mx-auto w-full">
        <Reveal direction="up">
          <h2 className="font-display text-5xl md:text-7xl uppercase">Portfolio</h2>
        </Reveal>
        <Reveal direction="up" delay="reveal-delay-1">
          <p className="mt-4 text-muted-foreground max-w-xl">
            Six shipped in year one. Not tutorials, not clones — real features built for real users.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.name} direction="up" delay={`reveal-delay-${Math.min(i + 1, 4)}`}>
              <article
                className={[
                  "group relative rounded-xl border p-6 flex flex-col transition-all",
                  p.featured
                    ? "border-foreground shadow-[0_0_60px_-15px_oklch(1_0_0/0.4)]"
                    : "border-border hover:border-foreground/60",
                ].join(" ")}
              >
                <h3 className="font-display text-xl md:text-2xl uppercase leading-tight">{p.name}</h3>
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
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="scroll-mt-24 px-8 md:px-14 pt-24 pb-20 max-w-6xl mx-auto w-full">
        <Reveal direction="up">
          <h2 className="font-display text-4xl md:text-6xl text-center uppercase">Experience &amp; Skills</h2>
        </Reveal>
        <Reveal direction="up" delay="reveal-delay-1">
          <div className="mt-14 rounded-2xl border border-border bg-card p-6 md:p-10">
            <div className="flex items-center gap-3 pb-6 border-b border-border">
              <img src={sampath} alt="" className="size-10 rounded-full object-cover" />
              <span className="font-medium">Sampath Satya Saran</span>
            </div>
            <div className="mt-8 grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr] gap-x-6 md:gap-x-12">
              {timeline.map((item, i) => (
                <Reveal key={item.title} direction="left" delay={`reveal-delay-${Math.min(i + 1, 4)}`} className="contents">
                  <div className="text-right text-sm text-muted-foreground pt-1.5">{item.tag}</div>
                  <div className="relative pl-8 pb-10 border-l border-border last:pb-0">
                    <span className="absolute -left-[7px] top-2 size-3 rounded-full bg-foreground ring-4 ring-background" />
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.sub}</p>
                    <ul className="mt-3 space-y-1.5 text-sm text-foreground/80 list-disc pl-5">
                      {item.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="font-display text-2xl md:text-3xl uppercase">Technical Skills</h3>
              <div className="mt-2 border-t border-border" />
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {Object.entries(skills).map(([cat, list], i) => (
                  <Reveal key={cat} direction="right" delay={`reveal-delay-${Math.min(i + 1, 4)}`}>
                    <div>
                      <p className="text-sm text-muted-foreground mb-3">{cat}:</p>
                      <div className="flex flex-wrap gap-2">
                        {list.map((s) => (
                          <span key={s} className="px-3 py-1 rounded-md border border-border bg-secondary text-sm">{s}</span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="scroll-mt-24 px-8 md:px-14 pt-24 pb-20 max-w-6xl mx-auto w-full">
        <Reveal direction="up">
          <div className="text-center">
            <h2 className="font-display text-5xl md:text-7xl uppercase">Let's Connect</h2>
          </div>
        </Reveal>
        <Reveal direction="up" delay="reveal-delay-1">
          <p className="mt-4 text-muted-foreground text-lg text-center">
            Reach out for collaborations, internships, or just to say hello.
          </p>
        </Reveal>
        <ContactForm />
      </section>
    </>
  );
}

/* ─────────────────────── Contact Form ─────────────────────── */

function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
      <Reveal direction="left" delay="reveal-delay-2">
        <div className="space-y-7">
          <Row icon={<Phone className="size-5" />} label="Phone" value="+91 92914 93225" href="tel:+919291493225" />
          <Row icon={<Mail className="size-5" />} label="Email" value="sampathlox@gmail.com" href="mailto:sampathlox@gmail.com" />
          <Row icon={<MapPin className="size-5" />} label="Location" value="Visakhapatnam, Andhra Pradesh, India" />
          <div className="flex items-center gap-3 pt-6">
            <Social href="https://linkedin.com/in/sampath1904"><Linkedin className="size-5" /></Social>
            <span className="text-muted-foreground">–</span>
            <Social href="https://github.com/Sampath0411"><Github className="size-5" /></Social>
            <span className="text-muted-foreground">–</span>
            <Social href="https://instagram.com/_exotic_sampath.56"><Instagram className="size-5" /></Social>
          </div>
        </div>
      </Reveal>
      <Reveal direction="right" delay="reveal-delay-3">
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="space-y-4"
        >
          <Field name="name" placeholder="Name" />
          <Field name="email" type="email" placeholder="Email" />
          <Field name="subject" placeholder="Subject" />
          <textarea
            name="message"
            placeholder="Message"
            required
            rows={5}
            className="w-full rounded-md border border-border bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-primary text-primary-foreground font-display tracking-wider uppercase py-3.5 text-sm hover:opacity-90 transition-opacity"
          >
            {sent ? "Message Sent — Thanks!" : "Send Message"}
          </button>
        </form>
      </Reveal>
    </div>
  );
}

function Row({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 text-foreground">{icon}</div>
      <div>
        <p className="font-semibold">{label}:</p>
        <p className="text-muted-foreground">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} className="block hover:opacity-80 transition-opacity">{content}</a> : content;
}

function Social({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="p-3 rounded-md border border-border hover:bg-foreground hover:text-background transition-colors">
      {children}
    </a>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      required
      {...props}
      className="w-full rounded-md border border-border bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
    />
  );
}

function VerifiedBadge() {
  return (
    <span
      className="inline-flex items-center justify-center ml-3 align-middle"
      title="Verified"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block"
      >
        <defs>
          {/* Radial gradient for 3D sphere look */}
          <radialGradient id="sphereGrad" cx="38%" cy="35%" r="55%" fx="30%" fy="28%">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="35%" stopColor="#38BDF8" />
            <stop offset="70%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0369A1" />
          </radialGradient>
          {/* Glossy top highlight */}
          <radialGradient id="glossGrad" cx="35%" cy="25%" r="45%">
            <stop offset="0%" stopColor="white" stopOpacity="0.55" />
            <stop offset="60%" stopColor="white" stopOpacity="0.08" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          {/* Spoke glow gradient */}
          <radialGradient id="spokeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="45%" stopColor="#38BDF8" stopOpacity="0" />
            <stop offset="60%" stopColor="#7DD3FC" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>
          {/* Drop shadow */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#0369A1" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* ── Radiating spokes / light rays ── */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <ellipse
            key={angle}
            cx="50"
            cy="50"
            rx="46"
            ry="10"
            fill="url(#spokeGlow)"
            transform={`rotate(${angle} 50 50)`}
            opacity="0.7"
          />
        ))}

        {/* ── Main circle badge ── */}
        <circle cx="50" cy="50" r="42" fill="url(#sphereGrad)" filter="url(#shadow)" />

        {/* Glossy highlight */}
        <circle cx="50" cy="50" r="42" fill="url(#glossGrad)" />

        {/* Subtle inner ring */}
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

        {/* ── White checkmark ── */}
        <path
          d="M30 52 L44 66 L72 36"
          stroke="white"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </span>
  );
}
