
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Lightbulb, Award, Rocket, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const About = () => {
  const [aboutContent, setAboutContent] = useState({
    title: "About CSED",
    description: "The Center for Skills and Entrepreneurship Development is dedicated to nurturing the next generation of innovators and entrepreneurs through comprehensive programs, mentorship, and hands-on learning experiences.",
    mission: "Fostering entrepreneurial mindset and practical skills among students to create future leaders.",
    vision: "To be the leading center for innovation and entrepreneurship development in the region."
  });

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    const { data, error } = await supabase
      .from('about_content')
      .select('*')
      .limit(1)
      .single();

    if (data) {
      setAboutContent(data);
    }
  };

  const features = [
    {
      icon: Target,
      title: "Mission Driven",
      description: aboutContent.mission || "Fostering entrepreneurial mindset and practical skills among students to create future leaders.",
      color: "from-cyan-400 to-blue-600"
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Building a strong network of innovators, mentors, and industry professionals.",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Lightbulb,
      title: "Innovation Hub",
      description: "Providing platform for creative thinking, problem-solving, and startup development.",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to maintaining highest standards in education and entrepreneurship development.",
      color: "from-pink-500 to-cyan-400"
    },
    {
      icon: Rocket,
      title: "Growth Accelerator",
      description: "Fast-tracking startup ideas from concept to market with comprehensive support systems.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connecting local talent with international opportunities and global entrepreneurship ecosystem.",
      color: "from-blue-600 to-purple-500"
    }
  ];

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Tech background effects */}
      <div className="absolute inset-0 matrix-bg opacity-50">
        <div className="circuit-overlay"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-bold mb-8 animate-decode-text">
            <span className="cyber-text" style={{ fontFamily: 'Orbitron, monospace' }}>
              {aboutContent.title}
            </span>
          </h2>
          <div className="holo-card p-8 rounded-lg max-w-4xl mx-auto animate-hologram animation-delay-500">
            <p className="text-xl md:text-2xl text-cyan-300 leading-relaxed font-mono">
              {"> "}{aboutContent.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`holo-card border-cyan-400 hover:scale-105 transform transition-all duration-500 animate-cyber-zoom animation-delay-${800 + index * 200}`}
            >
              <CardContent className="p-8 text-center relative overflow-hidden">
                {/* Laser sweep effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-laser-sweep"></div>
                
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 animate-neon-pulse transform hover:rotate-12 transition-transform duration-300`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-cyan-300 mb-4 font-mono">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Circuit corner decorations */}
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-50"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan-400 opacity-50"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission and Vision with HUD styling */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="holo-card p-10 rounded-lg hover:scale-105 transform transition-all duration-500 animate-cyber-zoom animation-delay-1500">
            <div className="hud-element p-1 rounded mb-6">
              <h3 className="cyber-text text-3xl font-bold mb-6" style={{ fontFamily: 'Orbitron, monospace' }}>
                Our Mission
              </h3>
            </div>
            <p className="text-cyan-300 text-lg leading-relaxed font-mono">
              {"> "}{aboutContent.mission}
            </p>
          </div>
          
          <div className="holo-card p-10 rounded-lg hover:scale-105 transform transition-all duration-500 animate-cyber-zoom animation-delay-1700">
            <div className="hud-element p-1 rounded mb-6">
              <h3 className="cyber-text text-3xl font-bold mb-6" style={{ fontFamily: 'Orbitron, monospace' }}>
                Our Vision
              </h3>
            </div>
            <p className="text-cyan-300 text-lg leading-relaxed font-mono">
              {"> "}{aboutContent.vision}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
