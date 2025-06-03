
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
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Building a strong network of innovators, mentors, and industry professionals.",
      color: "from-pink-600 to-orange-500"
    },
    {
      icon: Lightbulb,
      title: "Innovation Hub",
      description: "Providing platform for creative thinking, problem-solving, and startup development.",
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to maintaining highest standards in education and entrepreneurship development.",
      color: "from-blue-600 to-purple-600"
    },
    {
      icon: Rocket,
      title: "Growth Accelerator",
      description: "Fast-tracking startup ideas from concept to market with comprehensive support systems.",
      color: "from-green-600 to-blue-600"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connecting local talent with international opportunities and global entrepreneurship ecosystem.",
      color: "from-indigo-600 to-pink-600"
    }
  ];

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-float"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 animate-slide-up">
            <span className="text-gradient">
              {aboutContent.title}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in animation-delay-300">
            {aboutContent.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`glass-effect border-slate-700 interactive-card group animate-fade-in animation-delay-${500 + index * 100}`}
            >
              <CardContent className="p-8 text-center relative overflow-hidden">
                {/* Hover effect background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 animate-glow`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-2 border-purple-400/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission and Vision Section */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="glass-effect p-8 rounded-2xl hover-lift animate-slide-in-left animation-delay-1000">
            <h3 className="text-3xl font-bold text-gradient mb-6">Our Mission</h3>
            <p className="text-gray-300 text-lg leading-relaxed">{aboutContent.mission}</p>
          </div>
          
          <div className="glass-effect p-8 rounded-2xl hover-lift animate-slide-in-right animation-delay-1200">
            <h3 className="text-3xl font-bold text-gradient mb-6">Our Vision</h3>
            <p className="text-gray-300 text-lg leading-relaxed">{aboutContent.vision}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
