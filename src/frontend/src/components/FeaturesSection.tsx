import { ArrowRight, Brain, GraduationCap, Layers } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const features = [
  {
    icon: GraduationCap,
    title: "Education",
    subtitle: "Foundation of Knowledge",
    description:
      "Access structured, curriculum-aligned courses across mathematics, sciences, languages, and humanities. Expert-crafted content for learners at every level.",
    color: "oklch(0.72 0.19 220)",
    gradientFrom: "oklch(0.72 0.19 220 / 0.15)",
    gradientTo: "oklch(0.72 0.19 220 / 0.02)",
    highlights: ["Structured Curriculum", "Expert Instructors", "Certificates"],
  },
  {
    icon: Layers,
    title: "Formation",
    subtitle: "Professional Development",
    description:
      "Bridge the gap between education and career with industry-focused formation programs. From coding bootcamps to leadership training.",
    color: "oklch(0.68 0.22 265)",
    gradientFrom: "oklch(0.68 0.22 265 / 0.15)",
    gradientTo: "oklch(0.68 0.22 265 / 0.02)",
    highlights: ["Industry Projects", "Mentorship", "Career Support"],
  },
  {
    icon: Brain,
    title: "AI Learning",
    subtitle: "Intelligent Education",
    description:
      "Harness the power of artificial intelligence for personalized learning paths, smart assessments, and adaptive content that evolves with you.",
    color: "oklch(0.62 0.22 285)",
    gradientFrom: "oklch(0.62 0.22 285 / 0.15)",
    gradientTo: "oklch(0.62 0.22 285 / 0.02)",
    highlights: ["Personalized Paths", "AI Tutor", "Smart Analytics"],
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background blobs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-8 pointer-events-none"
        style={{ background: "oklch(0.72 0.19 220)" }}
      />

      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl"
        ref={ref}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-primary" />
            What We Offer
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
            Three Pillars of{" "}
            <span className="text-gradient-blue">Excellence</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete ecosystem designed to transform how you learn, grow, and
            innovate in the digital age.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="gradient-border rounded-2xl p-8 group cursor-default relative overflow-hidden"
              >
                {/* Card gradient bg */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-100 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${feat.gradientFrom}, ${feat.gradientTo})`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${feat.color}, ${feat.color.replace(")", " / 0.6)")})`,
                    }}
                  >
                    <Icon size={26} color="white" />
                  </div>

                  <p
                    className="text-xs font-semibold tracking-widest uppercase mb-2"
                    style={{ color: feat.color }}
                  >
                    {feat.subtitle}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {feat.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {feat.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-center gap-2 text-sm text-foreground/70"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: feat.color }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div
                    className="flex items-center gap-1 mt-6 text-sm font-semibold group-hover:gap-2 transition-all duration-200"
                    style={{ color: feat.color }}
                  >
                    Explore
                    <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
