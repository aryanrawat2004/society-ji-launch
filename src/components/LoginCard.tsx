import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { adminLogin, userLogin, getAuthProfile } from "@/lib/auth";

interface LoginCardProps {
  title?: string;
  description?: string;
  className?: string;
}

const LoginCard = ({
  title = "Sign In",
  description = "Enter your credentials to access your account",
  className = "",
}: LoginCardProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<'admin' | 'user' | null>(null);

  // Handle navigation after successful login
  useEffect(() => {
    if (loginSuccess === 'admin') {
      console.log("Redirecting to admin panel...");
      navigate("/admin", { replace: true });
    } else if (loginSuccess === 'user') {
      console.log("Redirecting to user dashboard...");
      navigate("/dashboard", { replace: true });
    }
  }, [loginSuccess, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    setLoginSuccess(null);

    try {
      let loginResult: any = null;
      let loginType: 'admin' | 'user' | null = null;

      // Try admin login first (for @mabicons.com users and system-generated admins)
      try {
        loginResult = await adminLogin(email, password);
        loginType = 'admin';
        console.log("Admin login successful:", loginResult);
      } catch (adminErr: any) {
        console.log("Admin login failed, trying user login:", adminErr);
        
        // If admin login failed, try user login
        try {
          loginResult = await userLogin(email, password);
          loginType = 'user';
          console.log("User login successful:", loginResult);
        } catch (userErr: any) {
          // Both logins failed
          const errorMsg = userErr?.message || adminErr?.message || "Invalid credentials";
          throw new Error(errorMsg);
        }
      }

      // Determine routing based on user role from response
      if (loginResult) {
        const userRole = loginResult.role || loginResult.data?.role;
        
        // Route to admin panel if user is an admin
        if (userRole === 'admin' || loginType === 'admin') {
          setLoginSuccess('admin');
        } else {
          // Route to home for regular users
          setLoginSuccess('user');
        }
      }
    } catch (err: any) {
      console.error("Login error:", err);
      const errorMessage = err?.message || err?.detail || "Login failed. Please check your credentials.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`shadow-lg ${className}`}>
      <CardHeader className="space-y-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Info Banner */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-sm">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Regular users:</strong> Access your society dashboard
              <br />
              <strong>@mabicons.com:</strong> Get admin privileges automatically
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
