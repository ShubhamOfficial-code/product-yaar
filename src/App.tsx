import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { TicketProvider } from "@/contexts/TicketContext";
import Navbar from "@/components/Navbar";
import LoginPage from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import DepartmentDetail from "@/pages/DepartmentDetail";
import AnalyticsPage from "@/pages/Analytics";
import SettingsPage from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="flex h-screen items-center justify-center bg-background"><p className="text-muted-foreground">Loading...</p></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
      <Route path="/department/:name" element={<ProtectedRoute><AppLayout><DepartmentDetail /></AppLayout></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute adminOnly><AppLayout><AnalyticsPage /></AppLayout></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute adminOnly><AppLayout><SettingsPage /></AppLayout></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <TicketProvider>
              <AppRoutes />
            </TicketProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
