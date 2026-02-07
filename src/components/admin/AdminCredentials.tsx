import { useState } from "react";
import { User, Copy, CheckCircle, Eye, EyeOff, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

interface GenerateCredentialsPayload {
  admin_name: string;
  admin_email: string;
  admin_phone: string;
  society_id?: number;
}

interface GeneratedCredentials {
  admin_id: number;
  name: string;
  email: string;
  phone: string;
  generated_password: string;
  is_system_generated: boolean;
  credential_generated_at: string;
  message: string;
}

const AdminCredentials = () => {
  const { toast } = useToast();
  const token = getAuthToken();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<GenerateCredentialsPayload>({
    admin_name: "",
    admin_email: "",
    admin_phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  // Credentials history (current + previously generated)
  const [credentialsList, setCredentialsList] = useState<GeneratedCredentials[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCredential = credentialsList[currentIndex] || null;

  const handleChange = (field: keyof GenerateCredentialsPayload, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleGenerate = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await apiRequest<{ data: GeneratedCredentials } | GeneratedCredentials>("/api/admin/generate-credentials", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const credentials = 'data' in response ? response.data : response;
      setCredentialsList((prev) => [credentials as GeneratedCredentials, ...prev]);
      setCurrentIndex(0);
      setShowForm(false);
      setFormData({ admin_name: "", admin_email: "", admin_phone: "" });
      toast({ title: "Success!", description: "Credentials generated successfully." });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate credentials";
      setError(errorMessage);
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const copyCredentials = () => {
    if (!currentCredential) return;
    const text = `Society Admin Credentials:\n━━━━━━━━━━━━━━━━━━━━━━━━━\n👤 Name: ${currentCredential.name}\n📧 Email: ${currentCredential.email}\n📱 Phone: ${currentCredential.phone}\n🔑 Password: ${currentCredential.generated_password}\n🔐 Login URL: ${window.location.origin}/login\n📅 Generated: ${new Date(currentCredential.credential_generated_at).toLocaleString()}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast({ title: "Copied!", description: "Credentials copied to clipboard." });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">Credentials</h2>
          <p className="text-muted-foreground">Generate & manage admin credentials for societies</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" /> Generate New
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        {showForm && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" /> New Credentials
              </CardTitle>
              <CardDescription>Enter secretary details to generate login credentials.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="space-y-2">
                  <Label>Secretary Name *</Label>
                  <Input placeholder="Enter full name" value={formData.admin_name} onChange={(e) => handleChange("admin_name", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Secretary Email *</Label>
                  <Input type="email" placeholder="secretary@society.com" value={formData.admin_email} onChange={(e) => handleChange("admin_email", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Secretary Phone *</Label>
                  <Input type="tel" placeholder="+91 9876543210" value={formData.admin_phone} onChange={(e) => handleChange("admin_phone", e.target.value)} required />
                </div>
                {error && (
                  <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">{error}</div>
                )}
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? "Generating..." : "Generate Credentials"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Credential Display with Navigation */}
        <Card className={showForm ? "" : "lg:col-span-2 max-w-2xl"}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5" /> Generated Credentials
              </CardTitle>
              {credentialsList.length > 1 && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentIndex >= credentialsList.length - 1} onClick={() => setCurrentIndex((i) => i + 1)}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground min-w-[60px] text-center">
                    {currentIndex + 1} / {credentialsList.length}
                  </span>
                  <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentIndex <= 0} onClick={() => setCurrentIndex((i) => i - 1)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {currentCredential ? (
              <div className="space-y-4">
                <div className="p-5 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl">
                  <div className="space-y-3 text-sm">
                    {[
                      { icon: "👤", label: "Name", value: currentCredential.name },
                      { icon: "📧", label: "Email", value: currentCredential.email },
                      { icon: "📱", label: "Phone", value: currentCredential.phone },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center gap-3">
                        <span className="text-lg">{row.icon}</span>
                        <span className="text-muted-foreground w-16">{row.label}</span>
                        <span className="font-semibold">{row.value}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-3">
                      <span className="text-lg">🔑</span>
                      <span className="text-muted-foreground w-16">Password</span>
                      <code className="px-3 py-1 bg-white border border-emerald-200 rounded-md font-bold text-emerald-700">
                        {showPassword ? currentCredential.generated_password : "••••••••••"}
                      </code>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </Button>
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-emerald-200">
                      <span className="text-lg">📅</span>
                      <span className="text-muted-foreground w-16">Date</span>
                      <span className="text-xs">{new Date(currentCredential.credential_generated_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <Button onClick={copyCredentials} className="w-full" variant="outline">
                  <Copy className="h-4 w-4 mr-2" /> {copied ? "Copied! ✓" : "Copy All Details"}
                </Button>
              </div>
            ) : (
              <div className="text-center py-10">
                <User className="h-12 w-12 mx-auto mb-3 text-muted-foreground/40" />
                <p className="text-muted-foreground">No credentials generated yet</p>
                <p className="text-xs text-muted-foreground mt-1">Click "Generate New" to create credentials</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCredentials;
