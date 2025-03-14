
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X, Heart, MessageCircle } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dietitians', path: '/dietitians' },
    { name: 'Chat with AI', path: '/chat' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-bold text-nutrition-600 transition-transform duration-300 hover:scale-105"
        >
          <Heart className="h-6 w-6 text-nutrition-600 fill-nutrition-500" />
          <span className="tracking-tight">NutriCare</span>
          <sup className="text-xs font-normal text-health-600">Pakistan</sup>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-all duration-300 animated-underline",
                isActive(item.path) 
                  ? "text-nutrition-700 after:w-full" 
                  : "text-gray-700 hover:text-nutrition-600"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Login/Register Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            to="/chat"
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-nutrition-50 text-nutrition-700 hover:bg-nutrition-100 transition-all duration-300"
          >
            <MessageCircle size={18} />
            <span className="text-sm font-medium">Chat Now</span>
          </Link>
          <Link
            to="/signin"
            className="px-5 py-2 rounded-full bg-nutrition-600 text-white hover:bg-nutrition-700 transition-all duration-300 shadow-sm hover:shadow-md text-sm font-medium"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden flex items-center text-gray-700 focus:outline-none"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white pt-20 animate-fade-in">
          <nav className="container mx-auto px-4 py-8 flex flex-col space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-lg font-medium px-4 py-2 rounded-md transition-all duration-300",
                  isActive(item.path) 
                    ? "bg-nutrition-50 text-nutrition-700" 
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-6 border-t border-gray-100 flex flex-col space-y-4">
              <Link
                to="/chat"
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-full bg-nutrition-50 text-nutrition-700"
              >
                <MessageCircle size={18} />
                <span className="font-medium">Chat Now</span>
              </Link>
              <Link
                to="/signin"
                className="px-4 py-3 rounded-full bg-nutrition-600 text-white text-center font-medium"
              >
                Sign In
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
