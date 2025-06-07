
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save } from "lucide-react";

interface FooterContent {
  id: string;
  company_name: string;
  description: string;
  copyright_text: string;
  quick_links: any[];
  social_links: any;
}

export const AdminFooterSection = () => {
  const [footerContent, setFooterContent] = useState<FooterContent | null>(null);
  const [formData, setFormData] = useState({
    company_name: "",
    description: "",
    copyright_text: "",
    quick_links: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: ""
  });

  useEffect(() => {
    fetchFooterContent();
  }, []);

  const fetchFooterContent = async () => {
    const { data, error } = await supabase
      .from('footer_content')
      .select('*')
      .limit(1)
      .single();

    if (data) {
      setFooterContent(data);
      setFormData({
        company_name: data.company_name || "",
        description: data.description || "",
        copyright_text: data.copyright_text || "",
        quick_links: data.quick_links?.map((link: any) => `${link.label}:${link.href}`).join('\n') || "",
        facebook: data.social_links?.facebook || "",
        twitter: data.social_links?.twitter || "",
        linkedin: data.social_links?.linkedin || "",
        instagram: data.social_links?.instagram || ""
      });
    }
  };

  const handleSave = async () => {
    const quickLinksArray = formData.quick_links
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const [label, href] = line.split(':');
        return { label: label?.trim(), href: href?.trim() };
      })
      .filter(link => link.label && link.href);

    const footerData = {
      company_name: formData.company_name,
      description: formData.description,
      copyright_text: formData.copyright_text,
      quick_links: quickLinksArray,
      social_links: {
        facebook: formData.facebook,
        twitter: formData.twitter,
        linkedin: formData.linkedin,
        instagram: formData.instagram
      }
    };

    if (footerContent) {
      const { error } = await supabase
        .from('footer_content')
        .update(footerData)
        .eq('id', footerContent.id);

      if (error) {
        toast.error("Failed to update footer content");
        return;
      }
    } else {
      const { error } = await supabase
        .from('footer_content')
        .insert([footerData]);

      if (error) {
        toast.error("Failed to create footer content");
        return;
      }
    }

    toast.success("Footer content updated successfully");
    fetchFooterContent();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Footer Content</h3>

      <Card className="bg-slate-700 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">Edit Footer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Company Name</Label>
              <Input
                value={formData.company_name}
                onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Copyright Text</Label>
              <Input
                value={formData.copyright_text}
                onChange={(e) => setFormData({...formData, copyright_text: e.target.value})}
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>
          </div>

          <div>
            <Label className="text-white">Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="bg-slate-600 border-slate-500 text-white"
              rows={3}
            />
          </div>

          <div>
            <Label className="text-white">Quick Links (format: Label:URL, one per line)</Label>
            <Textarea
              value={formData.quick_links}
              onChange={(e) => setFormData({...formData, quick_links: e.target.value})}
              className="bg-slate-600 border-slate-500 text-white"
              rows={4}
              placeholder="Home:/&#10;About:#about&#10;Contact:#contact"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Facebook URL</Label>
              <Input
                value={formData.facebook}
                onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Twitter URL</Label>
              <Input
                value={formData.twitter}
                onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">LinkedIn URL</Label>
              <Input
                value={formData.linkedin}
                onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Instagram URL</Label>
              <Input
                value={formData.instagram}
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>
          </div>

          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Save Footer Content
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
