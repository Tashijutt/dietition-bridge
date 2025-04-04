
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
import { AuthProvider } from "./context/AuthContext";
import MacOSDock from "./components/MacOSDock";
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

// RouterContent component to conditionally show MacOSDock
const RouterContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isDashboardPage = location.pathname.startsWith('/dashboard');
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
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dietitians" element={<AdminDietitians />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/plans" element={<AdminPlans />} />
        <Route path="/admin/chats" element={<AdminChats />} />
        
        {/* User Dashboard Routes */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/dashboard/profile" element={<UserProfile />} />
        <Route path="/dashboard/plans" element={<UserPlans />} />
        <Route path="/dashboard/plans/:id" element={<DietPlanView />} />
        <Route path="/dashboard/dietitians" element={<UserDietitians />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Only show MacOS Dock on public pages, not admin or dashboard */}
      {!isAdminPage && !isDashboardPage && <MacOSDock />}
      
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
