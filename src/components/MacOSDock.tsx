
import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, ScrollText, Users, Info, Mail, FileText } from "lucide-react";

const MacOSDock = () => {
  const location = useLocation();
  
  const dockItems = [
    { name: "Home", path: "/", icon: <Home className="w-6 h-6 text-white" /> },
    { name: "Chat", path: "/chat", icon: <MessageSquare className="w-6 h-6 text-white" /> },
    { name: "Plans", path: "/plans", icon: <ScrollText className="w-6 h-6 text-white" /> },
    { name: "Dietitians", path: "/dietitians", icon: <Users className="w-6 h-6 text-white" /> },
    { name: "About", path: "/about", icon: <Info className="w-6 h-6 text-white" /> },
    { name: "Contact", path: "/contact", icon: <Mail className="w-6 h-6 text-white" /> },
    { name: "Blog", path: "/blog", icon: <FileText className="w-6 h-6 text-white" /> }
  ];

  return (
    <div className="macos-dock">
      <div className="macos-dock-inner">
        {dockItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path}
            className={`macos-dock-item ${location.pathname === item.path ? 'scale-110' : ''}`}
            data-name={item.name}
          >
            <div className={`macos-dock-icon ${location.pathname === item.path ? 'ring-2 ring-white/30' : ''} flex items-center justify-center`}>
              {item.icon}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MacOSDock;
