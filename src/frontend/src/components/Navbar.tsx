import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#courses" },
  { label: "AI Tools", href: "#ai-tools" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass border-b border-border/50 shadow-glow"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.button
              type="button"
              onClick={() => handleNavClick("#home")}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src="/assets/generated/eduvirexan-logo-transparent.dim_400x120.png"
                alt="Eduvirexan"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </motion.button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 bg-gradient-to-r from-primary to-violet group-hover:w-3/4 transition-all duration-300 rounded-full" />
                </motion.a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                size="sm"
                className="bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:border-primary/60 transition-all duration-200"
                variant="outline"
                onClick={() => handleNavClick("#courses")}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-40 w-72 glass-strong shadow-2xl flex flex-col pt-20 pb-8 px-6"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-200 font-medium"
                >
                  <GraduationCap size={18} className="text-primary/60" />
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4"
              >
                <Button
                  className="w-full"
                  onClick={() => handleNavClick("#courses")}
                >
                  Get Started Free
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
