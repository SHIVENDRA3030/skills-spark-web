
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  image_url: string;
  features: string[];
  is_featured: boolean;
  order_index: number;
}

export const AdminProgramsSection = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    level: "",
    image_url: "",
    features: "",
    is_featured: false,
    order_index: 0
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('order_index');

    if (error) {
      toast.error("Failed to fetch programs");
      return;
    }

    if (data) {
      const typedPrograms = data.map(program => ({
        ...program,
        features: Array.isArray(program.features) ? program.features as string[] : []
      })) as Program[];
      
      setPrograms(typedPrograms);
    }
  };

  const handleSave = async () => {
    const programData = {
      ...formData,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f)
    };

    if (editingId) {
      const { error } = await supabase
        .from('programs')
        .update(programData)
        .eq('id', editingId);

      if (error) {
        toast.error("Failed to update program");
        return;
      }
      toast.success("Program updated successfully");
    } else {
      const { error } = await supabase
        .from('programs')
        .insert([programData]);

      if (error) {
        toast.error("Failed to create program");
        return;
      }
      toast.success("Program created successfully");
    }

    setEditingId(null);
    setIsAdding(false);
    setFormData({
      title: "",
      description: "",
      duration: "",
      level: "",
      image_url: "",
      features: "",
      is_featured: false,
      order_index: 0
    });
    fetchPrograms();
  };

  const handleEdit = (program: Program) => {
    setFormData({
      title: program.title,
      description: program.description || "",
      duration: program.duration || "",
      level: program.level || "",
      image_url: program.image_url || "",
      features: program.features?.join(", ") || "",
      is_featured: program.is_featured,
      order_index: program.order_index
    });
    setEditingId(program.id);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('programs')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Failed to delete program");
      return;
    }

    toast.success("Program deleted successfully");
    fetchPrograms();
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({
      title: "",
      description: "",
      duration: "",
      level: "",
      image_url: "",
      features: "",
      is_featured: false,
      order_index: 0
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Programs Management</h3>
        <Button
          onClick={() => setIsAdding(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Program
        </Button>
      </div>

      {(isAdding || editingId) && (
        <Card className="bg-slate-700 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white">
              {editingId ? "Edit Program" : "Add New Program"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-slate-600 border-slate-500 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Duration</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="bg-slate-600 border-slate-500 text-white"
                  placeholder="e.g. 8 weeks"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Level</Label>
                <Input
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                  className="bg-slate-600 border-slate-500 text-white"
                  placeholder="e.g. Beginner"
                />
              </div>
              <div>
                <Label className="text-white">Order Index</Label>
                <Input
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value)})}
                  className="bg-slate-600 border-slate-500 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-white">Image URL</Label>
              <Input
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                className="bg-slate-600 border-slate-500 text-white"
              />
            </div>

            <div>
              <Label className="text-white">Features (comma-separated)</Label>
              <Input
                value={formData.features}
                onChange={(e) => setFormData({...formData, features: e.target.value})}
                className="bg-slate-600 border-slate-500 text-white"
                placeholder="e.g. Business Planning, Market Research"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.is_featured}
                onCheckedChange={(checked) => setFormData({...formData, is_featured: checked})}
              />
              <Label className="text-white">Featured Program</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" className="border-slate-500 text-white">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {programs.map((program) => (
          <Card key={program.id} className="bg-slate-700 border-slate-600">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-white font-medium">{program.title}</h4>
                    {program.is_featured && (
                      <Badge className="bg-yellow-600">Featured</Badge>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{program.description}</p>
                  <div className="flex gap-2 text-xs text-gray-400">
                    <span>Duration: {program.duration}</span>
                    <span>•</span>
                    <span>Level: {program.level}</span>
                  </div>
                  {program.features && program.features.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-gray-400">Features: </span>
                      {program.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="mr-1 text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleEdit(program)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDelete(program.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
