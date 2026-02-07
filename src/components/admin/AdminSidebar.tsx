import { 
  LayoutDashboard, Users, Building, KeyRound, Bell, Settings, LogOut, ChevronLeft, ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import SocietyJiLogo from "@/components/SocietyJiLogo";

export type AdminTab = "dashboard" | "societies" | "credentials" | "users" | "notifications" | "settings";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  profileName?: string;
  onLogout: () => void;
}

const navItems: { id: AdminTab; label: string; icon: React.ElementType; badge?: number }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "societies", label: "Societies", icon: Building },
  { id: "credentials", label: "Credentials", icon: KeyRound },
  { id: "users", label: "Users", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell, badge: 3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const AdminSidebar = ({ activeTab, onTabChange, collapsed, onToggleCollapse, profileName, onLogout }: AdminSidebarProps) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r bg-card transition-all duration-300",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {!collapsed && <SocietyJiLogo variant="dark" />}
        <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="shrink-0 h-8 w-8">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge variant={isActive ? "secondary" : "default"} className="h-5 min-w-[20px] text-xs px-1.5">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Profile / Logout */}
      <div className="border-t p-3">
        {!collapsed && profileName && (
          <p className="text-xs text-muted-foreground mb-2 px-2 truncate">
            👤 {profileName}
          </p>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
