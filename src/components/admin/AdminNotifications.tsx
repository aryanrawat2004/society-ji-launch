import { useState } from "react";
import { Bell, Check, Trash2, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
  read: boolean;
  time: string;
}

const initialNotifications: Notification[] = [
  { id: 1, title: "New Society Registration", message: "Royal Heritage Towers has submitted a registration request. Review and approve.", type: "info", read: false, time: "5 min ago" },
  { id: 2, title: "Guard Shift Alert", message: "Guard Ram Singh missed check-in at Green Park Society.", type: "warning", read: false, time: "1 hr ago" },
  { id: 3, title: "Credentials Generated", message: "Login credentials for Sunrise Residency secretary were generated successfully.", type: "success", read: false, time: "2 hrs ago" },
  { id: 4, title: "Maintenance Request", message: "3 new maintenance requests pending approval at Lake View Apartments.", type: "info", read: true, time: "4 hrs ago" },
  { id: 5, title: "Payment Overdue", message: "5 residents in Palm Springs Villas have overdue maintenance payments.", type: "warning", read: true, time: "1 day ago" },
];

const typeStyles: Record<string, { icon: React.ElementType; bg: string; text: string }> = {
  info: { icon: Info, bg: "bg-blue-50", text: "text-blue-600" },
  warning: { icon: AlertTriangle, bg: "bg-amber-50", text: "text-amber-600" },
  success: { icon: CheckCircle2, bg: "bg-emerald-50", text: "text-emerald-600" },
};

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Notifications
            {unreadCount > 0 && <Badge className="bg-primary">{unreadCount} new</Badge>}
          </h2>
          <p className="text-muted-foreground">Stay updated with important alerts</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <Check className="h-4 w-4 mr-1" /> Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Bell className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40" />
              <p className="text-muted-foreground">No notifications</p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notif) => {
            const style = typeStyles[notif.type];
            const Icon = style.icon;
            return (
              <Card key={notif.id} className={`transition-all ${!notif.read ? "border-primary/30 shadow-sm" : "opacity-75"}`}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className={`p-2 rounded-lg shrink-0 ${style.bg}`}>
                    <Icon className={`h-5 w-5 ${style.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`font-medium text-sm ${!notif.read ? "" : "text-muted-foreground"}`}>{notif.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{notif.time}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {!notif.read && (
                        <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => markAsRead(notif.id)}>
                          <Check className="h-3 w-3 mr-1" /> Read
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive" onClick={() => deleteNotification(notif.id)}>
                        <Trash2 className="h-3 w-3 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;
