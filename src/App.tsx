
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Plans from "./pages/Plans";
import Dietitians from "./pages/Dietitians";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDietitians from "./pages/admin/AdminDietitians";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPlans from "./pages/admin/AdminPlans";
import AdminChats from "./pages/admin/AdminChats";
import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/UserProfile";
import UserPlans from "./pages/user/UserPlans";
import DietPlanView from "./pages/user/DietPlanView";
import UserDietitians from "./pages/user/UserDietitians";
import DietitianDashboard from "./pages/dietitian/DietitianDashboard";
import DietitianProfile from "./pages/dietitian/DietitianProfile";
import DietitianPatients from "./pages/dietitian/DietitianPatients";
import DietitianPlans from "./pages/dietitian/DietitianPlans";
import DietitianAppointments from "./pages/dietitian/DietitianAppointments";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatWidgetWrapper from "./components/ChatWidgetWrapper";

const queryClient = new QueryClient();

// ScrollToTop component to ensure pages start from the top
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// RouterContent component to conditionally show MacOSDock and ChatWidgetWrapper
const RouterContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isDashboardPage = location.pathname.startsWith('/dashboard');
  const isDietitianPage = location.pathname.startsWith('/dietitian');
  const isChatPage = location.pathname === '/chat';
  const isSignInPage = location.pathname === '/signin';

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/dietitians" element={<Dietitians />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/signin" element={<SignIn />} />
        
        {/* Admin Routes - Protected with admin role required */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/dietitians" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDietitians />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminUsers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/plans" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPlans />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/chats" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminChats />
            </ProtectedRoute>
          } 
        />
        
        {/* User Dashboard Routes - Protected */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/profile" 
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/plans" 
          element={
            <ProtectedRoute>
              <UserPlans />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/plans/:id" 
          element={
            <ProtectedRoute>
              <DietPlanView />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/dietitians" 
          element={
            <ProtectedRoute>
              <UserDietitians />
            </ProtectedRoute>
          } 
        />

        {/* Dietitian Dashboard Routes - Protected */}
        <Route 
          path="/dietitian/dashboard" 
          element={
            <ProtectedRoute>
              <DietitianDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dietitian/profile" 
          element={
            <ProtectedRoute>
              <DietitianProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dietitian/patients" 
          element={
            <ProtectedRoute>
              <DietitianPatients />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dietitian/plans" 
          element={
            <ProtectedRoute>
              <DietitianPlans />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dietitian/appointments" 
          element={
            <ProtectedRoute>
              <DietitianAppointments />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Only show ChatWidgetWrapper when not on the dedicated chat page or signin page */}
      {!isChatPage && !isSignInPage && <ChatWidgetWrapper />}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <RouterContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
