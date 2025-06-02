
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Twitter, Mail, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (data) {
      setTeamMembers(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <section className="py-20 px-4 pt-32 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-40 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-float animation-delay-1000"></div>
          <div className="absolute top-20 right-1/3 w-48 h-48 bg-blue-600/15 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-20 animate-zoom-in">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center animate-glow">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="text-gradient">
                Meet Our Team
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              The passionate individuals driving innovation and fostering entrepreneurship in our community.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card 
                key={member.id} 
                className={`glass-effect border-slate-700 overflow-hidden interactive-card group animate-fade-in animation-delay-${200 + index * 100}`}
              >
                <div className="relative overflow-hidden">
                  {member.image_url ? (
                    <img 
                      src={member.image_url} 
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                      <Users className="w-16 h-16 text-purple-400" />
                    </div>
                  )}
                  
                  {/* Floating overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-center space-x-3">
                        {member.linkedin_url && (
                          <a 
                            href={member.linkedin_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 rounded-full backdrop-blur-sm hover:bg-blue-500/80 transition-all duration-300 hover:scale-110"
                          >
                            <Linkedin className="w-5 h-5 text-white" />
                          </a>
                        )}
                        {member.twitter_url && (
                          <a 
                            href={member.twitter_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 rounded-full backdrop-blur-sm hover:bg-blue-400/80 transition-all duration-300 hover:scale-110"
                          >
                            <Twitter className="w-5 h-5 text-white" />
                          </a>
                        )}
                        {member.email && (
                          <a 
                            href={`mailto:${member.email}`}
                            className="p-3 bg-white/20 rounded-full backdrop-blur-sm hover:bg-purple-500/80 transition-all duration-300 hover:scale-110"
                          >
                            <Mail className="w-5 h-5 text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  <div className="absolute top-4 left-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                </div>
                
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                      {member.name}
                    </h3>
                    <Badge 
                      variant="secondary" 
                      className="bg-purple-600/20 text-purple-300 mb-2 hover:bg-purple-500/30 transition-colors duration-300"
                    >
                      {member.role}
                    </Badge>
                    {member.department && (
                      <p className="text-sm text-gray-400 mb-3">{member.department}</p>
                    )}
                    
                    {member.bio && (
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty state */}
          {teamMembers.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-slow">
                <Users className="w-12 h-12 text-white" />
              </div>
              <p className="text-gray-400 text-xl">No team members available yet.</p>
              <p className="text-gray-500 mt-2">Check back soon to meet our amazing team!</p>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-20 animate-fade-in animation-delay-1000">
            <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Want to Join Our Team?
              </h3>
              <p className="text-gray-300 mb-6">
                We're always looking for passionate individuals to join our mission of fostering innovation and entrepreneurship.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
