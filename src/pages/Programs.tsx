
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, Users, Lightbulb, Trophy, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Programs = () => {
  const programs = [
    {
      id: 1,
      title: "Startup Incubation Program",
      description: "A comprehensive 6-month program designed to transform your innovative ideas into viable businesses. Get mentorship, funding opportunities, and workspace.",
      duration: "6 Months",
      type: "Incubation",
      features: ["Mentorship", "Funding Support", "Co-working Space", "Legal Assistance", "Marketing Support"],
      icon: Rocket,
      color: "from-purple-600 to-pink-600"
    },
    {
      id: 2,
      title: "Entrepreneurship Bootcamp",
      description: "Intensive 2-week bootcamp covering all aspects of entrepreneurship from ideation to execution. Perfect for beginners and aspiring entrepreneurs.",
      duration: "2 Weeks",
      type: "Bootcamp",
      features: ["Business Planning", "Market Research", "Pitch Training", "Networking", "Certificate"],
      icon: Users,
      color: "from-blue-600 to-cyan-600"
    },
    {
      id: 3,
      title: "Innovation Challenge",
      description: "Annual competition where students solve real-world problems. Winners get funding and mentorship to develop their solutions further.",
      duration: "3 Months",
      type: "Competition",
      features: ["Problem Solving", "Team Building", "Prize Money", "Industry Exposure", "Recognition"],
      icon: Lightbulb,
      color: "from-orange-600 to-red-600"
    },
    {
      id: 4,
      title: "Leadership Development",
      description: "Develop essential leadership skills needed to build and manage successful teams. Focus on communication, decision-making, and strategic thinking.",
      duration: "4 Months",
      type: "Development",
      features: ["Leadership Skills", "Team Management", "Strategic Thinking", "Communication", "Personal Branding"],
      icon: Trophy,
      color: "from-green-600 to-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <section className="py-20 px-4 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                Our Programs
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive programs designed to nurture entrepreneurial talent and build the next generation of innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program) => (
              <Card key={program.id} className="bg-slate-800/80 border-slate-700 hover:border-purple-500/50 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-16 h-16 bg-gradient-to-r ${program.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <program.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                        {program.type}
                      </Badge>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {program.duration}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
                    {program.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-gray-300 leading-relaxed">
                    {program.description}
                  </p>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-3">Program Features:</h4>
                    <ul className="space-y-2">
                      {program.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className={`w-full bg-gradient-to-r ${program.color} hover:opacity-90 text-white group`}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="mt-20 text-center">
            <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Start Your Entrepreneurial Journey?
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of students who have transformed their ideas into successful ventures through our programs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white px-8">
                    Schedule a Meeting
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;
