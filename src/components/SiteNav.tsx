import { useState, useEffect, useRef } from "react";
import { Code2, Palette } from "lucide-react";
import sampath from "@/assets/sampath.jpg";

const DEV_SITE_URL = "https://samxeditz-56.vercel.app/";

const links = [
  { to: "home", label: "HOME" },
  { to: "about", label: "ABOUT" },
  { to: "projects", label: "PROJECTS" },
  { to: "contact", label: "CONTACT" },
] as const;

export function SiteNav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    heroRef.current = document.getElementById("home");
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach(({ to }) => {
      const el = document.getElementById(to);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const showFloat = scrolled && !heroVisible;

  const handleNavClick = (to: string) => {
    setMobileOpen(false);
    const el = document.getElementById(to);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-14 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border/40 py-4"
            : "bg-transparent py-7"
        }`}
      >
        {/* Left: Floating profile pic + name */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className={`rounded-full overflow-hidden transition-all duration-700 ease-out flex-shrink-0 ${
              showFloat
                ? "w-9 h-9 md:w-10 md:h-10 opacity-100 translate-x-0 scale-100"
                : "w-0 h-0 opacity-0 -translate-x-10 scale-50"
            }`}
          >
            <img src={sampath} alt="Sampath" className="w-full h-full object-cover" />
          </div>
          <a
            href="#home"
            className={`font-display text-sm tracking-wider uppercase hover:opacity-80 transition-opacity whitespace-nowrap ${
              showFloat ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
            style={{
              transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: showFloat ? "150ms" : "0ms",
            }}
          >
            Sampath Satya Saran
          </a>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7 md:gap-10">
          <nav className="flex items-center gap-7 md:gap-10">
            {links.map((l) => (
              <a
                key={l.to}
                href={`#${l.to}`}
                className={`relative text-sm tracking-[0.12em] transition-colors duration-300 ${
                  active === l.to ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-foreground transition-all duration-300 ease-out ${
                    active === l.to ? "w-full" : "w-0"
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Editor Toggle */}
          <a
            href={DEV_SITE_URL}
            className="relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all duration-300 border bg-accent-blue/10 border-accent-blue/40 text-accent-blue hover:bg-accent-blue/20"
            title="Go to Editor site"
          >
            <Code2 className="size-3.5" />
            <span>Editor</span>
            <span className="absolute -top-1 -right-1 size-2 rounded-full bg-accent-blue animate-pulse" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-1.5 ${mobileOpen ? "hamburger-open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </header>

      {/* Mobile nav overlay */}
      <div
        className={`mobile-nav fixed inset-0 z-40 bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden ${
          mobileOpen ? "open" : ""
        }`}
      >
        {links.map((l, i) => (
          <a
            key={l.to}
            href={`#${l.to}`}
            onClick={(e) => { e.preventDefault(); handleNavClick(l.to); }}
            className={`font-display text-3xl tracking-wider uppercase transition-colors ${
              active === l.to ? "text-accent-blue" : "text-muted-foreground hover:text-foreground"
            }`}
            style={{
              transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`,
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {l.label}
          </a>
        ))}
        {/* Editor link in mobile nav */}
        <a
          href={DEV_SITE_URL}
          className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-mono tracking-wider uppercase border bg-accent-blue/10 border-accent-blue/40 text-accent-blue"
        >
          <Code2 className="size-4" />
          <span>Editor</span>
        </a>
        <div className="flex items-center gap-5 mt-4">
          <a href="https://linkedin.com/in/sampath1904" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent-blue transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://github.com/Sampath0411" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent-blue transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
          <a href="mailto:sampathlox@gmail.com" className="text-muted-foreground hover:text-accent-blue transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
        </div>
      </div>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-auto px-8 md:px-14 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          <span>© 2026 Sampath Satya Saran. Built with <span className="heart-beat">♥</span></span>
          <img
            src="https://visitor-badge.laobi.icu/badge?page_id=Sampath0411.portfolio&style=flat-square&color=3B82F6"
            alt="Page views"
            className="h-4"
            loading="lazy"
          />
        </div>
        <span className="font-mono text-xs tracking-wider opacity-60">React · TypeScript · Supabase · Tailwind CSS</span>
        <div className="flex items-center gap-4">
          <a href="https://linkedin.com/in/sampath1904" target="_blank" rel="noreferrer" className="hover:text-accent-blue transition-colors">LinkedIn</a>
          <a href="https://github.com/Sampath0411" target="_blank" rel="noreferrer" className="hover:text-accent-blue transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
