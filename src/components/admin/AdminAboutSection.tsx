
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const AdminAboutSection = () => {
  const [aboutData, setAboutData] = useState({
    title: "",
    description: "",
    mission: "",
    vision: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    const { data, error } = await supabase
      .from('about_content')
      .select('*')
      .limit(1)
      .single();

    if (data) {
      setAboutData(data);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('about_content')
        .upsert([aboutData], { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "About section updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update about section",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-slate-700/50 border-slate-600">
      <CardHeader>
        <CardTitle className="text-white">Edit About Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Title</label>
          <Input
            value={aboutData.title}
            onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
            className="bg-slate-600 border-slate-500 text-white"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
          <Textarea
            value={aboutData.description}
            onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
            className="bg-slate-600 border-slate-500 text-white"
            rows={4}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Mission</label>
          <Textarea
            value={aboutData.mission || ""}
            onChange={(e) => setAboutData({ ...aboutData, mission: e.target.value })}
            className="bg-slate-600 border-slate-500 text-white"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Vision</label>
          <Textarea
            value={aboutData.vision || ""}
            onChange={(e) => setAboutData({ ...aboutData, vision: e.target.value })}
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
