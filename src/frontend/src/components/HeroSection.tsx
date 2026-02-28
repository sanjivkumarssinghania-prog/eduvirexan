import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-banner.dim_1200x500.jpg"
          alt=""
          className="w-full h-full object-cover scale-105"
          style={{ filter: "brightness(0.35) saturate(1.4)" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/40" />
      </div>

      {/* Background grid */}
      <div className="absolute inset-0 z-0 bg-grid opacity-30" />

      {/* Floating orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: "oklch(0.72 0.19 220)" }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "oklch(0.62 0.22 285)" }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-sm font-medium"
        >
          <Sparkles size={14} className="text-primary" />
          <span className="text-primary">AI-Powered Education Platform</span>
          <span className="text-muted-foreground">• Learn the Future</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-6"
        >
          <span className="block text-foreground">Welcome to</span>
          <span className="block text-gradient-vivid mt-2">Eduvirexan</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10"
        >
          Transforming education through{" "}
          <span className="text-foreground font-semibold">
            AI-powered learning
          </span>
          , professional formation, and cutting-edge digital courses designed
          for the next generation of innovators.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="group relative px-8 py-6 text-base font-semibold overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.19 220), oklch(0.62 0.22 285))",
              color: "white",
              border: "none",
            }}
            onClick={() => scrollTo("#courses")}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Courses
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </span>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group px-8 py-6 text-base font-semibold border-primary/40 text-primary hover:border-primary/80 hover:bg-primary/10 transition-all duration-200"
            onClick={() => scrollTo("#ai-tools")}
          >
            <Play
              size={16}
              className="mr-2 group-hover:scale-110 transition-transform duration-200"
            />
            Learn with AI
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-sm"
        >
          {[
            "500+ Courses",
            "50K+ Students",
            "200+ AI Tools",
            "Globally Recognized",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-muted-foreground/60 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
