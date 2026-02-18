import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import Signup from "./pages/Signup";
import CreateSociety from "./pages/CreateSociety";
import AdminPanel from "./pages/AdminPanel";
import UserDashboard from "./pages/UserDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { getAuthProfile, getAuthToken } from "@/lib/auth";

const queryClient = new QueryClient();

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const token = getAuthToken();
  const profile = getAuthProfile();
  
  console.log("RequireAdmin check:", { token: !!token, profile });
  
  if (!token || !profile) {
    console.log("No token or profile, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  if (profile.role !== "admin") {
    console.log("Not admin role, redirecting to login. Role:", profile.role);
    return <Navigate to="/login" replace />;
  }
  
  console.log("Admin access granted!");
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/login" element={<Navigate to="/login" replace />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminPanel />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/panel"
            element={
              <RequireAdmin>
                <AdminPanel />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/create-society"
            element={
              <RequireAdmin>
                <CreateSociety />
              </RequireAdmin>
            }
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
