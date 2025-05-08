import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Plans from "@/pages/Plans";
import Dietitians from "@/pages/Dietitians";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import FAQs from "@/pages/FAQs";
import SignIn from "@/pages/SignIn";
import NotFound from "@/pages/NotFound";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import WeightLossTips from "@/pages/WeightLossTips";
import Chat from "@/pages/Chat";
import ChatWidgetWrapper from "@/components/ChatWidgetWrapper";
import ScrollToTopButton from "@/components/ScrollToTopButton";
// Import dashboard components
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminPlans from "@/pages/admin/AdminPlans";
import AdminChats from "@/pages/admin/AdminChats";
import AdminDietitians from "@/pages/admin/AdminDietitians";
import DietitianDashboard from "@/pages/dietitian/DietitianDashboard";
import DietitianProfile from "@/pages/dietitian/DietitianProfile";
import DietitianPlans from "@/pages/dietitian/DietitianPlans";
import DietitianAppointments from "@/pages/dietitian/DietitianAppointments";
import UserDashboard from "@/pages/user/UserDashboard";
import UserProfile from "@/pages/user/UserProfile";
import UserPlans from "@/pages/user/UserPlans";
import UserDietitians from "@/pages/user/UserDietitians";
import DietPlanView from "@/pages/user/DietPlanView";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/dietitians" element={<Dietitians />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/weight-loss-tips" element={<WeightLossTips />} />
          <Route path="/chat" element={<Chat />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/plans" element={<AdminPlans />} />
          <Route path="/admin/chats" element={<AdminChats />} />
          <Route path="/admin/dietitians" element={<AdminDietitians />} />
          
          {/* Dietitian Dashboard Routes */}
          <Route path="/dietitian" element={<DietitianDashboard />} />
          <Route path="/dietitian/dashboard" element={<DietitianDashboard />} />
          <Route path="/dietitian/profile" element={<DietitianProfile />} />
          <Route path="/dietitian/plans" element={<DietitianPlans />} />
          <Route path="/dietitian/patients" element={<DietitianDashboard />} />
          <Route path="/dietitian/appointments" element={<DietitianAppointments />} />
          
          {/* User Dashboard Routes */}
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/dashboard/profile" element={<UserProfile />} />
          <Route path="/dashboard/plans" element={<UserPlans />} />
          <Route path="/dashboard/plans/:id" element={<DietPlanView />} />
          <Route path="/dashboard/dietitians" element={<UserDietitians />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Chat Widget that appears on all pages */}
        <ChatWidgetWrapper />
        
        {/* Scroll to top button */}
        <ScrollToTopButton />
        
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
