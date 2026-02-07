import { useState } from "react";
import { Search, Building, MapPin, Users, ChevronLeft, ChevronRight, Eye, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface Society {
  id: number;
  name: string;
  location: string;
  totalUnits: number;
  residents: number;
  guards: number;
  status: "active" | "pending" | "inactive";
  secretary: string;
}

const mockSocieties: Society[] = [
  { id: 1, name: "Sunrise Residency", location: "Mansarovar, Jaipur", totalUnits: 120, residents: 98, guards: 4, status: "active", secretary: "Rajesh Kumar" },
  { id: 2, name: "Green Park Society", location: "Vaishali Nagar, Jaipur", totalUnits: 80, residents: 72, guards: 3, status: "active", secretary: "Amit Sharma" },
  { id: 3, name: "Lake View Apartments", location: "Ajmer Road, Jaipur", totalUnits: 200, residents: 165, guards: 6, status: "active", secretary: "Priya Singh" },
  { id: 4, name: "Royal Heritage Towers", location: "Malviya Nagar, Jaipur", totalUnits: 150, residents: 120, guards: 5, status: "pending", secretary: "Vikram Rathore" },
  { id: 5, name: "Palm Springs Villas", location: "Tonk Road, Jaipur", totalUnits: 60, residents: 45, guards: 2, status: "active", secretary: "Neha Gupta" },
  { id: 6, name: "Sapphire Heights", location: "Jagatpura, Jaipur", totalUnits: 90, residents: 78, guards: 3, status: "inactive", secretary: "Suresh Meena" },
];

const ITEMS_PER_PAGE = 4;

const AdminSocietyList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = mockSocieties.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase()) ||
      s.secretary.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const statusColors: Record<string, string> = {
    active: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    inactive: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">Societies</h2>
          <p className="text-muted-foreground">{filtered.length} societies found</p>
        </div>
        <Button onClick={() => navigate("/admin/create-society")}>
          + Create Society
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, location, or secretary..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="pl-10"
        />
      </div>

      {/* Society Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginated.map((society) => (
          <Card key={society.id} className="hover:shadow-md transition-all group">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{society.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {society.location}
                    </p>
                  </div>
                </div>
                <Badge className={statusColors[society.status]}>{society.status}</Badge>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center py-3 bg-muted/50 rounded-lg mb-3">
                <div>
                  <p className="text-lg font-bold">{society.totalUnits}</p>
                  <p className="text-[10px] text-muted-foreground">Units</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{society.residents}</p>
                  <p className="text-[10px] text-muted-foreground">Residents</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{society.guards}</p>
                  <p className="text-[10px] text-muted-foreground">Guards</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Secretary: <span className="font-medium text-foreground">{society.secretary}</span></p>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="h-4 w-4 mr-1" /> View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <span className="text-sm text-muted-foreground px-3">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminSocietyList;
