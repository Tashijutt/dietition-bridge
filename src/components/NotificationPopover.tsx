import { useState, useEffect } from "react";
import { Bell, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface Notification {
  id: string;
  title: string;
  description: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

const userNotifications: Notification[] = [
  {
    id: "1",
    title: "Diet Plan Updated",
    description: "Your diet plan for this week has been updated.",
    type: "info",
    read: false,
    createdAt: "2024-06-01T10:00:00Z"
  },
  {
    id: "2",
    title: "Appointment Reminder",
    description: "You have an appointment with Dr. Ayesha tomorrow at 2:00 PM.",
    type: "success",
    read: false,
    createdAt: "2024-05-31T09:00:00Z"
  },
  {
    id: "3",
    title: "Message from Dietitian",
    description: "Dr. Imran sent you a new message.",
    type: "info",
    read: true,
    createdAt: "2024-05-30T15:30:00Z"
  }
];

const dietitianNotifications: Notification[] = [
  {
    id: "1",
    title: "New Consultation Request",
    description: "You have a new consultation request from John Doe.",
    type: "info",
    read: false,
    createdAt: "2024-06-01T11:00:00Z"
  },
  {
    id: "2",
    title: "Feedback Received",
    description: "You received feedback from a client.",
    type: "success",
    read: false,
    createdAt: "2024-05-31T10:00:00Z"
  }
];

const adminNotifications: Notification[] = [
  {
    id: "1",
    title: "New User Registered",
    description: "A new user has registered on the platform.",
    type: "info",
    read: false,
    createdAt: "2024-06-01T12:00:00Z"
  },
  {
    id: "2",
    title: "System Health Check",
    description: "All systems are operational.",
    type: "success",
    read: true,
    createdAt: "2024-05-31T08:00:00Z"
  }
];

export default function NotificationPopover() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      setTimeout(() => {
        let notifs: Notification[] = [];
        if (user?.role === "admin") {
          notifs = adminNotifications;
        } else if (user?.role === "dietitian") {
          notifs = dietitianNotifications;
        } else {
          notifs = userNotifications;
        }
        setNotifications(notifs);
        setLoading(false);
      }, 500);
    }
  }, [open, user]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="group relative p-0 h-auto w-auto rounded-full bg-white hover:bg-white focus:bg-white"
        >
          <Bell
            className="h-5 w-5 transition-colors duration-150 group-hover:text-green-600 text-gray-700"
          />
          {unreadCount > 0 && (
            <span className="absolute bottom-3 left-3 bg-secondary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="p-4 border-b font-semibold text-gray-700">Notifications</div>
        <div className="max-h-80 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="animate-spin h-6 w-6 text-gray-400" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-8 text-center text-gray-500">No notifications</div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                className={`flex items-start gap-3 px-4 py-3 border-b last:border-b-0 ${n.read ? "bg-white" : "bg-primary/5"}`}
              >
                <span>
                  {n.type === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : n.type === "error" ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <Bell className="h-5 w-5 text-blue-500" />
                  )}
                </span>
                <div className="flex-1">
                  <div className="font-medium">{n.title}</div>
                  <div className="text-sm text-gray-600">{n.description}</div>
                  <div className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString()}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}