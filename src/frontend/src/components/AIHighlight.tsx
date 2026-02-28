import { Button } from "@/components/ui/button";
import { Bot, CheckCircle2, Target, TrendingUp, Zap } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const aiFeatures = [
  {
    icon: Bot,
    title: "AI Personal Tutor",
    desc: "Get instant explanations, hints, and personalized guidance 24/7",
  },
  {
    icon: Target,
    title: "Smart Learning Paths",
    desc: "Adaptive curriculum that adjusts to your pace and learning style",
  },
  {
    icon: TrendingUp,
    title: "Real-time Analytics",
    desc: "Deep insights into your progress, strengths, and growth areas",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    desc: "AI-powered assessments that provide detailed, actionable feedback",
  },
];

const checks = [
  "Powered by GPT-4 and latest AI models",
  "100+ AI tools and interactive simulations",
  "Natural language course search",
  "Automated code review and debugging help",
];

export default function AIHighlight() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ai-tools" className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, oklch(0.62 0.22 285 / 0.15), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl"
        ref={ref}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image + floating cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Glow orb behind image */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-30"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.62 0.22 285), oklch(0.72 0.19 220))",
              }}
            />

            {/* Main AI image */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <img
                src="/assets/generated/ai-icon-transparent.dim_400x400.png"
                alt="AI-powered learning"
                className="w-64 md:w-80 h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Floating stat cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute top-4 -left-4 glass rounded-xl px-4 py-3 shadow-glow-violet"
            >
              <div
                className="text-xl font-bold font-display"
                style={{ color: "oklch(0.62 0.22 285)" }}
              >
                200+
              </div>
              <div className="text-xs text-muted-foreground">AI Tools</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="absolute bottom-8 -right-4 glass rounded-xl px-4 py-3 shadow-glow"
            >
              <div
                className="text-xl font-bold font-display"
                style={{ color: "oklch(0.72 0.19 220)" }}
              >
                98%
              </div>
              <div className="text-xs text-muted-foreground">Satisfaction</div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary tracking-widest uppercase mb-4">
                <span className="w-8 h-px bg-primary" />
                AI-Powered
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-5xl mb-5">
                Learning with{" "}
                <span className="text-gradient-vivid">
                  Artificial Intelligence
                </span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Eduvirexan integrates state-of-the-art AI into every step of
                your learning journey — from discovering the right course to
                mastering complex concepts.
              </p>
            </motion.div>

            {/* Feature grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {aiFeatures.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    className="glass rounded-xl p-4 hover:border-primary/40 transition-colors duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.2), oklch(0.62 0.22 285 / 0.2))",
                        }}
                      >
                        <Icon size={16} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-1">
                          {feat.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Checklist */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="space-y-2.5 mb-8"
            >
              {checks.map((check, i) => (
                <motion.div
                  key={check}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.65 + i * 0.07 }}
                  className="flex items-center gap-3 text-sm text-foreground/80"
                >
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  {check}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
            >
              <Button
                size="lg"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.19 220), oklch(0.62 0.22 285))",
                  color: "white",
                  border: "none",
                }}
                onClick={() => {
                  const el = document.querySelector("#courses");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Start Learning with AI
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
