
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
  requireDietitian?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  requireAdmin = false,
  requireDietitian = false
}: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, isDietitian, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // If not logged in, redirect to signin
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // If admin is required but user is not admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // If dietitian is required but user is not dietitian
  if (requireDietitian && !isDietitian) {
    return <Navigate to="/dashboard" replace />;
  }

  // For dietitian pages, redirect to correct dashboard based on role
  if (location.pathname.startsWith('/dietitian') && !isDietitian && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // For user dashboards, redirect dietitians to their dashboard unless they are admins
  if (location.pathname.startsWith('/user/dashboard') && isDietitian && !isAdmin) {
    return <Navigate to="/dietitian/dashboard" replace />;
  }
  
  // NEW CONDITION: Redirect dietitians to their dashboard when accessing the main dashboard route
  if (location.pathname === '/dashboard' && isDietitian && !isAdmin) {
    return <Navigate to="/dietitian/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
