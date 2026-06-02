import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top visible rounded-full w-10 h-10 flex items-center justify-center bg-foreground text-background hover:bg-accent-blue hover:text-white transition-colors duration-300 ${
        visible ? "visible" : ""
      }`}
      aria-label="Back to top"
    >
      <ChevronUp className="size-5" />
    </button>
  );
}
