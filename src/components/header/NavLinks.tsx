
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Chat with AI", path: "/chat" },
  { name: "Diet Plans", path: "/plans" },
  { name: "Find Dietitians", path: "/dietitians" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Blog", path: "/blog" }
];

const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
  const location = useLocation();
  const activePath = location.pathname;

  if (isMobile) {
    return (
      <div className="md:hidden bg-white border-t border-gray-200 shadow-soft">
        <div className="container mx-auto px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "block px-3 py-2 text-base font-medium rounded-[4px]",
                activePath === link.path
                  ? "text-white bg-primary"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <nav className="hidden md:flex space-x-1">
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            "px-3 py-2 text-sm font-medium rounded-[4px] transition-colors",
            activePath === link.path
              ? "text-white bg-primary"
              : "text-gray-600 hover:text-primary"
          )}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
