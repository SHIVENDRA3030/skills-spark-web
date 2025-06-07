
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save } from "lucide-react";

interface ContactInfo {
  id: string;
  email: string;
  phone: string;
  address: string;
  office_hours: string;
  social_links: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export const AdminContactSection = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    office_hours: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: ""
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .limit(1)
      .single();

    if (data) {
      const socialLinks = (typeof data.social_links === 'object' && data.social_links !== null) 
        ? data.social_links as ContactInfo['social_links'] 
        : {};
        
      setContactInfo({
        ...data,
        social_links: socialLinks
      } as ContactInfo);
      
      setFormData({
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        office_hours: data.office_hours || "",
        facebook: socialLinks.facebook || "",
        twitter: socialLinks.twitter || "",
        linkedin: socialLinks.linkedin || "",
        instagram: socialLinks.instagram || ""
      });
    }
  };

  const handleSave = async () => {
    const contactData = {
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      office_hours: formData.office_hours,
      social_links: {
        facebook: formData.facebook,
        twitter: formData.twitter,
        linkedin: formData.linkedin,
        instagram: formData.instagram
      }
    };

    if (contactInfo) {
      const { error } = await supabase
        .from('contact_info')
        .update(contactData)
        .eq('id', contactInfo.id);

      if (error) {
        toast.error("Failed to update contact info");
        return;
      }
    } else {
      const { error } = await supabase
        .from('contact_info')
        .insert([contactData]);

      if (error) {
        toast.error("Failed to create contact info");
        return;
      }
    }

    toast.success("Contact information updated successfully");
    fetchContactInfo();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Contact Information</h3>

      <Card className="bg-slate-700 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">Edit Contact Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Email</Label>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-slate-600 border-slate-500 text-white"
                type="email"
              />
            </div>
            <div>
              <Label className="text-white">Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>
          </div>

          <div>
            <Label className="text-white">Address</Label>
            <Textarea
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="bg-slate-600 border-slate-500 text-white"
              rows={3}
            />
          </div>

          <div>
            <Label className="text-white">Office Hours</Label>
            <Textarea
              value={formData.office_hours}
              onChange={(e) => setFormData({...formData, office_hours: e.target.value})}
              className="bg-slate-600 border-slate-500 text-white"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Facebook URL</Label>
              <Input
                value={formData.facebook}
                onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                className="bg-slate-600 border-slate-500 text-white"
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div>
              <Label className="text-white">Twitter URL</Label>
              <Input
                value={formData.twitter}
                onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                className="bg-slate-600 border-slate-500 text-white"
                placeholder="https://twitter.com/yourhandle"
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
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
            <div>
              <Label className="text-white">Instagram URL</Label>
              <Input
                value={formData.instagram}
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                className="bg-slate-600 border-slate-500 text-white"
                placeholder="https://instagram.com/yourhandle"
              />
            </div>
          </div>

          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Save Contact Information
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
