import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuthSession, getAuthProfile, getAuthToken } from "@/lib/auth";
import AdminSidebar, { type AdminTab } from "@/components/admin/AdminSidebar";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminSocietyList from "@/components/admin/AdminSocietyList";
import AdminCredentials from "@/components/admin/AdminCredentials";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminNotifications from "@/components/admin/AdminNotifications";
import AdminSettings from "@/components/admin/AdminSettings";
import { cn } from "@/lib/utils";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const token = getAuthToken();
  const profile = getAuthProfile();

  if (!token || !profile) {
    clearAuthSession();
    navigate("/login", { replace: true });
    return null;
  }

  if (profile.role !== "admin") {
    clearAuthSession();
    navigate("/login", { replace: true });
    return null;
  }

  const handleLogout = () => {
    clearAuthSession();
    navigate("/login", { replace: true });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <AdminDashboard />;
      case "societies": return <AdminSocietyList />;
      case "credentials": return <AdminCredentials />;
      case "users": return <AdminUsers />;
      case "notifications": return <AdminNotifications />;
      case "settings": return <AdminSettings />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        profileName={profile.name}
        onLogout={handleLogout}
      />
      <main
        className={cn(
          "transition-all duration-300 min-h-screen p-6 lg:p-8",
          sidebarCollapsed ? "ml-[68px]" : "ml-[240px]"
        )}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPanel;
