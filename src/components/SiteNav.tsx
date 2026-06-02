import { useState, useEffect, useRef } from "react";
import sampath from "@/assets/sampath.jpg";


const links = [
  { to: "home", label: "HOME" },
  { to: "projects", label: "PROJECTS" },
  { to: "about", label: "ABOUT" },
  { to: "contact", label: "CONTACT" },
] as const;

export function SiteNav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const heroRef = useRef<HTMLElement | null>(null);

  // Track scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track hero section visibility
  useEffect(() => {
    heroRef.current = document.getElementById("home");
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-80px 0px 0px 0px", // triggers when hero starts leaving viewport
      }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Track active section for nav highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
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

  // When hero is NOT visible, show float elements in nav
  const showFloat = scrolled && !heroVisible;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-14 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border/40 py-4 shadow-[0_1px_0_0_var(--border)]"
          : "bg-transparent py-7"
      }`}
    >
      {/* Left: Floating profile pic + name that slides in from hero */}
      <div className="flex items-center gap-3 overflow-hidden">
        {/* Profile picture — slides in from left */}
        <div
          className={`rounded-full overflow-hidden transition-all duration-700 ease-out flex-shrink-0 ${
            showFloat
              ? "w-9 h-9 md:w-10 md:h-10 opacity-100 translate-x-0 scale-100"
              : "w-0 h-0 opacity-0 -translate-x-10 scale-50"
          }`}
        >
          <img
            src={sampath}
            alt="Sampath"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name + badge — fades in */}
        <a
          href="#home"
          className={`font-display text-sm tracking-wider uppercase hover:opacity-80 transition-opacity flex items-center gap-1.5 whitespace-nowrap ${
            showFloat
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-6"
          }`}
          style={{
            transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: showFloat ? "150ms" : "0ms",
          }}
        >
          Sampath Satya Saran
        </a>
      </div>

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
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-auto px-8 md:px-14 py-6 flex items-center justify-between text-xs text-muted-foreground">
      <span>© 2026 Sampath Satya Saran. Built with care.</span>
      <div className="flex items-center gap-4">
        <a href="https://linkedin.com/in/sampath1904" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
        <a href="https://github.com/Sampath0411" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
      </div>
    </footer>
  );
}
