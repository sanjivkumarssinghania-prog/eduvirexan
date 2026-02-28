import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, Sparkles } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useState } from "react";
import { useRef } from "react";
import { toast } from "sonner";
import { useSubscribeToNewsletter } from "../hooks/useQueries";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { mutate: subscribe, isPending } = useSubscribeToNewsletter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    subscribe(trimmed, {
      onSuccess: () => {
        toast.success("You're subscribed! Welcome to Eduvirexan.", {
          description: "Stay tuned for the latest courses and AI tools.",
        });
        setEmail("");
      },
      onError: () => {
        toast.error("Subscription failed. Please try again.");
      },
    });
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.68 0.22 265 / 0.1) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl"
        ref={ref}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="gradient-border rounded-3xl p-8 md:p-14 text-center relative overflow-hidden"
          style={{
            background: "oklch(0.12 0.025 265 / 0.8)",
          }}
        >
          {/* Glow orbs inside card */}
          <div
            className="absolute top-0 left-1/4 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: "oklch(0.72 0.19 220)" }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: "oklch(0.62 0.22 285)" }}
          />

          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.25), oklch(0.62 0.22 285 / 0.25))",
                border: "1px solid oklch(0.72 0.19 220 / 0.3)",
              }}
            >
              <Mail size={28} className="text-primary" />
            </motion.div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-5 text-xs font-semibold text-primary">
              <Sparkles size={12} />
              Stay in the Loop
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
              Get the Latest{" "}
              <span className="text-gradient-vivid">Courses & Updates</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-lg mx-auto">
              Subscribe to our newsletter and be the first to know about new AI
              courses, formation programs, and exclusive learning resources.
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="flex-1 relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-muted/50 border-border/60 focus:border-primary/60 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/60"
                  disabled={isPending}
                  autoComplete="email"
                  name="email"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isPending}
                className="h-12 px-6 font-semibold whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.19 220), oklch(0.62 0.22 285))",
                  color: "white",
                  border: "none",
                }}
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe Free"
                )}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground/60 mt-4">
              No spam, ever. Unsubscribe anytime with one click.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
