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
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Chat Widget that appears on all pages */}
        <ChatWidgetWrapper />
        
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
