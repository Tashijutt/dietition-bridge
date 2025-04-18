
import { useState, useEffect } from "react";
import DietitianLayout from "@/components/dietitian/DietitianLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, Video, Phone, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock appointments data
const mockAppointments = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    patientImage: "",
    patientInitials: "SJ",
    dateTime: new Date("2025-04-15T10:00:00"),
    duration: 30, // minutes
    status: "upcoming", // upcoming, completed, cancelled
    type: "video", // video, phone, in-person
    notes: "Initial consultation to discuss diet plan for diabetes management"
  },
  {
    id: 2,
    patientName: "Michael Brown",
    patientImage: "",
    patientInitials: "MB",
    dateTime: new Date("2025-04-14T14:30:00"),
    duration: 45, // minutes
    status: "upcoming",
    type: "in-person",
    notes: "Follow-up appointment to check progress on weight loss plan"
  },
  {
    id: 3,
    patientName: "Emily Davis",
    patientImage: "",
    patientInitials: "ED",
    dateTime: new Date("2025-04-10T11:00:00"),
    duration: 30, // minutes
    status: "completed",
    type: "video",
    notes: "Discussed vegetarian meal plans and nutritional supplements"
  },
  {
    id: 4,
    patientName: "James Wilson",
    patientImage: "",
    patientInitials: "JW",
    dateTime: new Date("2025-04-08T09:15:00"),
    duration: 20, // minutes
    status: "cancelled",
    type: "phone",
    notes: "Quick check-in for meal plan adjustments"
  }
];

const DietitianAppointments = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Filter appointments by status
  const upcomingAppointments = appointments.filter(app => app.status === "upcoming");
  const completedAppointments = appointments.filter(app => app.status === "completed");
  const cancelledAppointments = appointments.filter(app => app.status === "cancelled");

  // Get appointment type icon
  const getAppointmentTypeIcon = (type: string) => {
    switch(type) {
      case "video": return <Video className="h-4 w-4 text-blue-600" />;
      case "phone": return <Phone className="h-4 w-4 text-green-600" />;
      case "in-person": return <MessageSquare className="h-4 w-4 text-purple-600" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "upcoming": 
        return <Badge variant="secondary" className="bg-blue-50 text-blue-700">Upcoming</Badge>;
      case "completed": 
        return <Badge variant="secondary" className="bg-green-50 text-green-700">Completed</Badge>;
      case "cancelled": 
        return <Badge variant="secondary" className="bg-red-50 text-red-700">Cancelled</Badge>;
      default: 
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <DietitianLayout title="Appointments">
      <div className={`space-y-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* Appointments list */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming
              {upcomingAppointments.length > 0 && (
                <span className="ml-2 bg-blue-100 text-blue-700 text-xs rounded-full px-2 py-0.5">
                  {upcomingAppointments.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-4 space-y-4">
            {upcomingAppointments.map(appointment => (
              <Card key={appointment.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 flex items-start">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={appointment.patientImage} alt={appointment.patientName} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {appointment.patientInitials}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className="font-medium">{appointment.patientName}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <time dateTime={appointment.dateTime.toISOString()}>
                            {format(appointment.dateTime, "EEE, MMM d, yyyy • h:mm a")}
                          </time>
                          <span className="mx-1">•</span>
                          <span>{appointment.duration} minutes</span>
                        </div>
                        
                        <div className="flex items-center mt-2 gap-2">
                          <div className="flex items-center gap-1 bg-gray-50 rounded px-2 py-1">
                            {getAppointmentTypeIcon(appointment.type)}
                            <span className="text-xs font-medium capitalize">{appointment.type}</span>
                          </div>
                          {getStatusBadge(appointment.status)}
                        </div>
                        
                        {appointment.notes && (
                          <p className="text-sm text-gray-600 mt-2">{appointment.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {upcomingAppointments.length === 0 && (
              <div className="text-center py-12">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No upcoming appointments</h3>
                <p className="mt-1 text-gray-500">You have no upcoming appointments scheduled.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4 space-y-4">
            {completedAppointments.map(appointment => (
              <Card key={appointment.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 flex items-start">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={appointment.patientImage} alt={appointment.patientName} />
                        <AvatarFallback className="bg-green-100 text-green-600">
                          {appointment.patientInitials}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className="font-medium">{appointment.patientName}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <time dateTime={appointment.dateTime.toISOString()}>
                            {format(appointment.dateTime, "EEE, MMM d, yyyy • h:mm a")}
                          </time>
                          <span className="mx-1">•</span>
                          <span>{appointment.duration} minutes</span>
                        </div>
                        
                        <div className="flex items-center mt-2 gap-2">
                          <div className="flex items-center gap-1 bg-gray-50 rounded px-2 py-1">
                            {getAppointmentTypeIcon(appointment.type)}
                            <span className="text-xs font-medium capitalize">{appointment.type}</span>
                          </div>
                          {getStatusBadge(appointment.status)}
                        </div>
                        
                        {appointment.notes && (
                          <p className="text-sm text-gray-600 mt-2">{appointment.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {completedAppointments.length === 0 && (
              <div className="text-center py-12">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No completed appointments</h3>
                <p className="mt-1 text-gray-500">You have no completed appointments yet.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="cancelled" className="mt-4 space-y-4">
            {cancelledAppointments.map(appointment => (
              <Card key={appointment.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 flex items-start">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={appointment.patientImage} alt={appointment.patientName} />
                        <AvatarFallback className="bg-red-100 text-red-600">
                          {appointment.patientInitials}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className="font-medium">{appointment.patientName}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <time dateTime={appointment.dateTime.toISOString()}>
                            {format(appointment.dateTime, "EEE, MMM d, yyyy • h:mm a")}
                          </time>
                          <span className="mx-1">•</span>
                          <span>{appointment.duration} minutes</span>
                        </div>
                        
                        <div className="flex items-center mt-2 gap-2">
                          <div className="flex items-center gap-1 bg-gray-50 rounded px-2 py-1">
                            {getAppointmentTypeIcon(appointment.type)}
                            <span className="text-xs font-medium capitalize">{appointment.type}</span>
                          </div>
                          {getStatusBadge(appointment.status)}
                        </div>
                        
                        {appointment.notes && (
                          <p className="text-sm text-gray-600 mt-2">{appointment.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {cancelledAppointments.length === 0 && (
              <div className="text-center py-12">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No cancelled appointments</h3>
                <p className="mt-1 text-gray-500">You have no cancelled appointments.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DietitianLayout>
  );
};

export default DietitianAppointments;
