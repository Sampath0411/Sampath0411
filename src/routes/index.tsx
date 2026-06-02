import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink, ArrowDownToLine, Sparkles, Code2, Rocket, BookOpen } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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

/* ─────────────────────── Data ─────────────────────── */

const stats = [
  { value: "10+", label: "Projects Shipped" },
  { value: "500+", label: "Users Served" },
  { value: "15+", label: "APIs Integrated" },
  { value: "2yr", label: "Coding Experience" },
];

const projects = [
  {
    name: "Student Management Platform",
    blurb: "Full-stack system with separate student and admin dashboards. QR-based attendance, assignments, AI study assistant, CSV export.",
    stack: ["React", "TypeScript", "Supabase", "Edge Functions"],
    featured: true,
    metric: "200+ students · 8 classes onboarded",
    live: "#",
    github: "#",
  },
  {
    name: "Campus Food Ordering Platform",
    blurb: "Campus dining with real-time order management, cart, secure payments across Android and web. Hostel delivery and group orders.",
    stack: ["Full-Stack", "REST APIs", "Modular Arch"],
    metric: "50+ daily orders · 3 campus cafes",
    live: "#",
    github: "#",
  },
  {
    name: "WriteConnect",
    blurb: "Two-role marketplace connecting students with writers. Writers list services; students browse and manage requests.",
    stack: ["React", "TypeScript", "Supabase", "shadcn/ui"],
    metric: "15+ active writers · 100+ requests handled",
    live: "#",
    github: "#",
  },
  {
    name: "ResumePlus — ATS Resume Builder",
    blurb: "Fill in details and instantly get a clean, ATS-readable resume. Multiple templates for dev, design, and data roles.",
    stack: ["JavaScript", "HTML", "CSS"],
    metric: "500+ resumes generated · 4 templates",
    live: "#",
    github: "#",
  },
  {
    name: "Tony — Personal Voice Assistant",
    blurb: "Works offline and online, switching modes per command. Handles system tasks, web searches, and automation.",
    stack: ["Python", "Speech Recognition", "NLP"],
    metric: "15+ automation workflows · PC remote control",
    github: "#",
  },
];

const timeline = [
  {
    tag: "Education",
    title: "B.Tech — Computer Science & Engineering",
    sub: "Andhra University, Visakhapatnam · 2025 – 2029",
    points: [
      "Completed: Data Structures in C, OOP, DBMS, Discrete Mathematics",
      "Consistent academic performance while shipping 10+ production projects",
    ],
  },
  {
    tag: "Hackathon",
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
    sub: "Two pages with distinct audiences and styles",
    points: [
      "Built a fully animated Instagram Reel in pure HTML and CSS — zero libraries",
      "Designs branding graphics and thumbnails using Python + Pillow",
    ],
  },
];

const skills = {
  Proficient: ["JavaScript", "TypeScript", "React.js", "HTML5", "CSS3", "Tailwind CSS", "Python", "C", "Node.js"],
  "Working With": ["Supabase", "Firebase", "REST APIs", "Git", "VS Code", "Figma", "Vite"],
  "Currently Exploring": ["Next.js App Router", "Docker", "System Design", "Computer Networks"],
};

const currentlyBuilding = [
  { icon: <Rocket className="size-4 text-accent-blue" />, text: "EventFlow — full event management platform with QR codes and CSV export", status: "In Progress" },
  { icon: <Code2 className="size-4 text-accent-blue" />, text: "Next.js App Router migration for better performance", status: "In Progress" },
  { icon: <BookOpen className="size-4 text-accent-blue" />, text: "Docker fundamentals and containerized deployments", status: "Learning" },
];

const testimonials = [
  {
    quote: "Sampath built our entire student management system in record time. The QR attendance feature alone saved us hours every week.",
    name: "Dr. Ramesh Kumar",
    role: "Faculty, CSE Department, Andhra University",
  },
  {
    quote: "One of the most dedicated first-year students I've seen. He shipped more production projects in his first semester than most final-year students.",
    name: "Priya Sharma",
    role: "Senior Developer & Mentor",
  },
];

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
  const dirClass = { up: "reveal", left: "reveal-left", right: "reveal-right", scale: "reveal-scale" }[direction];
  return (
    <div ref={ref} className={`${dirClass} ${isVisible ? "visible" : ""} ${delay} ${speed} ${className}`}>
      {children}
    </div>
  );
}

/* ─────────────────────── Home ─────────────────────── */

function Home() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroContentRef.current) {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const fadeStart = viewportHeight * 0.1;
        const fadeEnd = viewportHeight * 0.6;
        const progress = Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1);
        const opacity = 1 - progress * 0.95;
        const scale = 1 - progress * 0.08;
        const translateY = -progress * 60;
        heroContentRef.current.style.opacity = String(opacity);
        heroContentRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      }
      // Parallax on profile image
      if (heroImgRef.current) {
        const scrollY = window.scrollY;
        heroImgRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section id="home" className="min-h-screen radial-vignette relative overflow-hidden flex items-center">
        <div
          ref={heroContentRef}
          className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 px-6 md:px-14 pt-32 pb-16 max-w-7xl mx-auto w-full will-change-transform"
          style={{ transition: "opacity 0.1s ease-out, transform 0.1s ease-out" }}
        >
          <Reveal direction="scale" className="flex justify-center lg:justify-end">
            <div ref={heroImgRef} className="relative w-[200px] sm:w-[280px] md:w-[340px] will-change-transform">
              <div className="profile-ring" />
              <div className="profile-ring-inner" />
              <div className="relative rounded-full overflow-hidden shadow-[0_0_80px_-15px_rgba(59,130,246,0.3)]">
                <img src={sampath} alt="Portrait of Sampath Satya Saran" className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>
          <div className="max-w-2xl">
            <Reveal direction="up" speed="reveal-slow">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] uppercase">
                Sampath Satya Saran
              </h1>
            </Reveal>
            <Reveal direction="up" delay="reveal-delay-1">
              <p className="mt-6 font-mono text-base md:text-lg text-foreground/90">
                Full-Stack Developer — React · Supabase · Node.js
              </p>
            </Reveal>
            <Reveal direction="up" delay="reveal-delay-2">
              <p className="mt-6 text-sm md:text-base text-muted-foreground max-w-lg leading-relaxed">
                Second-year CSE student at Andhra University. I build things that work — student platforms, campus apps, and AI tools with real users in mind. Currently seeking WFH internship opportunities.
              </p>
            </Reveal>
            <Reveal direction="up" delay="reveal-delay-3">
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-md bg-accent-blue text-white px-5 py-2.5 text-sm font-display tracking-wider uppercase hover:bg-accent-blue-dark transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  <ArrowDownToLine className="size-4" />
                  Download Resume
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-display tracking-wider uppercase hover:border-accent-blue hover:text-accent-blue transition-all duration-200"
                >
                  Get in Touch
                </a>
              </div>
            </Reveal>
            <Reveal direction="up" delay="reveal-delay-4">
              <div className="mt-6 flex items-center gap-5">
                <a href="https://linkedin.com/in/sampath1904" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-accent-blue transition-colors duration-200"><Linkedin className="size-5" /></a>
                <a href="https://github.com/Sampath0411" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-accent-blue transition-colors duration-200"><Github className="size-5" /></a>
                <span className="text-border">|</span>
                <a href="mailto:sampathlox@gmail.com" className="text-sm text-muted-foreground hover:text-accent-blue transition-colors duration-200">sampathlox@gmail.com</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-8 border-y border-border bg-card/30">
        <div className="max-w-6xl mx-auto px-6 md:px-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} direction="up" delay={`reveal-delay-${Math.min(i + 1, 4)}`}>
              <div className="text-center">
                <p className="font-display text-3xl md:text-4xl text-accent-blue">{s.value}</p>
                <p className="text-xs font-mono text-muted-foreground mt-1 tracking-wider uppercase">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ABOUT ME ── */}
      <section id="about" className="scroll-mt-24 px-6 md:px-14 pt-24 pb-10 max-w-6xl mx-auto w-full">
        <Reveal direction="up">
          <h2 className="font-display text-4xl md:text-6xl uppercase heading-underline">About Me</h2>
        </Reveal>
        <Reveal direction="up" delay="reveal-delay-1">
          <div className="mt-10 max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I'm a builder at heart. While most students wait until their final year to work on "real" projects, I started shipping production-grade software from my first month of college. No tutorials, no clones — every project solves an actual problem I've seen around me.
            </p>
            <p>
              My focus is full-stack web development with React, TypeScript, and Supabase. I care about clean UI, fast load times, and features that people actually use. When I'm not coding, I'm designing Instagram content or exploring new tools to add to my stack.
            </p>
            <p>
              I'm actively looking for <strong className="text-accent-blue">work-from-home internship opportunities</strong> where I can contribute to real products and grow as a developer. If you're building something interesting, <a href="#contact" className="text-accent-blue hover:underline">let's talk</a>.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="scroll-mt-24 px-6 md:px-14 pt-16 pb-20 max-w-7xl mx-auto w-full">
        <Reveal direction="up">
          <h2 className="font-display text-5xl md:text-7xl uppercase heading-underline">Projects</h2>
        </Reveal>
        <Reveal direction="up" delay="reveal-delay-1">
          <p className="mt-6 text-muted-foreground max-w-xl">
            5 shipped. Not tutorials, not clones — real features built for real users.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.name} direction="up" delay={`reveal-delay-${Math.min(i + 1, 4)}`}>
              <article className={`project-card group relative rounded-xl border p-6 flex flex-col transition-all h-full ${
                p.featured ? "border-accent-blue/30 shadow-[0_0_40px_-12px_rgba(59,130,246,0.15)]" : "border-border"
              }`}>
                {p.featured && (
                  <span className="absolute -top-3 left-4 px-2.5 py-0.5 text-[10px] font-display tracking-widest uppercase bg-accent-blue text-white rounded">
                    Featured
                  </span>
                )}
                <h3 className="font-display text-xl md:text-2xl uppercase leading-tight group-hover:text-accent-blue transition-colors duration-300">{p.name}</h3>
                <p className="mt-4 text-sm text-foreground/80 leading-relaxed flex-1">{p.blurb}</p>
                {p.metric && (
                  <p className="mt-3 text-xs font-mono text-accent-blue">{p.metric}</p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md border border-border text-xs bg-secondary/50 group-hover:border-accent-blue/20 transition-colors duration-300">{t}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3 pt-4 border-t border-border">
                  {p.live && p.live !== "#" && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-accent-blue hover:underline">
                      <ExternalLink className="size-3.5" /> Live Demo
                    </a>
                  )}
                  {p.github && p.github !== "#" && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent-blue transition-colors">
                      <Github className="size-3.5" /> Source
                    </a>
                  )}
                  {(!p.live || p.live === "#") && (!p.github || p.github === "#") && (
                    <span className="text-xs text-muted-foreground italic">Links coming soon</span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE & SKILLS ── */}
      <section className="scroll-mt-24 px-6 md:px-14 pt-16 pb-20 max-w-6xl mx-auto w-full">
        <Reveal direction="up">
          <h2 className="font-display text-4xl md:text-6xl text-center uppercase heading-underline">Experience &amp; Skills</h2>
        </Reveal>

        {/* Timeline */}
        <Reveal direction="up" delay="reveal-delay-1">
          <div className="mt-14 rounded-2xl border border-border bg-card p-6 md:p-10">
            <div className="mt-4 grid grid-cols-[100px_1fr] md:grid-cols-[180px_1fr] gap-x-4 md:gap-x-10">
              {timeline.map((item, i) => (
                <Reveal key={item.title} direction="left" delay={`reveal-delay-${Math.min(i + 1, 4)}`} className="contents">
                  <div className="text-right text-sm text-muted-foreground pt-1.5">{item.tag}</div>
                  <div className="relative pl-6 md:pl-8 pb-8 border-l border-border last:pb-0">
                    <span className="absolute -left-[7px] top-2 size-3 rounded-full bg-foreground ring-4 ring-background timeline-dot" />
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.sub}</p>
                    <ul className="mt-3 space-y-1.5 text-sm text-foreground/80 list-disc pl-5">
                      {item.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Skills */}
        <div className="mt-14">
          <Reveal direction="up">
            <h3 className="font-display text-2xl md:text-3xl uppercase mb-8">Technical Skills</h3>
          </Reveal>
          <div className="space-y-8">
            {Object.entries(skills).map(([cat, list], i) => (
              <Reveal key={cat} direction="up" delay={`reveal-delay-${Math.min(i + 1, 3)}`}>
                <div>
                  <p className="text-sm font-mono text-accent-blue mb-3">{cat}:</p>
                  <div className="flex flex-wrap gap-2">
                    {list.map((s) => (
                      <span key={s} className="px-3 py-1.5 rounded-md border border-border bg-secondary text-sm hover:border-accent-blue/30 hover:bg-accent-glow transition-all duration-200 cursor-default">{s}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Currently Building */}
        <div className="mt-14">
          <Reveal direction="up">
            <h3 className="font-display text-2xl md:text-3xl uppercase mb-6 flex items-center gap-3">
              <Sparkles className="size-6 text-accent-blue" />
              Currently Building
            </h3>
          </Reveal>
          <Reveal direction="up" delay="reveal-delay-1">
            <div className="space-y-3">
              {currentlyBuilding.map((item, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 hover:border-accent-blue/20 transition-colors duration-200">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-glow flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-mono text-accent-blue mr-2">{item.status}</span>
                    <span className="text-sm text-foreground/80">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Testimonials */}
        <div className="mt-14">
          <Reveal direction="up">
            <h3 className="font-display text-2xl md:text-3xl uppercase mb-8">What People Say</h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} direction="up" delay={`reveal-delay-${Math.min(i + 1, 3)}`}>
                <div className="testimonial-card rounded-xl border border-border bg-card/50 p-6 h-full">
                  <p className="text-sm text-foreground/80 leading-relaxed italic">{t.quote}</p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="scroll-mt-24 px-6 md:px-14 pt-24 pb-20 max-w-6xl mx-auto w-full">
        <Reveal direction="up">
          <div className="text-center">
            <h2 className="font-display text-5xl md:text-7xl uppercase heading-underline">Let's Connect</h2>
          </div>
        </Reveal>
        <Reveal direction="up" delay="reveal-delay-1">
          <p className="mt-6 text-muted-foreground text-lg text-center">
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
            <span className="text-muted-foreground">—</span>
            <Social href="https://github.com/Sampath0411"><Github className="size-5" /></Social>
          </div>
        </div>
      </Reveal>
      <Reveal direction="right" delay="reveal-delay-3">
        <form
          action="https://formspree.io/f/xpwdqjkl"
          method="POST"
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
            className="w-full rounded-md border border-border bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue resize-none transition-colors duration-200"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-accent-blue text-white font-display tracking-wider uppercase py-3.5 text-sm hover:bg-accent-blue-dark transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            {sent ? "Message Sent — Thanks!" : "Send Message"}
          </button>
          {sent && <p className="text-xs text-accent-blue text-center">Thanks! I'll get back to you soon.</p>}
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
    <a href={href} target="_blank" rel="noreferrer" className="p-3 rounded-md border border-border hover:border-accent-blue hover:text-accent-blue transition-all duration-200">
      {children}
    </a>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      required
      {...props}
      className="w-full rounded-md border border-border bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue transition-colors duration-200"
    />
  );
}
