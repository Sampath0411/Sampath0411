import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav, SiteFooter } from "../components/SiteNav";
import { CustomCursor } from "../components/CustomCursor";
import { BackToTop } from "../components/BackToTop";
import { NowPlaying } from "../components/NowPlaying";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-accent-blue px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-accent-blue px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Try again
          </button>
          <a href="/" className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sampath Satya Saran — Full-Stack Developer" },
      { name: "description", content: "Second-year CSE student at Andhra University. Full-stack developer building production-grade web apps with React, TypeScript, and Supabase. Seeking WFH internship opportunities." },
      { name: "author", content: "Sampath Satya Saran" },
      { property: "og:title", content: "Sampath Satya Saran — Full-Stack Developer" },
      { property: "og:description", content: "Second-year CSE student building production-grade web apps. React · TypeScript · Supabase. Seeking WFH internships." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sampath Satya Saran — Full-Stack Developer" },
      { name: "twitter:description", content: "Second-year CSE student building production-grade web apps. React · TypeScript · Supabase." },
      { name: "twitter:image", content: "/og-image.svg" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head><HeadContent /></head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `
          const EDITZ_URL = 'https://samxeditz-56.vercel.app/';
          const DEV_URL = 'https://sampath-portfolio0411.vercel.app/';

          function switchMode(mode) {
            if (mode === 'editz') {
              document.getElementById('editzBtn').classList.add('active');
              document.getElementById('devBtn').classList.remove('active');
              localStorage.setItem('siteMode', 'editz');
              window.location.href = EDITZ_URL;
            } else {
              document.getElementById('editzBtn').classList.remove('active');
              document.getElementById('devBtn').classList.add('active');
              localStorage.setItem('siteMode', 'dev');
              window.location.href = DEV_URL;
            }
          }

          (function() {
            var saved = localStorage.getItem('siteMode');
            if (saved === 'editz') {
              var editzBtn2 = document.getElementById('editzBtn');
              var devBtn2 = document.getElementById('devBtn');
              if (editzBtn2) editzBtn2.classList.add('active');
              if (devBtn2) devBtn2.classList.remove('active');
            } else {
              var devBtn = document.getElementById('devBtn');
              var editzBtn = document.getElementById('editzBtn');
              if (devBtn) devBtn.classList.add('active');
              if (editzBtn) editzBtn.classList.remove('active');
            }
          })();
        ` }} />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

export function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CustomCursor />
      <SiteNav />
      <Outlet />
      <SiteFooter />
      <BackToTop />
      <NowPlaying />
    </QueryClientProvider>
  );
}
