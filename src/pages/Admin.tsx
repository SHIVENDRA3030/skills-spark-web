
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminHeroSection } from "@/components/admin/AdminHeroSection";
import { AdminAboutSection } from "@/components/admin/AdminAboutSection";
import { AdminEventsSection } from "@/components/admin/AdminEventsSection";
import { AdminTeamSection } from "@/components/admin/AdminTeamSection";
import { LogOut, Home } from "lucide-react";

const Admin = () => {
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white"
            >
              <Home className="w-4 h-4 mr-2" />
              View Website
            </Button>
            <Button
              onClick={signOut}
              variant="outline"
              className="border-red-400 text-red-300 hover:bg-red-400 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <Card className="bg-slate-800/80 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Content Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="hero" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4 bg-slate-700">
                <TabsTrigger value="hero" className="text-white">Hero Section</TabsTrigger>
                <TabsTrigger value="about" className="text-white">About Section</TabsTrigger>
                <TabsTrigger value="events" className="text-white">Events</TabsTrigger>
                <TabsTrigger value="team" className="text-white">Team</TabsTrigger>
              </TabsList>
              
              <TabsContent value="hero">
                <AdminHeroSection />
              </TabsContent>
              
              <TabsContent value="about">
                <AdminAboutSection />
              </TabsContent>
              
              <TabsContent value="events">
                <AdminEventsSection />
              </TabsContent>
              
              <TabsContent value="team">
                <AdminTeamSection />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
