import {
  Github,
  GraduationCap,
  Heart,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import { motion } from "motion/react";

const footerLinks = {
  Platform: [
    { label: "Courses", href: "#courses" },
    { label: "AI Tools", href: "#ai-tools" },
    { label: "Formation", href: "#about" },
    { label: "Certifications", href: "#" },
  ],
  Learn: [
    { label: "Education", href: "#" },
    { label: "AI Learning", href: "#ai-tools" },
    { label: "Professional Dev", href: "#" },
    { label: "Mentorship", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
};

const socials = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const handleNavClick = (href: string) => {
    if (href === "#") return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-border/40">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, oklch(0.07 0.015 265), oklch(var(--background)))",
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Main footer */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            <button
              type="button"
              onClick={() => handleNavClick("#home")}
              className="inline-block mb-5"
            >
              <img
                src="/assets/generated/eduvirexan-logo-transparent.dim_400x120.png"
                alt="Eduvirexan"
                className="h-9 w-auto object-contain"
              />
            </button>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              Empowering the next generation of learners with AI-driven
              education, professional formation, and world-class courses.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-xs tracking-widest uppercase text-muted-foreground mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith("#")) {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }
                      }}
                      className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} Eduvirexan. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart size={11} className="text-red-400 fill-current" />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
