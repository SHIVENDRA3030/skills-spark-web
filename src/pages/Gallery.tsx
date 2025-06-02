
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
      
      <section className="py-20 px-4 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore moments from our events, workshops, and community activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <Card key={item.id} className="bg-slate-800/80 border-slate-700 overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image_url} 
                    alt={item.title || "Gallery image"}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {item.title && (
                  <CardContent className="p-4">
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    {item.description && (
                      <p className="text-gray-300 text-sm mt-1">{item.description}</p>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {galleryItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No gallery items available yet.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
