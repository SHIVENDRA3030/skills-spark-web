
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Terminal, Cpu } from "lucide-react";
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
      {/* Advanced Tech Background */}
      <div className="matrix-bg">
        <div className="circuit-overlay"></div>
      </div>
      
      {/* Floating geometric shapes with circuit patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl animate-particle-float"></div>
          <div className="absolute inset-0 border border-cyan-400 rounded-full animate-hexagon-spin"></div>
        </div>
        <div className="absolute top-40 right-20 w-80 h-80 opacity-15">
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-2xl animate-particle-float animation-delay-1000"></div>
        </div>
        <div className="absolute bottom-40 left-1/2 w-72 h-72 opacity-25">
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full blur-xl animate-particle-float animation-delay-2000"></div>
        </div>

        {/* Circuit board patterns */}
        <div className="absolute top-32 right-1/4 w-32 h-32 border border-cyan-400 opacity-30 animate-circuit-flow">
          <div className="absolute inset-4 border border-cyan-400"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-cyan-400 animate-energy-flow"></div>
        </div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 border border-blue-400 opacity-20 animate-circuit-flow animation-delay-1500">
          <div className="absolute inset-2 border border-blue-400"></div>
        </div>
        
        {/* HUD Elements */}
        <div className="absolute top-1/2 right-16 hud-element p-4 rounded opacity-30">
          <Cpu className="w-8 h-8 text-cyan-400 animate-neon-pulse" />
        </div>
        <div className="absolute top-1/4 left-16 hud-element p-3 rounded opacity-25">
          <Terminal className="w-6 h-6 text-blue-400 animate-neon-pulse" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-20">
        {/* Cyber Header Badge */}
        <div className="mb-8 animate-cyber-zoom">
          <div className="inline-flex items-center px-8 py-4 rounded-lg holo-card border border-cyan-400 mb-8 hover:scale-105 transition-all duration-300">
            <Terminal className="w-6 h-6 text-cyan-400 mr-4 animate-neon-pulse" />
            <span className="cyber-text text-lg font-bold tracking-wider">
              {heroContent.subtitle}
            </span>
            <div className="ml-4 w-3 h-3 bg-cyan-400 rounded-full animate-neon-pulse"></div>
          </div>
          
          {/* Glitch Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight">
            <div className="animate-decode-text">
              <span className="glitch-text cyber-text block mb-4" data-text={heroContent.title.split(' & ')[0]}>
                {heroContent.title.split(' & ')[0]}
              </span>
            </div>
            <div className="animate-decode-text animation-delay-500">
              <span className="glitch-text block" data-text={heroContent.title.includes(' & ') ? `& ${heroContent.title.split(' & ')[1]}` : ''} style={{
                fontFamily: 'Orbitron, monospace',
                background: 'linear-gradient(45deg, #00ffff, #0080ff, #ff0080, #00ffff)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'cyberGradient 4s ease-in-out infinite'
              }}>
                {heroContent.title.includes(' & ') ? `& ${heroContent.title.split(' & ')[1]}` : ''}
              </span>
            </div>
          </h1>
          
          {/* Terminal-style description */}
          <div className="animate-terminal-type animation-delay-1000 overflow-hidden whitespace-nowrap mb-8">
            <p className="text-xl md:text-2xl text-cyan-300 font-mono border-r-2 border-cyan-400 animate-neon-pulse">
              {"> "}{heroContent.description}
            </p>
          </div>
        </div>

        {/* Cyber Buttons */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center animate-cyber-zoom animation-delay-1500">
          <Link to="/auth">
            <Button className="cyber-button px-12 py-6 text-lg rounded-lg transform hover:scale-110 transition-all duration-300">
              {heroContent.cta_primary_text}
              <ArrowRight className="ml-4 h-6 w-6 animate-energy-flow" />
            </Button>
          </Link>
          
          <Link to="/events">
            <Button className="cyber-button bg-transparent px-12 py-6 text-lg rounded-lg transform hover:scale-110 transition-all duration-300">
              {heroContent.cta_secondary_text}
              <Zap className="ml-4 h-6 w-6 animate-neon-pulse" />
            </Button>
          </Link>
        </div>

        {/* Enhanced HUD Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-cyber-zoom animation-delay-2000">
          {[
            { number: "500+", label: "Students", icon: "👥" },
            { number: "50+", label: "Events", icon: "🚀" },
            { number: "25+", label: "Startups", icon: "💡" },
            { number: "100%", label: "Success", icon: "⚡" }
          ].map((stat, index) => (
            <div key={index} className={`holo-card p-6 rounded-lg animate-hologram animation-delay-${2200 + index * 200}`}>
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="cyber-text text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-cyan-300 text-sm uppercase tracking-wider font-mono">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Cyber scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-16 border-2 border-cyan-400 rounded-full flex justify-center animate-neon-pulse">
            <div className="w-2 h-6 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mt-2 animate-cyber-scan"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
