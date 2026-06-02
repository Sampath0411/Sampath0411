import { createFileRoute } from "@tanstack/react-router";
import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Let's Connect — Sampath Satya Saran" },
      { name: "description", content: "Reach Sampath for collaborations, internships or to just say hello." },
      { property: "og:title", content: "Let's Connect — Sampath Satya Saran" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />
      <main className="flex-1 px-8 md:px-14 pt-32 pb-12 max-w-6xl mx-auto w-full">
        <div className="text-center">
          <h1 className="font-display text-5xl md:text-7xl uppercase">Let's Connect</h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Reach out for collaborations, internships, or just to say hello.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
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
        </div>
      </main>
      <SiteFooter />
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
