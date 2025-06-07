
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save } from "lucide-react";

interface NavbarContent {
  id: string;
  logo_text: string;
  logo_url: string;
  navigation_items: any[];
  cta_text: string;
  cta_link: string;
}

export const AdminNavbarSection = () => {
  const [navbarContent, setNavbarContent] = useState<NavbarContent | null>(null);
  const [formData, setFormData] = useState({
    logo_text: "",
    logo_url: "",
    navigation_items: "",
    cta_text: "",
    cta_link: ""
  });

  useEffect(() => {
    fetchNavbarContent();
  }, []);

  const fetchNavbarContent = async () => {
    const { data, error } = await supabase
      .from('navbar_content')
      .select('*')
      .limit(1)
      .single();

    if (data) {
      setNavbarContent(data);
      setFormData({
        logo_text: data.logo_text || "",
        logo_url: data.logo_url || "",
        navigation_items: data.navigation_items?.map((item: any) => `${item.label}:${item.href}`).join('\n') || "",
        cta_text: data.cta_text || "",
        cta_link: data.cta_link || ""
      });
    }
  };

  const handleSave = async () => {
    const navigationArray = formData.navigation_items
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const [label, href] = line.split(':');
        return { label: label?.trim(), href: href?.trim() };
      })
      .filter(item => item.label && item.href);

    const navbarData = {
      logo_text: formData.logo_text,
      logo_url: formData.logo_url,
      navigation_items: navigationArray,
      cta_text: formData.cta_text,
      cta_link: formData.cta_link
    };

    if (navbarContent) {
      const { error } = await supabase
        .from('navbar_content')
        .update(navbarData)
        .eq('id', navbarContent.id);

      if (error) {
        toast.error("Failed to update navbar content");
        return;
      }
    } else {
      const { error } = await supabase
        .from('navbar_content')
        .insert([navbarData]);

      if (error) {
        toast.error("Failed to create navbar content");
        return;
      }
    }

    toast.success("Navbar content updated successfully");
    fetchNavbarContent();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Navigation Bar</h3>

      <Card className="bg-slate-700 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">Edit Navigation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Logo Text</Label>
              <Input
                value={formData.logo_text}
                onChange={(e) => setFormData({...formData, logo_text: e.target.value})}
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Logo Image URL (optional)</Label>
              <Input
                value={formData.logo_url}
                onChange={(e) => setFormData({...formData, logo_url: e.target.value})}
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>
          </div>

          <div>
            <Label className="text-white">Navigation Items (format: Label:URL, one per line)</Label>
            <Textarea
              value={formData.navigation_items}
              onChange={(e) => setFormData({...formData, navigation_items: e.target.value})}
              className="bg-slate-600 border-slate-500 text-white"
              rows={6}
              placeholder="Home:/&#10;About:#about&#10;Events:/events&#10;Programs:/programs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">CTA Button Text</Label>
              <Input
                value={formData.cta_text}
                onChange={(e) => setFormData({...formData, cta_text: e.target.value})}
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>
            <div>
              <Label className="text-white">CTA Button Link</Label>
              <Input
                value={formData.cta_link}
                onChange={(e) => setFormData({...formData, cta_link: e.target.value})}
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>
          </div>

          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Save Navigation Content
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
