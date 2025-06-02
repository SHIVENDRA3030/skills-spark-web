
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export const Events = () => {
  const events = [
    {
      id: 1,
      title: "Startup Pitch Competition",
      description: "Present your innovative ideas to industry experts and win exciting prizes.",
      date: "March 15, 2024",
      time: "2:00 PM - 6:00 PM",
      location: "Main Auditorium",
      attendees: "150+",
      status: "Upcoming",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
    },
    {
      id: 2,
      title: "Entrepreneurship Workshop",
      description: "Learn from successful entrepreneurs about building and scaling businesses.",
      date: "March 20, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Conference Hall",
      attendees: "80+",
      status: "Registration Open",
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23"
    },
    {
      id: 3,
      title: "Innovation Hackathon",
      description: "48-hour coding marathon to solve real-world problems with technology.",
      date: "April 5-7, 2024",
      time: "All Day",
      location: "Tech Lab",
      attendees: "200+",
      status: "Coming Soon",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    }
  ];

  return (
    <section id="events" className="py-20 px-4 bg-slate-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Upcoming Events
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join our exciting events designed to enhance your entrepreneurial journey and connect with like-minded innovators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="bg-slate-800/80 border-slate-700 hover:border-purple-500/50 transition-all duration-300 overflow-hidden group">
              <div className="relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant={event.status === "Upcoming" ? "default" : "secondary"}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {event.status}
                  </Badge>
                </div>
              </div>
              
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
                    {event.date}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    {event.attendees} Expected
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
