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
      <a href="#home" className="font-display text-sm tracking-wider uppercase hover:opacity-80 transition-opacity">
        Sampath Satya Saran
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
