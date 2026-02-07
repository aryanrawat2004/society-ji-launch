import { Building, Users, Shield, Activity, TrendingUp, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Total Societies", value: "24", change: "+3 this month", icon: Building, color: "text-primary" },
  { label: "Active Users", value: "1,248", change: "+12%", icon: Users, color: "text-emerald-600" },
  { label: "Guards On Duty", value: "86", change: "Active now", icon: Shield, color: "text-amber-600" },
  { label: "Credentials Generated", value: "142", change: "+8 this week", icon: Activity, color: "text-blue-600" },
];

const recentActivities = [
  { action: "New society registered", detail: "Sunrise Residency, Jaipur", time: "2 min ago" },
  { action: "Credentials generated", detail: "For Rajesh Kumar", time: "15 min ago" },
  { action: "Guard shift started", detail: "Green Park Society", time: "1 hr ago" },
  { action: "New user signup", detail: "Priya Sharma - Resident", time: "2 hrs ago" },
  { action: "Society updated", detail: "Lake View Apartments", time: "3 hrs ago" },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-emerald-500" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-2.5 rounded-xl bg-muted ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.detail}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
