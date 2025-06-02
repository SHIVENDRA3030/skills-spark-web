
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const AdminHeroSection = () => {
  const [heroData, setHeroData] = useState({
    title: "",
    subtitle: "",
    description: "",
    cta_primary_text: "",
    cta_secondary_text: "",
    background_image_url: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    const { data, error } = await supabase
      .from('hero_content')
      .select('*')
      .limit(1)
      .single();

    if (data) {
      setHeroData(data);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('hero_content')
        .upsert([heroData], { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hero section updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update hero section",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-slate-700/50 border-slate-600">
      <CardHeader>
        <CardTitle className="text-white">Edit Hero Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Title</label>
          <Input
            value={heroData.title}
            onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
            className="bg-slate-600 border-slate-500 text-white"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Subtitle</label>
          <Input
            value={heroData.subtitle}
            onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
            className="bg-slate-600 border-slate-500 text-white"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
          <Textarea
            value={heroData.description || ""}
            onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
            className="bg-slate-600 border-slate-500 text-white"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Primary CTA Text</label>
          <Input
            value={heroData.cta_primary_text || ""}
            onChange={(e) => setHeroData({ ...heroData, cta_primary_text: e.target.value })}
            className="bg-slate-600 border-slate-500 text-white"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Secondary CTA Text</label>
          <Input
            value={heroData.cta_secondary_text || ""}
            onChange={(e) => setHeroData({ ...heroData, cta_secondary_text: e.target.value })}
            className="bg-slate-600 border-slate-500 text-white"
          />
        </div>
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
};
