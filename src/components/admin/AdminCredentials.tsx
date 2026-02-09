import { useState, useEffect } from "react";
import { User, Copy, CheckCircle, Eye, EyeOff, ChevronLeft, ChevronRight, Plus, RefreshCw } from "lucide-react";
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
  admin_id?: number;
  id?: number;
  name: string;
  email: string;
  phone: string;
  generated_password?: string;
  is_system_generated?: boolean;
  credential_generated_at?: string;
  generated_at?: string;
  message?: string;
  society_id?: number;
  status?: string;
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
  const [fetchingHistory, setFetchingHistory] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  // Credentials history (current + previously generated)
  const [credentialsList, setCredentialsList] = useState<GeneratedCredentials[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCredential = credentialsList[currentIndex] || null;

  // Fetch credentials history on mount
  useEffect(() => {
    fetchCredentialsHistory();
  }, []);

  const fetchCredentialsHistory = async () => {
    setFetchingHistory(true);
    try {
      const response = await apiRequest<{ total: number; admins: GeneratedCredentials[] }>("/api/admin/admins", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const history = response.admins || [];
      setCredentialsList(history);
    } catch (err) {
      console.error("Failed to fetch credentials history:", err);
      // Don't show error toast on initial load, just log it
    } finally {
      setFetchingHistory(false);
    }
  };

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
      setShowPassword(true); // Auto-show password for newly generated credentials
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
    
    const passwordText = currentCredential.generated_password 
      ? `🔑 Password: ${currentCredential.generated_password}` 
      : '🔑 Password: [Hidden for security - only shown at generation time]';
    
    const dateText = currentCredential.credential_generated_at || currentCredential.generated_at || '';
    
    const text = `Society Admin Credentials:\n━━━━━━━━━━━━━━━━━━━━━━━━━\n👤 Name: ${currentCredential.name}\n📧 Email: ${currentCredential.email}\n📱 Phone: ${currentCredential.phone}\n${passwordText}\n🔐 Login URL: ${window.location.origin}/login\n📅 Generated: ${new Date(dateText).toLocaleString()}`;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast({ title: "Copied!", description: "Credentials copied to clipboard." });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 px-4 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold">Credentials</h2>
          <p className="text-sm md:text-base text-muted-foreground">Generate & manage admin credentials for societies</p>
          {credentialsList.length > 0 && (
            <Badge variant="secondary" className="mt-2 text-xs">
              {credentialsList.length} credential{credentialsList.length !== 1 ? 's' : ''} generated
            </Badge>
          )}
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <Button variant="outline" size="icon" onClick={fetchCredentialsHistory} disabled={fetchingHistory} className="shrink-0">
            <RefreshCw className={`h-4 w-4 ${fetchingHistory ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={() => setShowForm(!showForm)} className="text-sm">
            <Plus className="h-4 w-4 mr-1 sm:mr-2" /> 
            <span className="hidden xs:inline">Generate New</span>
            <span className="xs:hidden">New</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Form */}
        {showForm && (
          <Card className="border-primary/20">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <User className="h-4 w-4 md:h-5 md:w-5" /> New Credentials
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">Enter secretary details to generate login credentials.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerate} className="space-y-3 md:space-y-4">
                <div className="space-y-1.5 md:space-y-2">
                  <Label className="text-sm">Secretary Name *</Label>
                  <Input 
                    placeholder="Enter full name" 
                    value={formData.admin_name} 
                    onChange={(e) => handleChange("admin_name", e.target.value)} 
                    className="text-sm md:text-base"
                    required 
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <Label className="text-sm">Secretary Email *</Label>
                  <Input 
                    type="email" 
                    placeholder="secretary@society.com" 
                    value={formData.admin_email} 
                    onChange={(e) => handleChange("admin_email", e.target.value)} 
                    className="text-sm md:text-base"
                    required 
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <Label className="text-sm">Secretary Phone *</Label>
                  <Input 
                    type="tel" 
                    placeholder="+91 9876543210" 
                    value={formData.admin_phone} 
                    onChange={(e) => handleChange("admin_phone", e.target.value)} 
                    className="text-sm md:text-base"
                    required 
                  />
                </div>
                {error && (
                  <div className="p-2.5 md:p-3 text-xs md:text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">{error}</div>
                )}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button type="submit" className="flex-1 text-sm md:text-base" disabled={loading}>
                    {loading ? "Generating..." : "Generate Credentials"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="text-sm md:text-base">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Credential Display with Navigation */}
        <Card className={showForm ? "" : "lg:col-span-2 max-w-full lg:max-w-2xl"}>
          <CardHeader className="pb-3 md:pb-6">
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
              <CardTitle className="text-base md:text-lg flex items-center gap-2">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5" /> Generated Credentials
              </CardTitle>
              {credentialsList.length > 1 && (
                <div className="flex items-center gap-2 self-start xs:self-auto">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-7 w-7 md:h-8 md:w-8" 
                    disabled={currentIndex >= credentialsList.length - 1} 
                    onClick={() => setCurrentIndex((i) => i + 1)}
                  >
                    <ChevronLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </Button>
                  <span className="text-xs md:text-sm text-muted-foreground min-w-[50px] md:min-w-[60px] text-center">
                    {currentIndex + 1} / {credentialsList.length}
                  </span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-7 w-7 md:h-8 md:w-8" 
                    disabled={currentIndex <= 0} 
                    onClick={() => setCurrentIndex((i) => i - 1)}
                  >
                    <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {fetchingHistory ? (
              <div className="text-center py-8 md:py-10">
                <RefreshCw className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 md:mb-3 text-muted-foreground/40 animate-spin" />
                <p className="text-sm md:text-base text-muted-foreground">Loading credentials...</p>
              </div>
            ) : currentCredential ? (
              <div className="space-y-3 md:space-y-4">
                <div className="p-4 md:p-5 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <div className="space-y-2.5 md:space-y-3 text-xs md:text-sm">
                    {[
                      { icon: "👤", label: "Name", value: currentCredential.name },
                      { icon: "📧", label: "Email", value: currentCredential.email },
                      { icon: "📱", label: "Phone", value: currentCredential.phone },
                    ].map((row) => (
                      <div key={row.label} className="flex items-start gap-2 md:gap-3">
                        <span className="text-base md:text-lg shrink-0">{row.icon}</span>
                        <span className="text-muted-foreground w-16 md:w-20 shrink-0">{row.label}</span>
                        <span className="font-semibold break-all">{row.value}</span>
                      </div>
                    ))}
                    <div className="flex items-start gap-2 md:gap-3">
                      <span className="text-base md:text-lg shrink-0">🔑</span>
                      <span className="text-muted-foreground w-16 md:w-20 shrink-0">Password</span>
                      {currentCredential.generated_password ? (
                        <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                          <code className="px-2 md:px-3 py-1 md:py-1.5 bg-white dark:bg-gray-900 border border-emerald-200 dark:border-emerald-800 rounded-md font-bold text-emerald-700 select-all text-xs md:text-sm break-all">
                            {showPassword ? currentCredential.generated_password : "••••••••••"}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 md:h-7 md:w-7 shrink-0" 
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-3 w-3 md:h-3.5 md:w-3.5" /> : <Eye className="h-3 w-3 md:h-3.5 md:w-3.5" />}
                          </Button>
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-[10px] md:text-xs text-amber-600 border-amber-300">
                          Not available - Generated before this feature
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-start gap-2 md:gap-3 pt-2 border-t border-emerald-200 dark:border-emerald-800">
                      <span className="text-base md:text-lg shrink-0">📅</span>
                      <span className="text-muted-foreground w-16 md:w-20 shrink-0">Generated</span>
                      <span className="text-[10px] md:text-xs break-all">
                        {formatDate(currentCredential.credential_generated_at || currentCredential.generated_at)}
                      </span>
                    </div>
                    {currentCredential.society_id && (
                      <div className="flex items-start gap-2 md:gap-3 pt-1 border-t border-emerald-200 dark:border-emerald-800">
                        <span className="text-base md:text-lg shrink-0">🏢</span>
                        <span className="text-muted-foreground w-16 md:w-20 shrink-0">Society</span>
                        <Badge variant="secondary" className="text-xs">ID: {currentCredential.society_id}</Badge>
                      </div>
                    )}
                    {currentCredential.status && (
                      <div className="flex items-start gap-2 md:gap-3">
                        <span className="text-base md:text-lg shrink-0">✓</span>
                        <span className="text-muted-foreground w-16 md:w-20 shrink-0">Status</span>
                        <Badge variant={currentCredential.status === "active" ? "default" : "secondary"} className="text-xs">
                          {currentCredential.status}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
                <Button onClick={copyCredentials} className="w-full text-sm md:text-base" variant="outline">
                  <Copy className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" /> {copied ? "Copied! ✓" : "Copy All Details"}
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 md:py-10">
                <User className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-2 md:mb-3 text-muted-foreground/40" />
                <p className="text-sm md:text-base text-muted-foreground">No credentials generated yet</p>
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
