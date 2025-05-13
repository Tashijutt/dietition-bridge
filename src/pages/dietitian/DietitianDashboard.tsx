
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import DietitianLayout from "@/components/dietitian/DietitianLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, UserCheck, Clock, Activity, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BMICalculator from "@/components/BMICalculator";
import ProtectedRoute from "@/components/ProtectedRoute";

// Mock upcoming appointments
const upcomingAppointments = [
  { id: 1, patient: "Ayesha Khan", time: "10:00 AM", date: "2024-04-15", status: "confirmed" },
  { id: 2, patient: "Muhammad Ali", time: "2:30 PM", date: "2024-04-15", status: "confirmed" },
  { id: 3, patient: "Fatima Zahra", time: "11:15 AM", date: "2024-04-16", status: "pending" }
];

// Mock recent patients
const recentPatients = [
  { 
    id: "1", 
    name: "Ayesha Khan", 
    condition: "Weight Loss",
    progress: "Good",
    lastSession: "2024-04-08"
  },
  { 
    id: "2", 
    name: "Muhammad Ali", 
    condition: "Diabetes",
    progress: "Excellent",
    lastSession: "2024-04-10" 
  },
  { 
    id: "3", 
    name: "Fatima Zahra", 
    condition: "Hypertension",
    progress: "Needs Attention",
    lastSession: "2024-04-02" 
  }
];

const DietitianDashboard = () => {
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ProtectedRoute>
      <DietitianLayout title="Dietitian Dashboard">
        <div className="space-y-6">
          {/* Welcome Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold">
                Welcome back, Dr. {user?.name}
              </CardTitle>
              <CardDescription>
                Here's what's happening with your patients today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-4">
                  <div className="rounded-full bg-blue-100 p-2">
                    <UserCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">24</h3>
                    <p className="text-sm text-gray-600">Total Patients</p>
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg flex items-start space-x-4">
                  <div className="rounded-full bg-orange-100 p-2">
                    <Calendar className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-orange-800">3</h3>
                    <p className="text-sm text-gray-600">Appointments Today</p>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg flex items-start space-x-4">
                  <div className="rounded-full bg-green-100 p-2">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">12</h3>
                    <p className="text-sm text-gray-600">Active Diet Plans</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Appointments</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dietitian/appointments" className="text-blue-600 flex items-center">
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-blue-100 p-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{appointment.patient}</h4>
                        <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                      </div>
                    </div>
                    <div>
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                        appointment.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}

                {upcomingAppointments.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    No upcoming appointments scheduled.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Patients */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Patients</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dietitian/patients" className="text-blue-600 flex items-center">
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 border-b">
                      <th className="px-3 py-3">Patient</th>
                      <th className="px-3 py-3">Condition</th>
                      <th className="px-3 py-3">Progress</th>
                      <th className="px-3 py-3">Last Session</th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-3 py-3 font-medium">{patient.name}</td>
                        <td className="px-3 py-3 text-sm text-gray-600">{patient.condition}</td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            patient.progress === "Excellent" ? "bg-green-100 text-green-800" : 
                            patient.progress === "Good" ? "bg-blue-100 text-blue-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            <Activity className="mr-1 h-3 w-3" />
                            {patient.progress}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-600">{patient.lastSession}</td>
                        <td className="px-3 py-3 text-right">
                          <Button variant="ghost" size="sm" className="text-blue-600">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {recentPatients.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    No patient data available.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DietitianLayout>
    </ProtectedRoute>
  );
};

export default DietitianDashboard;
