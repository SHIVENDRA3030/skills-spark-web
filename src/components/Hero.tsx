
import { useEffect, useState, lazy, Suspense } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ModernButton } from "./ModernButton";
import { RevealOnScroll, FloatingParticles } from "./PerformantAnimations";

// Lazy load heavy components
const AnimatedStats = lazy(() => import('./AnimatedStats').then(module => ({ default: module.AnimatedStats })));

export const Hero = () => {
  const [heroContent, setHeroContent] = useState({
    title: "Center for Skills & Entrepreneurship Development",
    subtitle: "Igniting Innovation & Entrepreneurship",
    description: "Empowering students to transform ideas into reality through innovation, skill development, and entrepreneurial excellence.",
    cta_primary_text: "Join Our Community",
    cta_secondary_text: "Explore Events"
  });

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .limit(1)
        .single();

      if (data && !error) {
        setHeroContent(data);
      }
    } catch (error) {
      console.log('Using default hero content');
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
      {/* Optimized background */}
      <FloatingParticles />
      
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/50 to-slate-900"></div>
      
      {/* Geometric shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <RevealOnScroll>
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 hover:bg-white/20 transition-all duration-300">
              <Sparkles className="w-5 h-5 text-indigo-400 mr-3" />
              <span className="text-indigo-300 text-sm font-medium tracking-wide">
                {heroContent.subtitle}
              </span>
              <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <div className="mb-4">
                <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                  {heroContent.title.split(' & ')[0]}
                </span>
              </div>
              <div>
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {heroContent.title.includes(' & ') ? `& ${heroContent.title.split(' & ')[1]}` : ''}
                </span>
              </div>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              {heroContent.description}
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to="/auth">
              <ModernButton variant="primary" size="lg">
                {heroContent.cta_primary_text}
                <ArrowRight className="ml-3 h-6 w-6" />
              </ModernButton>
            </Link>
            
            <Link to="/events">
              <ModernButton variant="secondary" size="lg">
                {heroContent.cta_secondary_text}
              </ModernButton>
            </Link>
          </div>
        </RevealOnScroll>

        {/* Stats section with lazy loading */}
        <RevealOnScroll delay={600}>
          <Suspense fallback={<div className="h-24 flex items-center justify-center"><div className="animate-pulse bg-white/10 h-16 w-full rounded"></div></div>}>
            <AnimatedStats />
          </Suspense>
        </RevealOnScroll>
      </div>
    </section>
  );
};
