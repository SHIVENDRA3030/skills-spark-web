
import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

// Lazy load heavy components for better performance
const About = lazy(() => import("@/components/About").then(module => ({ default: module.About })));
const Events = lazy(() => import("@/components/Events").then(module => ({ default: module.Events })));
const Team = lazy(() => import("@/components/Team").then(module => ({ default: module.Team })));
const Contact = lazy(() => import("@/components/Contact").then(module => ({ default: module.Contact })));

// Loading component
const SectionLoader = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="animate-pulse bg-white/10 h-32 w-full max-w-4xl rounded-lg"></div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900/30 to-slate-900">
      <Navbar />
      <Hero />
      
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Events />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Team />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
      
      <Footer />
    </div>
  );
};

export default Index;
