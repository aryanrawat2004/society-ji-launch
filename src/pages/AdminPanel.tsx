import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, CheckCircle, Eye, EyeOff, User, Building, Settings } from "lucide-react";
import { apiRequest, API_BASE_URL } from "@/lib/api";
import { clearAuthSession, getAuthProfile, getAuthToken } from "@/lib/auth";
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

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("generate-credentials");
  
  // Form state
  const [formData, setFormData] = useState<GenerateCredentialsPayload>({
    admin_name: "",
    admin_email: "",
    admin_phone: "",
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCredentials, setGeneratedCredentials] = useState<GeneratedCredentials | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check authentication
  const token = getAuthToken();
  const profile = getAuthProfile();
  
  console.log("AdminPanel - Auth check:", { token: !!token, profile });
  
  if (!token || !profile) {
    console.log("AdminPanel - No token or profile, redirecting to login");
    clearAuthSession();
    navigate("/login", { replace: true });
    return null;
  }
  
  if (profile.role !== "admin") {
    console.log("AdminPanel - Not admin role, redirecting to login");
    clearAuthSession();
    navigate("/login", { replace: true });
    return null;
  }
  
  console.log("AdminPanel - Rendering admin panel for:", profile.email);

  const handleChange = (field: keyof GenerateCredentialsPayload, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleGenerateCredentials = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log('Generating credentials with data:', formData);
      console.log('API Base URL:', API_BASE_URL);
      
      const response = await apiRequest<GeneratedCredentials>("/api/admin/generate-credentials", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setGeneratedCredentials(response);
      toast({
        title: "Success!",
        description: "Admin credentials generated successfully.",
      });

      // Reset form
      setFormData({
        admin_name: "",
        admin_email: "",
        admin_phone: "",
      });
    } catch (err) {
      console.error("Credential generation error:", err);
      let errorMessage = "Failed to generate credentials";
      
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Credentials copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const copyCredentials = () => {
    if (!generatedCredentials) return;
    
    const credentialsText = `
Society Admin Credentials:
━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: ${generatedCredentials.name}
📧 Email: ${generatedCredentials.email}
📱 Phone: ${generatedCredentials.phone}
🔑 Password: ${generatedCredentials.generated_password}

🔐 Login URL: ${window.location.origin}/login

⚠️ IMPORTANT:
• Keep these credentials secure
• Share only with the intended society secretary
• Password shown only once for security
• Secretary can use these to login and create society

Generated on: ${new Date(generatedCredentials.credential_generated_at).toLocaleString()}
    `.trim();

    copyToClipboard(credentialsText);
  };

  const handleLogout = () => {
    clearAuthSession();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Building className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">Society Manager</h1>
                <p className="text-sm text-muted-foreground">Admin Panel</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">{profile.name}</p>
                <Badge variant="secondary" className="text-xs">
                  Super Admin
                </Badge>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="generate-credentials" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Generate Credentials</span>
              </TabsTrigger>
              <TabsTrigger value="society-management" className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>Societies</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            {/* Generate Credentials Tab */}
            <TabsContent value="generate-credentials" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Generate Admin Credentials</span>
                    </CardTitle>
                    <CardDescription>
                      Create login credentials for society secretaries. They will use these to login and create their society.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleGenerateCredentials} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="admin_name">Secretary Name *</Label>
                        <Input
                          id="admin_name"
                          type="text"
                          placeholder="Enter full name"
                          value={formData.admin_name}
                          onChange={(e) => handleChange("admin_name", e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="admin_email">Secretary Email *</Label>
                        <Input
                          id="admin_email"
                          type="email"
                          placeholder="secretary@society.com"
                          value={formData.admin_email}
                          onChange={(e) => handleChange("admin_email", e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="admin_phone">Secretary Phone *</Label>
                        <Input
                          id="admin_phone"
                          type="tel"
                          placeholder="+91 9876543210"
                          value={formData.admin_phone}
                          onChange={(e) => handleChange("admin_phone", e.target.value)}
                          required
                        />
                      </div>

                      {error && (
                        <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded">
                          {error}
                        </div>
                      )}

                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Generating..." : "Generate Credentials"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Generated Credentials Display */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>Generated Credentials</span>
                    </CardTitle>
                    <CardDescription>
                      Share these credentials with the society secretary
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {generatedCredentials ? (
                      <div className="space-y-4">
                        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl shadow-sm">
                          <div className="space-y-4 font-mono text-sm">
                            <div className="flex items-start space-x-3">
                              <span className="text-xl">👤</span>
                              <div className="flex-1">
                                <p className="text-gray-500 text-xs uppercase tracking-wider">Name</p>
                                <p className="text-gray-900 font-semibold text-base">{generatedCredentials.name}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <span className="text-xl">📧</span>
                              <div className="flex-1">
                                <p className="text-gray-500 text-xs uppercase tracking-wider">Email</p>
                                <p className="text-gray-900 font-semibold text-base break-all">{generatedCredentials.email}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <span className="text-xl">📱</span>
                              <div className="flex-1">
                                <p className="text-gray-500 text-xs uppercase tracking-wider">Phone</p>
                                <p className="text-gray-900 font-semibold text-base">{generatedCredentials.phone}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <span className="text-xl">🔑</span>
                              <div className="flex-1">
                                <p className="text-gray-500 text-xs uppercase tracking-wider">Password</p>
                                <div className="flex items-center space-x-2">
                                  <code className="flex-1 p-3 bg-white border border-green-200 rounded-lg text-base font-bold text-green-700">
                                    {showPassword ? generatedCredentials.generated_password : "••••••••••••"}
                                  </code>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="border-green-300 hover:bg-green-100"
                                  >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="pt-3 border-t-2 border-green-200">
                              <div className="flex items-start space-x-3">
                                <span className="text-xl">🔐</span>
                                <div className="flex-1">
                                  <p className="text-gray-500 text-xs uppercase tracking-wider">Login URL</p>
                                  <p className="text-blue-600 font-semibold text-base break-all">{window.location.origin}/login</p>
                                </div>
                              </div>
                            </div>

                            <div className="pt-3 border-t-2 border-green-200">
                              <div className="flex items-start space-x-3">
                                <span className="text-xl">📅</span>
                                <div className="flex-1">
                                  <p className="text-gray-500 text-xs uppercase tracking-wider">Generated on</p>
                                  <p className="text-gray-700 font-medium text-sm">
                                    {new Date(generatedCredentials.credential_generated_at).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button onClick={copyCredentials} className="flex-1 bg-green-600 hover:bg-green-700">
                            <Copy className="h-4 w-4 mr-2" />
                            {copied ? "Copied! ✓" : "Copy All Details"}
                          </Button>
                        </div>

                        <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl">⚠️</span>
                            <div className="flex-1">
                              <p className="font-bold text-amber-900 mb-2">IMPORTANT:</p>
                              <ul className="space-y-1 text-sm text-amber-800">
                                <li className="flex items-start">
                                  <span className="mr-2">•</span>
                                  <span>Keep these credentials secure</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="mr-2">•</span>
                                  <span>Share only with the intended society secretary</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="mr-2">•</span>
                                  <span>Password shown only once for security</span>
                                </li>
                                <li className="flex items-start">
                                  <span className="mr-2">•</span>
                                  <span>Secretary can use these to login and create society</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-500">No credentials generated yet</p>
                        <p className="text-sm text-gray-400">Fill the form to generate admin credentials</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Society Management Tab */}
            <TabsContent value="society-management" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Society Management</CardTitle>
                  <CardDescription>
                    Manage societies and their administrators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Building className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">Society management features coming soon</p>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/admin/create-society")}
                      className="mt-4"
                    >
                      Create Society
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    System configuration and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Settings className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">Settings panel coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;