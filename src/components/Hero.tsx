
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
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
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-40 left-1/2 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6 animate-bounce-slow">
            <Sparkles className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-300 text-sm font-medium">
              {heroContent.subtitle}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up">
            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              {heroContent.title.split(' & ')[0]}
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              {heroContent.title.includes(' & ') ? `& ${heroContent.title.split(' & ')[1]}` : ''}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-300">
            {heroContent.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-500">
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg group transform hover:scale-105 transition-all duration-300">
              {heroContent.cta_primary_text}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <Link to="/events">
            <Button variant="outline" size="lg" className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white px-8 py-3 text-lg transform hover:scale-105 transition-all duration-300">
              {heroContent.cta_secondary_text}
            </Button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
