
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";

export const AdminEventsSection = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const emptyEvent = {
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    image_url: "",
    registration_link: "",
    status: "upcoming",
    featured: false
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });

    if (data) {
      setEvents(data);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = editingEvent.id
        ? await supabase
            .from('events')
            .update(editingEvent)
            .eq('id', editingEvent.id)
        : await supabase
            .from('events')
            .insert([editingEvent]);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Event ${editingEvent.id ? 'updated' : 'created'} successfully!`,
      });

      fetchEvents();
      setIsDialogOpen(false);
      setEditingEvent(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save event",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Event deleted successfully!",
      });

      fetchEvents();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-semibold">Manage Events</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingEvent(emptyEvent)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingEvent?.id ? 'Edit Event' : 'Add New Event'}
              </DialogTitle>
            </DialogHeader>
            {editingEvent && (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Title</label>
                  <Input
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
                  <Textarea
                    value={editingEvent.description}
                    onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Date</label>
                    <Input
                      type="date"
                      value={editingEvent.date}
                      onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Time</label>
                    <Input
                      value={editingEvent.time}
                      onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Location</label>
                  <Input
                    value={editingEvent.location}
                    onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Image URL</label>
                  <Input
                    value={editingEvent.image_url}
                    onChange={(e) => setEditingEvent({ ...editingEvent, image_url: e.target.value })}
                    className="bg-slate-600 border-slate-500 text-white"
                  />
                </div>
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {loading ? "Saving..." : "Save Event"}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id} className="bg-slate-700/50 border-slate-600">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white font-semibold">{event.title}</h4>
                  <p className="text-gray-300 text-sm">{event.description}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    {event.date} • {event.location}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingEvent(event);
                      setIsDialogOpen(true);
                    }}
                    className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(event.id)}
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
