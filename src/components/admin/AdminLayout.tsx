
import { ReactNode, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  MessageSquare, 
  UserCog, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  Globe,
  Sliders,
  Bell,
  Home
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
import { Badge } from "@/components/ui/badge";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
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
      path: "/admin", 
      label: "Dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      path: "/admin/dietitians", 
      label: "Dietitians", 
      icon: <UserCog className="h-5 w-5" /> 
    },
    { 
      path: "/admin/users", 
      label: "Users", 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      path: "/admin/plans", 
      label: "Diet Plans", 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      path: "/admin/chats", 
      label: "Chat Logs", 
      icon: <MessageSquare className="h-5 w-5" /> 
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-[#9b87f5] shadow-[0px_8px_32px_0px_rgba(31,38,135,0.15)] fixed w-full z-10">
        <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center justify-between">
          {/* Mobile menu button */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Logo */}
          <div className="flex-1 flex items-center justify-center lg:justify-start">
            <Link to="/admin" className="font-bold text-xl text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#7E69AB" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              Dietitian Bridge 
              <Badge variant="outline" className="ml-2 bg-[#7E69AB] text-white border-[#7E69AB]">
                Admin
              </Badge>
            </Link>
          </div>
          
          {/* User menu */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-gray-200">
              <Home className="h-5 w-5" />
            </Link>
            
            <button className="text-white hover:text-gray-200 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-[#7E69AB] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center bg-[#9b87f5]/70 border border-[#7E69AB]/20 rounded-full py-1.5 px-3 text-sm font-medium text-white hover:bg-[#9b87f5]/80 focus:outline-none transition duration-150 ease-in-out">
                <Avatar className="h-8 w-8 mr-2 border border-[#7E69AB]/30">
                  <AvatarImage src={user?.profileImage} alt={user?.name || ""} />
                  <AvatarFallback className="bg-[#7E69AB] text-white">
                    {user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "A"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block text-white">{user?.name}</span>
                <ChevronDown className="ml-2 h-4 w-4 text-white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 shadow-[0px_8px_32px_0px_rgba(31,38,135,0.15)]">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  User Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/admin")}>
                  <Sliders className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
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
          } lg:translate-x-0 fixed lg:relative lg:block z-30 w-64 h-[calc(100vh-4rem)] bg-white shadow-[0px_8px_32px_0px_rgba(31,38,135,0.15)] transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4 border-b">
            <div className="text-sm text-gray-500">Admin Portal</div>
            <div className="font-medium">Manage your platform</div>
          </div>
          <nav className="p-4 space-y-1 overflow-y-auto h-full">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-[4px] transition-colors ${
                  location.pathname === item.path
                    ? "bg-[#9b87f5]/5 text-[#9b87f5]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
            
            <div className="pt-4 mt-4 border-t">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                System
              </div>
              <Link
                to="/admin"
                className="flex items-center px-4 py-3 text-sm font-medium rounded-[4px] text-gray-700 hover:bg-gray-100"
              >
                <Sliders className="h-5 w-5" />
                <span className="ml-3">Settings</span>
              </Link>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-3 text-sm font-medium rounded-[4px] text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-3">Log out</span>
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 lg:pl-6 w-full overflow-x-hidden">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#9b87f5]">{title}</h1>
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

export default AdminLayout;
