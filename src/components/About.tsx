
import { useEffect, useState } from "react";
import { Target, Users, Lightbulb, Award, Rocket, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ModernCard, GlowCard } from "./ModernCard";
import { RevealOnScroll } from "./PerformantAnimations";

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
    try {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .limit(1)
        .single();

      if (data && !error) {
        setAboutContent(data);
      }
    } catch (error) {
      console.log('Using default about content');
    }
  };

  const features = [
    {
      icon: Target,
      title: "Mission Driven",
      description: aboutContent.mission || "Fostering entrepreneurial mindset and practical skills among students to create future leaders.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Building a strong network of innovators, mentors, and industry professionals.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Lightbulb,
      title: "Innovation Hub",
      description: "Providing platform for creative thinking, problem-solving, and startup development.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to maintaining highest standards in education and entrepreneurship development.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: Rocket,
      title: "Growth Accelerator",
      description: "Fast-tracking startup ideas from concept to market with comprehensive support systems.",
      gradient: "from-green-500 to-blue-500"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connecting local talent with international opportunities and global entrepreneurship ecosystem.",
      gradient: "from-violet-500 to-purple-500"
    }
  ];

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                {aboutContent.title}
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              {aboutContent.description}
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <RevealOnScroll key={index} delay={index * 100}>
              <ModernCard className="h-full">
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ModernCard>
            </RevealOnScroll>
          ))}
        </div>

        {/* Mission and Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <RevealOnScroll delay={200}>
            <GlowCard>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">Our Mission</h3>
              <p className="text-slate-300 text-lg leading-relaxed">{aboutContent.mission}</p>
            </GlowCard>
          </RevealOnScroll>
          
          <RevealOnScroll delay={400}>
            <GlowCard>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">Our Vision</h3>
              <p className="text-slate-300 text-lg leading-relaxed">{aboutContent.vision}</p>
            </GlowCard>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
