
import { Link } from "react-router-dom";
import { Home, MessageSquare, ScrollText, Users, Info, Mail, FileText } from "lucide-react";

const MacOSDock = () => {
  const dockItems = [
    { name: "Home", path: "/", icon: <Home className="w-8 h-8 text-white" /> },
    { name: "Chat", path: "/chat", icon: <MessageSquare className="w-8 h-8 text-white" /> },
    { name: "Plans", path: "/plans", icon: <ScrollText className="w-8 h-8 text-white" /> },
    { name: "Dietitians", path: "/dietitians", icon: <Users className="w-8 h-8 text-white" /> },
    { name: "About", path: "/about", icon: <Info className="w-8 h-8 text-white" /> },
    { name: "Contact", path: "/contact", icon: <Mail className="w-8 h-8 text-white" /> },
    { name: "Blog", path: "/blog", icon: <FileText className="w-8 h-8 text-white" /> }
  ];

  return (
    <div className="macos-dock">
      <div className="macos-dock-inner">
        {dockItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path}
            className="macos-dock-item" 
            data-name={item.name}
          >
            <div className="macos-dock-icon flex items-center justify-center">
              {item.icon}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MacOSDock;
