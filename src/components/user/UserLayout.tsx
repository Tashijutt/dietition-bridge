
import { ReactNode, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  UserCog, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  Home,
  MessageSquare,
  Heart,
  Bell,
  HelpCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface UserLayoutProps {
  children: ReactNode;
  title: string;
}

const UserLayout = ({ children, title }: UserLayoutProps) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    });
    navigate("/");
  };

  const navItems = [
    { 
      path: "/dashboard", 
      label: "Dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      path: "/dashboard/profile", 
      label: "My Profile", 
      icon: <User className="h-5 w-5" /> 
    },
    { 
      path: "/dashboard/plans", 
      label: "My Diet Plans", 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      path: "/dashboard/dietitians", 
      label: "My Dietitians", 
      icon: <UserCog className="h-5 w-5" /> 
    },
    { 
      path: "/chat", 
      label: "AI Consultation", 
      icon: <MessageSquare className="h-5 w-5" /> 
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-soft border-b fixed w-full z-10">
        <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center justify-between">
          {/* Mobile menu button */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-gray-500 hover:text-primary"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Logo */}
          <div className="flex-1 flex items-center justify-center lg:justify-start">
            <Link to="/dashboard" className="font-bold text-xl text-primary">
              Dietitian Bridge <span className="text-sm font-normal text-gray-500">Dashboard</span>
            </Link>
          </div>
          
          {/* User menu */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="mr-2 text-gray-600 hover:text-primary">
              <Home className="h-5 w-5" />
            </Link>
            
            <button className="text-gray-600 hover:text-primary relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center bg-white border border-gray-200 rounded-full py-1.5 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition duration-150 ease-in-out">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={user?.profileImage} alt={user?.name || ""} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block">{user?.name}</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 shadow-soft">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/chat")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  New Consultation
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar and Main Content */}
      <div className="flex flex-1 pt-16 max-w-[1280px] mx-auto w-full">
        {/* Sidebar */}
        <aside 
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:relative lg:block z-30 w-64 h-[calc(100vh-4rem)] bg-white border-r shadow-soft transition-transform duration-300 ease-in-out`}
        >
          <nav className="p-4 space-y-1 overflow-y-auto h-full">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-[4px] transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary/5 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
            
            <div className="pt-8 mt-4 border-t">
              <div className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-lg">
                <Heart className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Need Help?</h3>
                <p className="text-sm text-gray-600 mt-1">Contact our support team for assistance</p>
                <Button size="sm" className="mt-3 w-full bg-primary hover:bg-primary/90 text-white" asChild>
                  <Link to="/contact">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Get Support
                  </Link>
                </Button>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 lg:pl-6 w-full overflow-x-hidden">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary">{title}</h1>
          </div>
          
          {children}
        </main>
      </div>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default UserLayout;
