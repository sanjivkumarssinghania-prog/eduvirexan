import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Clock, Loader2, Tag } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useMemo, useState } from "react";
import { useRef } from "react";
import { Category, type Course, useGetAllCourses } from "../hooks/useQueries";

const filterTabs = [
  { label: "All", value: "all" },
  { label: "Education", value: Category.education },
  { label: "Formation", value: Category.formation },
  { label: "AI", value: Category.ai },
];

const categoryColors: Record<string, { bg: string; text: string }> = {
  [Category.ai]: {
    bg: "oklch(0.62 0.22 285 / 0.2)",
    text: "oklch(0.75 0.18 285)",
  },
  [Category.formation]: {
    bg: "oklch(0.68 0.22 265 / 0.2)",
    text: "oklch(0.78 0.16 265)",
  },
  [Category.education]: {
    bg: "oklch(0.72 0.19 220 / 0.2)",
    text: "oklch(0.82 0.14 220)",
  },
};

const fallbackCourses: Course[] = [
  {
    id: 1n,
    title: "Machine Learning Fundamentals",
    description:
      "Master the core concepts of ML algorithms, neural networks, and model deployment with hands-on projects.",
    category: Category.ai,
    tags: ["Python", "TensorFlow", "Deep Learning"],
    createdAt: BigInt(Date.now()),
  },
  {
    id: 2n,
    title: "Full-Stack Web Development",
    description:
      "Build complete web applications with React, Node.js, and modern deployment practices.",
    category: Category.formation,
    tags: ["React", "Node.js", "TypeScript"],
    createdAt: BigInt(Date.now()),
  },
  {
    id: 3n,
    title: "Digital Literacy & Critical Thinking",
    description:
      "Navigate the information age with analytical skills, media literacy, and digital competencies.",
    category: Category.education,
    tags: ["Critical Thinking", "Research", "Digital Skills"],
    createdAt: BigInt(Date.now()),
  },
  {
    id: 4n,
    title: "Generative AI & Prompt Engineering",
    description:
      "Leverage LLMs, diffusion models, and AI APIs to build next-generation intelligent applications.",
    category: Category.ai,
    tags: ["GPT-4", "Midjourney", "LangChain"],
    createdAt: BigInt(Date.now()),
  },
  {
    id: 5n,
    title: "Leadership & Management Formation",
    description:
      "Develop executive leadership, team management, and organizational strategy capabilities.",
    category: Category.formation,
    tags: ["Leadership", "Strategy", "Communication"],
    createdAt: BigInt(Date.now()),
  },
  {
    id: 6n,
    title: "Advanced Mathematics for AI",
    description:
      "Linear algebra, calculus, and probability theory tailored for machine learning practitioners.",
    category: Category.education,
    tags: ["Linear Algebra", "Calculus", "Statistics"],
    createdAt: BigInt(Date.now()),
  },
];

function CourseCard({ course, index }: { course: Course; index: number }) {
  const colors =
    categoryColors[course.category] ?? categoryColors[Category.education];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      layout
      className="gradient-border rounded-xl p-6 group hover:shadow-glow transition-all duration-300 cursor-default"
    >
      {/* Category badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{ background: colors.bg, color: colors.text }}
        >
          {course.category}
        </span>
        <div className="flex items-center gap-1 text-muted-foreground text-xs">
          <Clock size={12} />
          <span>Self-paced</span>
        </div>
      </div>

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
        style={{ background: colors.bg }}
      >
        <BookOpen size={18} style={{ color: colors.text }} />
      </div>

      {/* Title & description */}
      <h3 className="font-display text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
        {course.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
        {course.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {course.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md"
            style={{
              background: "oklch(var(--muted) / 0.6)",
              color: "oklch(var(--muted-foreground))",
            }}
          >
            <Tag size={10} />
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function CourseSkeletonCard() {
  return (
    <div className="gradient-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-10 w-10 rounded-lg mb-4" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-24 rounded-md" />
      </div>
    </div>
  );
}

export default function CoursesSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data: courses, isLoading } = useGetAllCourses();

  const displayCourses =
    courses && courses.length > 0 ? courses : fallbackCourses;

  const filtered = useMemo(() => {
    if (activeFilter === "all") return displayCourses;
    return displayCourses.filter((c) => c.category === activeFilter);
  }, [displayCourses, activeFilter]);

  return (
    <section id="courses" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-1/2 right-0 w-80 h-80 rounded-full blur-3xl opacity-8 pointer-events-none -translate-y-1/2"
        style={{ background: "oklch(0.62 0.22 285)" }}
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
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-primary" />
            Our Catalogue
            <span className="w-8 h-px bg-primary" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
            Explore Our <span className="text-gradient-blue">Courses</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From foundational knowledge to advanced AI applications — find the
            path that accelerates your growth.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center justify-center gap-2 mb-10 flex-wrap"
        >
          {filterTabs.map((tab) => (
            <button
              type="button"
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-250 ${
                activeFilter === tab.value
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {activeFilter === tab.value && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.3), oklch(0.62 0.22 285 / 0.3))",
                    border: "1px solid oklch(0.72 0.19 220 / 0.4)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Course grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <CourseSkeletonCard key={n} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((course, i) => (
                <CourseCard
                  key={course.id.toString()}
                  course={course}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty state */}
        {!isLoading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-muted-foreground"
          >
            <BookOpen size={40} className="mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">
              No courses in this category yet.
            </p>
            <p className="text-sm mt-1">
              More content is on the way — check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
