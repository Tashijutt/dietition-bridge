
import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, ScrollText, Users, Info, Mail, FileText } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const MacOSDock = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);
  
  // Add mount animation effect
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track mouse position for magnification effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dockRef.current) return;
      
      const dock = dockRef.current;
      const dockRect = dock.getBoundingClientRect();
      
      // Only apply effect when mouse is near the dock (bottom 150px of screen)
      if (e.clientY > window.innerHeight - 150) {
        const items = dock.querySelectorAll('.macos-dock-item');
        
        items.forEach((item) => {
          const itemEl = item as HTMLElement;
          const itemRect = itemEl.getBoundingClientRect();
          
          // Calculate distance from mouse to item center
          const itemCenterX = itemRect.left + itemRect.width / 2;
          const distanceX = Math.abs(e.clientX - itemCenterX);
          
          // Apply scale based on distance (more extreme magnification for MacBook Pro look)
          if (distanceX < 120) {
            const scale = 1 + (120 - distanceX) / 100 * 0.8; // Max scale 1.8x
            itemEl.style.transform = `scale(${scale})`;
            if (scale > 1.2) {
              itemEl.style.transform = `scale(${scale}) translateY(-${(scale-1)*15}px)`;
            }
          } else {
            itemEl.style.transform = '';
          }
        });
      } else {
        // Reset scales when mouse is far from dock
        dock.querySelectorAll('.macos-dock-item').forEach((item) => {
          const itemEl = item as HTMLElement;
          itemEl.style.transform = '';
        });
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Dock items with blue and orange theme colors
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
      <div ref={dockRef} className="macos-dock-inner">
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
                {isActive && <span className="absolute bottom-1.5 w-1.5 h-1.5 bg-white rounded-full"></span>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MacOSDock;
