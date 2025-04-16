
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LayoutDashboard, ChevronDown, Apple, Leaf } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

const UserMenu = () => {
  const { user, isAuthenticated, isAdmin, isDietitian, logout } = useAuth();
  const navigate = useNavigate();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target as Node)) {
        setRoleDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    // Redirect to home page after logout
    window.location.href = "/";
  };

  // Determine dashboard link based on user role
  const getDashboardLink = () => {
    if (isAdmin) {
      return "/admin";
    } else if (isDietitian) {
      return "/dietitian/dashboard";
    } else {
      return "/dashboard";
    }
  };

  // Determine profile link based on user role
  const getProfileLink = () => {
    if (isDietitian) {
      return "/dietitian/profile";
    } else {
      return "/dashboard/profile";
    }
  };

  const handleRoleSelection = (role: string) => {
    setRoleDropdownOpen(false);
    navigate("/signin", { state: { selectedRole: role } });
  };

  if (isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={user?.profilePicture}
                alt={user?.name || "User"}
              />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isAdmin && (
            <DropdownMenuItem asChild>
              <Link to="/admin">Admin Dashboard</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link to={getDashboardLink()}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={getProfileLink()}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="relative" ref={roleDropdownRef}>
      <Button
        variant="default"
        className="rounded-[4px] bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
        onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
      >
        <User className="h-4 w-4" />
        Sign In
        <ChevronDown className="h-4 w-4" />
      </Button>

      {roleDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 overflow-hidden border border-gray-200">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-gray-700 font-medium">Are you a Dietitian or a Patient?</h3>
          </div>
          
          <div className="p-2">
            <button 
              onClick={() => handleRoleSelection("user")}
              className="w-full flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors text-left"
            >
              <div className="w-10 h-10 mr-3 bg-red-100 rounded-full flex items-center justify-center">
                <Apple className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800">Patient</div>
                <div className="text-sm text-gray-500">Sign In as Patient</div>
              </div>
            </button>
            
            <button 
              onClick={() => handleRoleSelection("dietitian")}
              className="w-full flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors text-left"
            >
              <div className="w-10 h-10 mr-3 bg-green-100 rounded-full flex items-center justify-center">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-800">Dietitian</div>
                <div className="text-sm text-gray-500">Sign In as Dietitian</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
