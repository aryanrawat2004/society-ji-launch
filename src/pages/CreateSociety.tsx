import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/api";
import { clearAuthSession, getAuthProfile, getAuthToken } from "@/lib/auth";

interface SocietyPayload {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const CreateSociety = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SocietyPayload>({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (field: keyof SocietyPayload, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const token = getAuthToken();
    const profile = getAuthProfile();
    if (!token || !profile) {
      clearAuthSession();
      navigate("/login", { replace: true });
      return;
    }
    if (profile.role !== "admin" || !profile.is_system_generated) {
      clearAuthSession();
      navigate("/login", { replace: true });
      return;
    }

    setLoading(true);
    try {
      await apiRequest("/api/societies/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      setSuccessMessage("Society created successfully. You can now add buildings in the app.");
      setFormData({
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create society";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-20">
      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle>Create Society</CardTitle>
            <CardDescription>
              Only system-generated admins can create societies. Please fill in the details below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Society Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(event) => handleChange("address", event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(event) => handleChange("city", event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(event) => handleChange("state", event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(event) => handleChange("pincode", event.target.value)}
                  required
                />
              </div>
              {error ? (
                <p className="text-sm text-destructive">{error}</p>
              ) : null}
              {successMessage ? (
                <p className="text-sm text-emerald-600">{successMessage}</p>
              ) : null}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Society"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateSociety;
