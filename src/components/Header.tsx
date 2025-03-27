
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "./header/Logo";
import NavLinks from "./header/NavLinks";
import UserMenu from "./header/UserMenu";
import MobileMenuButton from "./header/MobileMenuButton";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white",
        isScrolled ? "shadow-[0_0.125rem_0.25rem_rgba(0,0,0,.075)]" : ""
      )}
    >
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <NavLinks />

          {/* Sign In / User Account */}
          <div className="flex items-center">
            <UserMenu />

            {/* Mobile menu button */}
            <MobileMenuButton 
              isOpen={mobileMenuOpen} 
              toggleMenu={toggleMobileMenu} 
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && <NavLinks isMobile />}
    </header>
  );
};

export default Header;
