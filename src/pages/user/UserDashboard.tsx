
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ChevronRight, Activity, Heart, Salad, MessageSquare, UserCheck, LineChart, Calendar } from "lucide-react";
import UserLayout from "@/components/user/UserLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import BMICalculator from "@/components/BMICalculator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const apiUrl = import.meta.env.VITE_API_URL;

interface Plan {
  id: string;
  title: string;
  date: string;
  type: string;
  completionRate?: number;
}

interface Dietitian {
  id: string;
  name: string;
  specialization: string;
  profileImage?: string;
  rating: number;
}

interface HealthMetric {
  name: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  change?: {
    type: "increase" | "decrease";
    value: number;
  };
}

const UserDashboard = () => {
  const { user } = useAuth();
  const [recentPlans, setRecentPlans] = useState<Plan[]>([]);
  const [recentDietitians, setRecentDietitians] = useState<Dietitian[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [upcomingAppointment, setUpcomingAppointment] = useState<Date | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll use mock data
    setRecentPlans([
      {
        id: "1", 
        title: "7-Day Weight Loss Plan", 
        date: "2023-11-20", 
        type: "weight-loss",
        completionRate: 75
      },
      {
        id: "2", 
        title: "Diabetes Management Diet", 
        date: "2023-11-15", 
        type: "diabetes",
        completionRate: 40
      }
    ]);

    setRecentDietitians([
      {
        id: "1", 
        name: "Dr. Ayesha Ahmed", 
        specialization: "Diabetes Management",
        profileImage: "https://randomuser.me/api/portraits/women/28.jpg",
        rating: 4.8
      },
      {
        id: "2", 
        name: "Dr. Fatima Khan", 
        specialization: "Weight Management",
        profileImage: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 4.6
      }
    ]);

    setHealthMetrics([
      {
        name: "Current Weight",
        value: 65.5,
        unit: "kg",
        icon: <Activity className="h-5 w-5 text-blue-600" />,
        change: {
          type: "decrease",
          value: 0.8
        }
      },
      {
        name: "BMI",
        value: 22.3,
        unit: "",
        icon: <LineChart className="h-5 w-5 text-green-600" />,
        change: {
          type: "decrease",
          value: 0.2
        }
      },
      {
        name: "Calories",
        value: 1850,
        unit: "kcal/day",
        icon: <Heart className="h-5 w-5 text-red-600" />,
        change: {
          type: "decrease",
          value: 120
        }
      }
    ]);

    // Set an upcoming appointment for 3 days from now
    const appointmentDate = new Date();
    appointmentDate.setDate(appointmentDate.getDate() + 3);
    appointmentDate.setHours(14, 30, 0, 0); // Set to 2:30 PM
    setUpcomingAppointment(appointmentDate);
  }, []);

  const handlePlanSaved = (planId: string) => {
    // Refresh plans list or show notification
    // For now, we'll just add a dummy plan to the list
    const newPlan: Plan = {
      id: planId,
      title: "New Diet Plan",
      date: new Date().toISOString().split('T')[0],
      type: "custom",
      completionRate: 0
    };
    
    setRecentPlans(prev => [newPlan, ...prev]);
  };

  return (
    <ProtectedRoute>
      <UserLayout title={`Welcome back, ${user?.name?.split(' ')[0] || 'User'}`}>
        <div className="space-y-6">
          {/* User Overview */}
          <Card className="bg-gradient-to-r from-nutrition-50 to-blue-50 border-none">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="h-20 w-20 border-4 border-white">
                  <AvatarImage src={`${apiUrl}/${user?.profilePicture}`} />
                  <AvatarFallback className="bg-nutrition-100 text-nutrition-800 text-xl">
                    {user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-blue-50">
                      Regular Checkups
                    </Badge>
                    <Badge variant="outline" className="bg-green-50">
                      Active Plans: 2
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <Button variant="outline" asChild className="mr-2">
                    <Link to="/dashboard/profile">Edit Profile</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/chat">New Consultation</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Health Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Health Dashboard
              </CardTitle>
              <CardDescription>Track your health metrics and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {healthMetrics.map((metric, idx) => (
                  <Card key={idx} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium text-gray-500">{metric.name}</div>
                        <div className="p-2 rounded-full bg-gray-100">
                          {metric.icon}
                        </div>
                      </div>
                      <div className="flex items-end gap-2 mb-1">
                        <div className="text-2xl font-bold">{metric.value}</div>
                        {metric.unit && <div className="text-gray-500 mb-0.5">{metric.unit}</div>}
                      </div>
                      {metric.change && (
                        <div className={`text-sm ${
                          metric.change.type === "decrease" ? "text-green-600" : "text-red-600"
                        }`}>
                          {metric.change.type === "decrease" ? "↓" : "↑"} {metric.change.value} from last week
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* BMI Calculator Button */}
              <div className="mt-6 flex justify-center">
                {user && <BMICalculator userId={user.id} onPlanSaved={handlePlanSaved} />}
              </div>
            </CardContent>
          </Card>
          
          {/* Active Plans */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Salad className="h-5 w-5 text-nutrition-600" />
                  My Active Plans
                </CardTitle>
                <CardDescription>Your current nutrition and diet plans</CardDescription>
              </div>
              <Link to="/dashboard/plans" className="text-sm text-nutrition-600 hover:text-nutrition-700 font-medium">
                View All Plans
              </Link>
            </CardHeader>
            <CardContent>
              {recentPlans.length === 0 ? (
                <div className="text-center py-6 border rounded-lg bg-gray-50">
                  <p className="text-gray-500">No diet plans found</p>
                  <Link to="/chat" className="text-sm text-nutrition-600 hover:text-nutrition-700 font-medium mt-2 inline-block">
                    Create a plan with AI
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentPlans.map(plan => (
                    <div key={plan.id} className="flex flex-col space-y-4 p-4 border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex justify-between">
                        <div>
                          <Link to={`/dashboard/plans/${plan.id}`} className="font-medium text-lg hover:text-nutrition-600">
                            {plan.title}
                          </Link>
                          <div className="text-sm text-gray-500 flex gap-2 items-center mt-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(plan.date).toLocaleDateString("en-PK", {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                        <div>
                          <Badge
                            className={`px-2 py-1 ${
                              plan.type === 'weight-loss'
                                ? 'bg-green-100 text-green-800'
                                : plan.type === 'diabetes'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {plan.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </Badge>
                        </div>
                      </div>
                      
                      {plan.completionRate !== undefined && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{plan.completionRate}%</span>
                          </div>
                          <Progress value={plan.completionRate} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center pt-2">
                        <Link to={`/dashboard/plans/${plan.id}`} className="text-sm text-nutrition-600 hover:text-nutrition-700 font-medium">
                          View Details
                        </Link>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/chat">Update Plan</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Next Appointment */}
          {upcomingAppointment && (
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="font-medium text-blue-800 flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Appointment
                    </h3>
                    <p className="text-blue-700 text-xl font-bold mt-1">
                      {upcomingAppointment.toLocaleDateString("en-PK", {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                      {" "}at{" "}
                      {upcomingAppointment.toLocaleTimeString("en-PK", {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <p className="text-blue-600 mt-1">
                      Video consultation with Dr. Ayesha Ahmed
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-blue-200 bg-white text-blue-700">
                      Reschedule
                    </Button>
                    <Button className="bg-blue-700 hover:bg-blue-800">
                      Join Meeting
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* My Dietitians */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-nutrition-600" />
                  My Dietitians
                </CardTitle>
                <CardDescription>Nutritionists you've connected with</CardDescription>
              </div>
              <Link to="/dashboard/dietitians" className="text-sm text-nutrition-600 hover:text-nutrition-700 font-medium">
                View All
              </Link>
            </CardHeader>
            <CardContent>
              {recentDietitians.length === 0 ? (
                <div className="text-center py-6 border rounded-lg bg-gray-50">
                  <p className="text-gray-500">No dietitians found</p>
                  <Link to="/dietitians" className="text-sm text-nutrition-600 hover:text-nutrition-700 font-medium mt-2 inline-block">
                    Find dietitians
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentDietitians.map(dietitian => (
                    <div key={dietitian.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={dietitian.profileImage} />
                          <AvatarFallback className="bg-blue-100 text-blue-800">
                            {dietitian.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{dietitian.name}</h3>
                          <p className="text-sm text-gray-500">{dietitian.specialization}</p>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-xs ${i < Math.floor(dietitian.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-xs ml-1 text-gray-600">{dietitian.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Shortcuts to common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link to="/chat" className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <MessageSquare className="h-8 w-8 text-nutrition-600 mb-2" />
                  <span className="text-sm font-medium text-center">Chat with AI Nutritionist</span>
                </Link>
                
                <Link to="/dashboard/plans" className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Salad className="h-8 w-8 text-nutrition-600 mb-2" />
                  <span className="text-sm font-medium text-center">My Diet Plans</span>
                </Link>
                
                <Link to="/dashboard/dietitians" className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <UserCheck className="h-8 w-8 text-nutrition-600 mb-2" />
                  <span className="text-sm font-medium text-center">Find Dietitians</span>
                </Link>
                
                <Link to="/dashboard/profile" className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Activity className="h-8 w-8 text-nutrition-600 mb-2" />
                  <span className="text-sm font-medium text-center">Health Tracker</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </UserLayout>
    </ProtectedRoute>
  );
};

export default UserDashboard;
