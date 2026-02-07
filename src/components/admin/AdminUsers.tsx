import { useState } from "react";
import { Search, Users, Shield, UserCheck, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "resident" | "guard";
  society: string;
  status: "active" | "inactive";
  joinedAt: string;
}

const mockUsers: UserItem[] = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh@sunrise.com", phone: "+91 98765 43210", role: "admin", society: "Sunrise Residency", status: "active", joinedAt: "2024-12-10" },
  { id: 2, name: "Priya Sharma", email: "priya@greenpark.com", phone: "+91 87654 32109", role: "resident", society: "Green Park Society", status: "active", joinedAt: "2025-01-05" },
  { id: 3, name: "Ram Singh", email: "ram@guard.com", phone: "+91 76543 21098", role: "guard", society: "Lake View Apartments", status: "active", joinedAt: "2025-01-15" },
  { id: 4, name: "Amit Verma", email: "amit@royal.com", phone: "+91 65432 10987", role: "resident", society: "Royal Heritage Towers", status: "inactive", joinedAt: "2024-11-20" },
  { id: 5, name: "Sunita Devi", email: "sunita@palm.com", phone: "+91 54321 09876", role: "admin", society: "Palm Springs Villas", status: "active", joinedAt: "2025-02-01" },
  { id: 6, name: "Mohan Lal", email: "mohan@sapphire.com", phone: "+91 43210 98765", role: "guard", society: "Sapphire Heights", status: "active", joinedAt: "2025-01-28" },
];

const ITEMS_PER_PAGE = 5;

const roleIcons: Record<string, React.ElementType> = { admin: Shield, resident: UserCheck, guard: Users };
const roleColors: Record<string, string> = {
  admin: "bg-primary/10 text-primary",
  resident: "bg-blue-100 text-blue-700",
  guard: "bg-amber-100 text-amber-700",
};

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = mockUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.society.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Users</h2>
        <p className="text-muted-foreground">Manage all users across societies</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="pl-10" />
        </div>
        <div className="flex gap-2">
          {["all", "admin", "resident", "guard"].map((role) => (
            <Button
              key={role}
              variant={roleFilter === role ? "default" : "outline"}
              size="sm"
              onClick={() => { setRoleFilter(role); setCurrentPage(1); }}
              className="capitalize"
            >
              {role}
            </Button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">User</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Society</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Role</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Joined</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((user) => {
                  const RoleIcon = roleIcons[user.role];
                  return (
                    <tr key={user.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell text-muted-foreground">{user.society}</td>
                      <td className="p-4">
                        <Badge className={roleColors[user.role]} variant="secondary">
                          <RoleIcon className="h-3 w-3 mr-1" /> {user.role}
                        </Badge>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <span className={`inline-flex items-center gap-1.5 text-xs ${user.status === "active" ? "text-emerald-600" : "text-muted-foreground"}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${user.status === "active" ? "bg-emerald-500" : "bg-muted-foreground/50"}`} />
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 hidden lg:table-cell text-muted-foreground text-xs">{new Date(user.joinedAt).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <span className="text-sm text-muted-foreground px-3">Page {currentPage} of {totalPages}</span>
          <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
