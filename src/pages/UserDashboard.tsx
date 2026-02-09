import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  Bell, 
  FileText, 
  Calendar, 
  Settings,
  Download,
  LogOut,
  Home,
  Shield
} from "lucide-react";
import { clearAuthSession, getAuthProfile, getAuthToken } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const UserDashboard = () => {
  const navigate = useNavigate();
  const token = getAuthToken();
  const profile = getAuthProfile();

  useEffect(() => {
    if (!token || !profile) {
      navigate("/login", { replace: true });
    }
  }, [token, profile, navigate]);

  const handleLogout = () => {
    clearAuthSession();
    navigate("/", { replace: true });
  };

  if (!profile) {
    return null;
  }

  const isAdmin = profile.role === "admin";

  const dashboardCards = [
    {
      title: "My Society",
      description: "View your society details and information",
      icon: Building2,
      color: "bg-blue-500",
      action: () => navigate("/my-society"),
      badge: "Coming Soon"
    },
    {
      title: "Notices",
      description: "View important announcements and updates",
      icon: Bell,
      color: "bg-orange-500",
      action: () => navigate("/notices"),
      badge: "Coming Soon"
    },
    {
      title: "Complaints",
      description: "Submit and track your complaints",
      icon: FileText,
      color: "bg-green-500",
      action: () => navigate("/complaints"),
      badge: "Coming Soon"
    },
    {
      title: "Events",
      description: "Check upcoming society events",
      icon: Calendar,
      color: "bg-purple-500",
      action: () => navigate("/events"),
      badge: "Coming Soon"
    },
    {
      title: "Residents",
      description: "View society members directory",
      icon: Users,
      color: "bg-pink-500",
      action: () => navigate("/residents"),
      badge: "Coming Soon"
    },
    {
      title: "My Profile",
      description: "Manage your account settings",
      icon: Settings,
      color: "bg-gray-500",
      action: () => navigate("/profile"),
      badge: "Coming Soon"
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-muted/30">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  Welcome back, {profile.name || "User"}!
                </h1>
                <p className="text-muted-foreground text-lg">
                  Manage your society living from one place
                </p>
              </div>
              <div className="flex gap-3">
                {isAdmin && (
                  <Button 
                    onClick={() => navigate("/admin")}
                    variant="default"
                    className="gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Admin Panel
                  </Button>
                )}
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>

            {/* User Info Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Your Account
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="font-medium">{profile.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Role</p>
                    <Badge variant={isAdmin ? "default" : "secondary"}>
                      {profile.role?.toUpperCase() || "RESIDENT"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Cards Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardCards.map((card, index) => (
                <Card 
                  key={index}
                  className="hover:shadow-lg transition-all cursor-pointer group"
                  onClick={card.action}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg ${card.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                        <card.icon className={`w-6 h-6 text-white`} style={{ filter: 'brightness(0) saturate(100%)' }} />
                      </div>
                      {card.badge && (
                        <Badge variant="outline" className="text-xs">
                          {card.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="mt-4">{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Mobile App Promotion */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Get the Mobile App</h3>
                  <p className="text-blue-50 mb-4">
                    Access all features on the go with our mobile app for Android and iOS
                  </p>
                  <Button 
                    onClick={() => navigate("/#download")}
                    variant="secondary"
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Now
                  </Button>
                </div>
                <div className="text-6xl">📱</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default UserDashboard;
