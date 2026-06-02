import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "HOME" },
  { to: "/projects", label: "PROJECTS" },
  { to: "/about", label: "ABOUT" },
  { to: "/contact", label: "CONTACT" },
] as const;

export function SiteNav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 px-8 md:px-14 py-7 flex items-center justify-between">
      <Link to="/" className="font-display text-sm tracking-wider uppercase">
        Sampath Satya Saran
      </Link>
      <nav className="flex items-center gap-7 md:gap-10">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="text-sm tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors"
            activeProps={{ className: "text-foreground font-semibold" }}
            activeOptions={{ exact: true }}
          >
            {l.label}
          </Link>
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
        <a href="https://linkedin.com/in/sampath1904" target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
        <a href="https://github.com/Sampath0411" target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
      </div>
    </footer>
  );
}
