
import { useState } from "react";
import { MessageCircle, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, you would send this to a server
      // For now, we'll simulate a successful subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Send email to mtahseen1122@gmail.com (this would happen server-side in reality)
      console.log(`New subscriber: ${email} - to be sent to mtahseen1122@gmail.com`);
      
      toast({
        title: "Subscription Successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#FF9E15" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span className="ml-2 text-xl font-bold text-white">
                Dietitian Bridge
              </span>
              <sup className="text-xs font-normal text-secondary">Pakistan</sup>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting patients with qualified dietitians across Pakistan and providing personalized nutrition guidance for better health outcomes.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-secondary transition-colors inline-block py-1">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-secondary transition-colors inline-block py-1">About Us</Link></li>
              <li><Link to="/dietitians" className="text-gray-400 hover:text-secondary transition-colors inline-block py-1">Find a Dietitian</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-secondary transition-colors inline-block py-1">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-secondary transition-colors inline-block py-1">FAQs</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                <span className="text-gray-400">mtahseen1122@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MessageCircle className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                <span className="text-gray-400">Live chat available 9 AM - 5 PM, Monday to Friday</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest nutrition tips and updates.
            </p>
            <form className="space-y-2" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-[4px] focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-200 outline-none text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-secondary text-white rounded-[4px] hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Dietitian Bridge Pakistan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
