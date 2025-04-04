
import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, ScrollText, Users, Info, Mail, FileText } from "lucide-react";
import { useEffect, useState } from "react";

const MacOSDock = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  
  // Add mount animation effect
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const dockItems = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5 text-white" /> },
    { name: "Chat", path: "/chat", icon: <MessageSquare className="w-5 h-5 text-white" /> },
    { name: "Plans", path: "/plans", icon: <ScrollText className="w-5 h-5 text-white" /> },
    { name: "Dietitians", path: "/dietitians", icon: <Users className="w-5 h-5 text-white" /> },
    { name: "About", path: "/about", icon: <Info className="w-5 h-5 text-white" /> },
    { name: "Contact", path: "/contact", icon: <Mail className="w-5 h-5 text-white" /> },
    { name: "Blog", path: "/blog", icon: <FileText className="w-5 h-5 text-white" /> }
  ];

  return (
    <div className={`macos-dock ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <div className="macos-dock-inner">
        {dockItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (location.pathname !== '/' && item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <Link 
              key={item.path}
              to={item.path}
              className={`macos-dock-item ${isActive ? 'active' : ''}`}
              data-name={item.name}
            >
              <div className={`macos-dock-icon ${isActive ? 'active' : ''}`}>
                {item.icon}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MacOSDock;
