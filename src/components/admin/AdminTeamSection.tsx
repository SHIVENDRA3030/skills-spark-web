
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";

export const AdminTeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const emptyMember = {
    name: "",
    role: "",
    department: "",
    bio: "",
    image_url: "",
    linkedin_url: "",
    twitter_url: "",
    email: "",
    order_index: 0,
    is_active: true
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('order_index', { ascending: true });

    if (data) {
      setTeamMembers(data);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = editingMember.id
        ? await supabase
            .from('team_members')
            .update(editingMember)
            .eq('id', editingMember.id)
        : await supabase
            .from('team_members')
            .insert([editingMember]);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Team member ${editingMember.id ? 'updated' : 'added'} successfully!`,
      });

      fetchTeamMembers();
      setIsDialogOpen(false);
      setEditingMember(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save team member",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Team member removed successfully!",
      });

      fetchTeamMembers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove team member",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-semibold">Manage Team</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingMember(emptyMember)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingMember?.id ? 'Edit Team Member' : 'Add New Team Member'}
              </DialogTitle>
            </DialogHeader>
            {editingMember && (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Name</label>
                    <Input
                      value={editingMember.name}
                      onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Role</label>
                    <Input
                      value={editingMember.role}
                      onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Department</label>
                  <Input
                    value={editingMember.department}
                    onChange={(e) => setEditingMember({ ...editingMember, department: e.target.value })}
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Bio</label>
                  <Textarea
                    value={editingMember.bio}
                    onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Image URL</label>
                  <Input
                    value={editingMember.image_url}
                    onChange={(e) => setEditingMember({ ...editingMember, image_url: e.target.value })}
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={editingMember.email}
                    onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {loading ? "Saving..." : "Save Member"}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {teamMembers.map((member) => (
          <Card key={member.id} className="bg-slate-700/50 border-slate-600">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  {member.image_url && (
                    <img 
                      src={member.image_url} 
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h4 className="text-white font-semibold">{member.name}</h4>
                    <p className="text-purple-300 text-sm">{member.role}</p>
                    <p className="text-gray-400 text-xs">{member.department}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingMember(member);
                      setIsDialogOpen(true);
                    }}
                    className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(member.id)}
                    className="border-red-400 text-red-300 hover:bg-red-400 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
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
