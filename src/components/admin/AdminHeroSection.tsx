
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
    background_image_url: "",
    stats_students_count: "",
    stats_students_label: "",
    stats_programs_count: "",
    stats_programs_label: "",
    stats_startups_count: "",
    stats_startups_label: "",
    stats_success_count: "",
    stats_success_label: ""
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

        {/* Statistics Section */}
        <div className="border-t border-slate-600 pt-4 mt-6">
          <h4 className="text-lg font-medium text-white mb-4">Statistics Section</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Students Count</label>
              <Input
                value={heroData.stats_students_count || ""}
                onChange={(e) => setHeroData({ ...heroData, stats_students_count: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
                placeholder="500+"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Students Label</label>
              <Input
                value={heroData.stats_students_label || ""}
                onChange={(e) => setHeroData({ ...heroData, stats_students_label: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
                placeholder="Students Enrolled"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Programs Count</label>
              <Input
                value={heroData.stats_programs_count || ""}
                onChange={(e) => setHeroData({ ...heroData, stats_programs_count: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
                placeholder="50+"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Programs Label</label>
              <Input
                value={heroData.stats_programs_label || ""}
                onChange={(e) => setHeroData({ ...heroData, stats_programs_label: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
                placeholder="Programs Completed"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Startups Count</label>
              <Input
                value={heroData.stats_startups_count || ""}
                onChange={(e) => setHeroData({ ...heroData, stats_startups_count: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
                placeholder="25+"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Startups Label</label>
              <Input
                value={heroData.stats_startups_label || ""}
                onChange={(e) => setHeroData({ ...heroData, stats_startups_label: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
                placeholder="Successful Startups"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Success Rate Count</label>
              <Input
                value={heroData.stats_success_count || ""}
                onChange={(e) => setHeroData({ ...heroData, stats_success_count: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
                placeholder="100%"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Success Rate Label</label>
              <Input
                value={heroData.stats_success_label || ""}
                onChange={(e) => setHeroData({ ...heroData, stats_success_label: e.target.value })}
                className="bg-slate-600 border-slate-500 text-white"
                placeholder="Success Rate"
              />
            </div>
          </div>
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
