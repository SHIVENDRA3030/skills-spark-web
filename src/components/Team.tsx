
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Twitter, Mail } from "lucide-react";

export const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Faculty Advisor",
      department: "Computer Science",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      bio: "Leading expert in entrepreneurship education with 15+ years of experience.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah.johnson@university.edu"
      }
    },
    {
      id: 2,
      name: "Alex Chen",
      role: "President",
      department: "Business Administration",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      bio: "Passionate about building startup ecosystems and mentoring young entrepreneurs.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "alex.chen@student.edu"
      }
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Vice President",
      department: "Engineering",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      bio: "Tech enthusiast focused on innovation and sustainable business solutions.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "priya.sharma@student.edu"
      }
    },
    {
      id: 4,
      name: "Michael Rodriguez",
      role: "Events Coordinator",
      department: "Marketing",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      bio: "Creative event planner with expertise in organizing large-scale programs.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "michael.rodriguez@student.edu"
      }
    }
  ];

  return (
    <section id="team" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Our Team
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the dedicated individuals who drive CSED's mission forward and support student entrepreneurship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 transition-all duration-300 group overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <CardContent className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 mb-2">
                    {member.role}
                  </Badge>
                  <p className="text-sm text-gray-400">{member.department}</p>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>
                
                <div className="flex space-x-3">
                  <a href={member.social.linkedin} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={member.social.twitter} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
