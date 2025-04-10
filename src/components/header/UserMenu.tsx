
import { Link, useNavigate } from "react-router-dom";
import { User, LayoutDashboard } from "lucide-react";
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

  if (isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={user?.profileImage}
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
    <Link to="/signin">
      <Button 
        variant="default" 
        className="rounded-[4px] bg-blue-600 hover:bg-blue-700"
      >
        <User className="mr-2 h-4 w-4" />
        Sign In
      </Button>
    </Link>
  );
};

export default UserMenu;
