
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

export const Hero = () => {
  const [heroContent, setHeroContent] = useState({
    title: "Center for Skills & Entrepreneurship Development",
    subtitle: "Igniting Innovation & Entrepreneurship",
    description: "Empowering students to transform ideas into reality through innovation, skill development, and entrepreneurial excellence.",
    cta_primary_text: "Join Our Community",
    cta_secondary_text: "Explore Events",
    stats_students_count: "500+",
    stats_students_label: "Students Enrolled",
    stats_programs_count: "50+",
    stats_programs_label: "Programs Completed",
    stats_startups_count: "25+",
    stats_startups_label: "Successful Startups",
    stats_success_count: "100%",
    stats_success_label: "Success Rate"
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

  const stats = [
    { 
      number: heroContent.stats_students_count || "500+", 
      label: heroContent.stats_students_label || "Students Enrolled" 
    },
    { 
      number: heroContent.stats_programs_count || "50+", 
      label: heroContent.stats_programs_label || "Programs Completed" 
    },
    { 
      number: heroContent.stats_startups_count || "25+", 
      label: heroContent.stats_startups_label || "Successful Startups" 
    },
    { 
      number: heroContent.stats_success_count || "100%", 
      label: heroContent.stats_success_label || "Success Rate" 
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="mb-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 mb-8 shadow-sm">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-blue-700 text-sm font-medium">
              {heroContent.subtitle}
            </span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              {heroContent.title}
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            {heroContent.description}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link to="/auth">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {heroContent.cta_primary_text}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/events">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5" />
              {heroContent.cta_secondary_text}
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
