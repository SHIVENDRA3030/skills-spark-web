
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

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
    const { data, error } = await supabase
      .from('hero_content')
      .select('*')
      .limit(1)
      .single();

    if (data) {
      setHeroContent(data);
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 parallax-bg">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-pink-600 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-float animation-delay-1000"></div>
        <div className="absolute bottom-40 left-1/2 w-80 h-80 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-35 animate-float animation-delay-2000"></div>
        
        {/* Floating icons */}
        <div className="absolute top-32 right-1/4 animate-float animation-delay-500">
          <Star className="w-8 h-8 text-purple-400 opacity-60 animate-pulse-slow" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float animation-delay-1500">
          <Zap className="w-12 h-12 text-pink-400 opacity-50 animate-glow" />
        </div>
        <div className="absolute top-1/2 right-16 animate-float animation-delay-700">
          <Sparkles className="w-6 h-6 text-orange-400 opacity-70 animate-rotate-slow" />
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px] animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="mb-8 animate-zoom-in">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect border border-purple-500/30 mb-8 animate-glow hover-lift">
            <Sparkles className="w-5 h-5 text-purple-400 mr-3 animate-rotate-slow" />
            <span className="text-purple-300 text-sm font-medium tracking-wide">
              {heroContent.subtitle}
            </span>
            <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <div className="animate-slide-up">
              <span className="text-gradient block mb-2">
                {heroContent.title.split(' & ')[0]}
              </span>
            </div>
            <div className="animate-slide-up animation-delay-300">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
                {heroContent.title.includes(' & ') ? `& ${heroContent.title.split(' & ')[1]}` : ''}
              </span>
            </div>
          </h1>
          
          <div className="animate-fade-in animation-delay-500">
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              {heroContent.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in animation-delay-700">
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 text-lg group transform hover:scale-110 transition-all duration-300 animate-glow hover-lift shadow-2xl">
              {heroContent.cta_primary_text}
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </Link>
          
          <Link to="/events">
            <Button variant="outline" size="lg" className="glass-effect border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white px-10 py-4 text-lg transform hover:scale-110 transition-all duration-300 hover-lift shadow-2xl">
              {heroContent.cta_secondary_text}
            </Button>
          </Link>
        </div>

        {/* Enhanced stats section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in animation-delay-1000">
          {[
            { number: "500+", label: "Students" },
            { number: "50+", label: "Events" },
            { number: "25+", label: "Startups" },
            { number: "100%", label: "Success" }
          ].map((stat, index) => (
            <div key={index} className={`text-center animate-zoom-in animation-delay-${1200 + index * 200}`}>
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Floating action indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-purple-400 rounded-full flex justify-center bg-gradient-to-b from-transparent to-purple-600/20">
            <div className="w-2 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
