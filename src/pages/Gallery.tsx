
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Eye, Heart, Share2 } from "lucide-react";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('order_index', { ascending: true });

    if (data) {
      setGalleryItems(data);
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
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 animate-zoom-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="text-gradient">
                Gallery
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore moments from our events, workshops, and community activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <Card 
                key={item.id} 
                className={`glass-effect border-slate-700 overflow-hidden interactive-card group animate-fade-in animation-delay-${300 + index * 100}`}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image_url} 
                    alt={item.title || "Gallery image"}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-3">
                          <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors duration-300">
                            <Eye className="w-4 h-4 text-white" />
                          </button>
                          <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors duration-300">
                            <Heart className="w-4 h-4 text-white" />
                          </button>
                          <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors duration-300">
                            <Share2 className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative corner elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                </div>
                
                {item.title && (
                  <CardContent className="p-6">
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-gradient transition-all duration-300">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {galleryItems.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-slow">
                <Eye className="w-12 h-12 text-white" />
              </div>
              <p className="text-gray-400 text-xl">No gallery items available yet.</p>
              <p className="text-gray-500 mt-2">Check back soon for amazing content!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
