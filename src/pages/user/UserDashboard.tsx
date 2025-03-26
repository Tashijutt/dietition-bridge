
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ChevronRight, Activity, UserCheck, FileText, MessageSquare } from "lucide-react";
import UserLayout from "@/components/user/UserLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserDashboard = () => {
  const { user } = useAuth();
  const [recentPlans, setRecentPlans] = useState<Array<{id: string, title: string, date: string, type: string}>>([]);
  const [recentDietitians, setRecentDietitians] = useState<Array<{id: string, name: string, specialization: string}>>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll use mock data
    setRecentPlans([
      {id: "1", title: "7-Day Weight Loss Plan", date: "2023-11-20", type: "weight-loss"},
      {id: "2", title: "Diabetes Management Diet", date: "2023-11-15", type: "diabetes"}
    ]);

    setRecentDietitians([
      {id: "1", name: "Dr. Ayesha Ahmed", specialization: "Diabetes Management"},
      {id: "2", name: "Dr. Fatima Khan", specialization: "Weight Management"}
    ]);
  }, []);

  return (
    <ProtectedRoute>
      <UserLayout title={`Welcome, ${user?.name?.split(' ')[0] || 'User'}`}>
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Health Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 p-2">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">Good</div>
                    <p className="text-xs text-gray-500">Based on your recent inputs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Dietitians</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-2">
                    <UserCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-gray-500">Saved dietitians</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Diet Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-yellow-100 p-2">
                    <FileText className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-gray-500">Saved plans</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">AI Chat Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-purple-100 p-2">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-gray-500">Total consultations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Shortcuts to common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/chat" className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <h3 className="font-medium">Chat with AI</h3>
                    <p className="text-sm text-gray-500">Get nutrition advice</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
                
                <Link to="/dashboard/plans" className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <h3 className="font-medium">My Diet Plans</h3>
                    <p className="text-sm text-gray-500">View saved plans</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
                
                <Link to="/dashboard/dietitians" className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <h3 className="font-medium">Find Dietitians</h3>
                    <p className="text-sm text-gray-500">Connect with experts</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Diet Plans */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Recent Diet Plans</CardTitle>
                <CardDescription>Your most recent diet plans</CardDescription>
              </div>
              <Link to="/dashboard/plans" className="text-sm text-nutrition-600 hover:text-nutrition-700 font-medium">
                View All
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
                    <div key={plan.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{plan.title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(plan.date).toLocaleDateString("en-PK", {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          plan.type === 'weight-loss'
                            ? 'bg-green-100 text-green-800'
                            : plan.type === 'diabetes'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {plan.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* My Dietitians */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>My Dietitians</CardTitle>
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
                <div className="space-y-4">
                  {recentDietitians.map(dietitian => (
                    <div key={dietitian.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{dietitian.name}</h3>
                        <p className="text-sm text-gray-500">{dietitian.specialization}</p>
                      </div>
                      <Link to="/dashboard/dietitians" className="text-sm text-nutrition-600 hover:text-nutrition-700 font-medium">
                        Contact
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </UserLayout>
    </ProtectedRoute>
  );
};

export default UserDashboard;
