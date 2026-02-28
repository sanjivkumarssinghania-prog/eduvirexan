import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const stats = [
  { value: "500+", label: "Courses Available", color: "oklch(0.72 0.19 220)" },
  { value: "50K+", label: "Active Students", color: "oklch(0.68 0.22 265)" },
  { value: "200+", label: "AI-Powered Tools", color: "oklch(0.62 0.22 285)" },
  { value: "98%", label: "Success Rate", color: "oklch(0.75 0.18 195)" },
];

function StatItem({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col items-center gap-2 group"
    >
      <motion.span
        className="font-display text-4xl md:text-5xl font-bold"
        style={{ color: stat.color }}
        initial={{ scale: 0.8 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{
          duration: 0.5,
          delay: index * 0.1 + 0.2,
          type: "spring",
          stiffness: 200,
        }}
      >
        {stat.value}
      </motion.span>
      <span className="text-sm text-muted-foreground font-medium tracking-wide text-center">
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} id="about" className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 glass border-y border-border/30" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.72 0.19 220 / 0.05), oklch(0.62 0.22 285 / 0.1), oklch(0.72 0.19 220 / 0.05))",
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
