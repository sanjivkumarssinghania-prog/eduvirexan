import { Toaster } from "@/components/ui/sonner";
import AIHighlight from "./components/AIHighlight";
import CoursesSection from "./components/CoursesSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import NewsletterSection from "./components/NewsletterSection";
import StatsBar from "./components/StatsBar";
import TestimonialsSection from "./components/TestimonialsSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Toaster richColors position="top-right" />
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <FeaturesSection />
        <CoursesSection />
        <AIHighlight />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
