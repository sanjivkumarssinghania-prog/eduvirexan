import { Skeleton } from "@/components/ui/skeleton";
import { Quote, Star } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { type Testimonial, useGetAllTestimonials } from "../hooks/useQueries";

const fallbackTestimonials: Testimonial[] = [
  {
    id: 1n,
    name: "Aryan Sharma",
    role: "Software Engineer at TechCorp",
    message:
      "Eduvirexan completely transformed my career. The AI-powered learning paths helped me master machine learning in just 3 months. Highly recommended!",
    rating: 5n,
  },
  {
    id: 2n,
    name: "Priya Malhotra",
    role: "Data Scientist at FinLab",
    message:
      "The formation programs are incredibly practical. I went from knowing nothing about data science to landing my dream job thanks to this platform.",
    rating: 5n,
  },
  {
    id: 3n,
    name: "Rahul Verma",
    role: "Product Manager at StartupXYZ",
    message:
      "The course quality is exceptional. The AI tutor helped me understand complex concepts instantly. Best investment I've made in my education.",
    rating: 5n,
  },
  {
    id: 4n,
    name: "Sneha Kapoor",
    role: "UX Designer at DesignHub",
    message:
      "What sets Eduvirexan apart is the community and mentorship. The personalized learning experience is unlike anything I've encountered before.",
    rating: 4n,
  },
  {
    id: 5n,
    name: "Vikram Singh",
    role: "AI Researcher at NeuroLabs",
    message:
      "As someone deep in AI research, I'm amazed by the depth of content on this platform. The curriculum stays current with latest developments in the field.",
    rating: 5n,
  },
  {
    id: 6n,
    name: "Aisha Khan",
    role: "Full-Stack Developer",
    message:
      "The hands-on projects and real-world applications make learning so much more effective. I built three production apps during my courses here!",
    rating: 5n,
  },
];

function StarRating({ rating }: { rating: bigint }) {
  const r = Number(rating);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          fill={star <= r ? "oklch(0.85 0.18 75)" : "transparent"}
          color={
            star <= r ? "oklch(0.85 0.18 75)" : "oklch(var(--muted-foreground))"
          }
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const initials = t.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const gradients = [
    "linear-gradient(135deg, oklch(0.72 0.19 220), oklch(0.62 0.22 265))",
    "linear-gradient(135deg, oklch(0.62 0.22 285), oklch(0.72 0.19 220))",
    "linear-gradient(135deg, oklch(0.68 0.22 265), oklch(0.62 0.22 285))",
    "linear-gradient(135deg, oklch(0.72 0.19 220), oklch(0.75 0.18 195))",
    "linear-gradient(135deg, oklch(0.65 0.22 285), oklch(0.72 0.19 220))",
    "linear-gradient(135deg, oklch(0.75 0.18 195), oklch(0.68 0.22 265))",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="gradient-border rounded-2xl p-6 flex flex-col gap-4 group hover:shadow-glow transition-all duration-300"
    >
      {/* Quote icon */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ background: "oklch(0.72 0.19 220 / 0.15)" }}
      >
        <Quote size={14} style={{ color: "oklch(0.72 0.19 220)" }} />
      </div>

      <StarRating rating={t.rating} />

      <p className="text-sm text-foreground/80 leading-relaxed italic flex-1">
        "{t.message}"
      </p>

      <div className="flex items-center gap-3 pt-2 border-t border-border/30">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ background: gradients[index % gradients.length] }}
        >
          {initials}
        </div>
        <div>
          <p className="font-semibold text-sm text-foreground">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialSkeleton() {
  return (
    <div className="gradient-border rounded-2xl p-6 space-y-4">
      <Skeleton className="h-8 w-8 rounded-lg" />
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Skeleton key={star} className="h-3 w-3 rounded-sm" />
        ))}
      </div>
      <Skeleton className="h-16 w-full" />
      <div className="flex items-center gap-3 pt-2">
        <Skeleton className="h-10 w-10 rounded-full shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-4 w-32 mb-1" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data: testimonials, isLoading } = useGetAllTestimonials();

  const displayTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials
      : fallbackTestimonials;

  return (
    <section className="relative py-24 overflow-hidden">
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-8 pointer-events-none"
        style={{ background: "oklch(0.72 0.19 220)" }}
      />

      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl"
        ref={ref}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-primary" />
            Student Stories
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
            What Our <span className="text-gradient-blue">Students Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real voices, real transformations. Join thousands who've accelerated
            their careers with Eduvirexan.
          </p>
        </motion.div>

        {/* Testimonial grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <TestimonialSkeleton key={n} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTestimonials.map((t, i) => (
              <TestimonialCard key={t.id.toString()} t={t} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
