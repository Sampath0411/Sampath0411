import { useState, useEffect } from "react";

const links = [
  { to: "home", label: "HOME" },
  { to: "projects", label: "PROJECTS" },
  { to: "about", label: "ABOUT" },
  { to: "contact", label: "CONTACT" },
] as const;

export function SiteNav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-14 py-7 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border/40 shadow-[0_1px_0_0_var(--border)]"
          : "bg-transparent"
      }`}
    >
      <a href="#home" className="font-display text-sm tracking-wider uppercase hover:opacity-80 transition-opacity flex items-center gap-1.5">
        Sampath Satya Saran
        <VerifiedBadgeSmall />
      </a>
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

function VerifiedBadgeSmall() {
  return (
    <span className="inline-flex items-center justify-center" title="Verified">
      <svg
        width="16"
        height="16"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block"
      >
        <defs>
          <radialGradient id="sphereGradNav" cx="38%" cy="35%" r="55%" fx="30%" fy="28%">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="35%" stopColor="#38BDF8" />
            <stop offset="70%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0369A1" />
          </radialGradient>
          <radialGradient id="glossGradNav" cx="35%" cy="25%" r="45%">
            <stop offset="0%" stopColor="white" stopOpacity="0.55" />
            <stop offset="60%" stopColor="white" stopOpacity="0.08" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="spokeGlowNav" cx="50%" cy="50%" r="50%">
            <stop offset="45%" stopColor="#38BDF8" stopOpacity="0" />
            <stop offset="60%" stopColor="#7DD3FC" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>
          <filter id="shadowNav" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#0369A1" floodOpacity="0.5" />
          </filter>
        </defs>
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <ellipse
            key={angle}
            cx="50"
            cy="50"
            rx="46"
            ry="10"
            fill="url(#spokeGlowNav)"
            transform={`rotate(${angle} 50 50)`}
            opacity="0.7"
          />
        ))}
        <circle cx="50" cy="50" r="42" fill="url(#sphereGradNav)" filter="url(#shadowNav)" />
        <circle cx="50" cy="50" r="42" fill="url(#glossGradNav)" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
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
