
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Lightbulb, Award } from "lucide-react";

export const About = () => {
  const features = [
    {
      icon: Target,
      title: "Mission Driven",
      description: "Fostering entrepreneurial mindset and practical skills among students to create future leaders."
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Building a strong network of innovators, mentors, and industry professionals."
    },
    {
      icon: Lightbulb,
      title: "Innovation Hub",
      description: "Providing platform for creative thinking, problem-solving, and startup development."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to maintaining highest standards in education and entrepreneurship development."
    }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              About CSED
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The Center for Skills and Entrepreneurship Development is dedicated to nurturing 
            the next generation of innovators and entrepreneurs through comprehensive programs, 
            mentorship, and hands-on learning experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
