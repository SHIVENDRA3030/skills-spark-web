
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });

    if (data) {
      setEvents(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <section className="py-20 px-4 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                All Events
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover all our upcoming and past events designed to enhance your entrepreneurial journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card key={event.id} className="bg-slate-800/80 border-slate-700 hover:border-purple-500/50 transition-all duration-300 overflow-hidden group">
                {event.image_url && (
                  <div className="relative overflow-hidden">
                    <img 
                      src={event.image_url} 
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge 
                        variant={event.status === "upcoming" ? "default" : "secondary"}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    {event.time && (
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center text-gray-400 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                    )}
                  </div>
                  
                  {event.registration_link && (
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Register Now
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
