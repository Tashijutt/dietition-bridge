
import { useEffect, useState } from "react";
import { BarChart, LineChart, PieChart, Users, UserCheck, CalendarCheck, Activity, TrendingUp, FileText } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardStats {
  totalUsers: number;
  totalDietitians: number;
  totalPlans: number;
  totalChats: number;
  activeUsers: number;
  userGrowth: number;
}

interface RecentUser {
  id: string;
  name: string;
  email: string;
  date: string;
  role: string;
  profileImage?: string;
}

interface RecentActivity {
  id: string;
  type: "signup" | "login" | "plan_created" | "chat" | "dietitian_registration";
  userName: string;
  userId: string;
  timestamp: string;
  details: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalDietitians: 0,
    totalPlans: 0,
    totalChats: 0,
    activeUsers: 0,
    userGrowth: 0
  });

  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll use mock data
    setStats({
      totalUsers: 253,
      totalDietitians: 18,
      totalPlans: 142,
      totalChats: 569,
      activeUsers: 185,
      userGrowth: 12
    });

    setRecentUsers([
      {id: "1", name: "Ayesha Khan", email: "ayesha@example.com", date: "2023-11-15", role: "user", profileImage: "https://randomuser.me/api/portraits/women/44.jpg"},
      {id: "2", name: "Muhammad Ali", email: "mali@example.com", date: "2023-11-14", role: "user"},
      {id: "3", name: "Fatima Zahra", email: "fatima@example.com", date: "2023-11-14", role: "user"},
      {id: "4", name: "Ahmed Raza", email: "ahmed@example.com", date: "2023-11-13", role: "dietitian", profileImage: "https://randomuser.me/api/portraits/men/22.jpg"},
      {id: "5", name: "Saira Batool", email: "saira@example.com", date: "2023-11-12", role: "user"}
    ]);

    setRecentActivity([
      {
        id: "act1",
        type: "signup",
        userName: "Ayesha Khan",
        userId: "1",
        timestamp: "2023-11-15T10:30:00",
        details: "New user signed up"
      },
      {
        id: "act2",
        type: "dietitian_registration",
        userName: "Dr. Nadia Hussain",
        userId: "6",
        timestamp: "2023-11-14T14:45:00",
        details: "New dietitian registered"
      },
      {
        id: "act3",
        type: "plan_created",
        userName: "Muhammad Ali",
        userId: "2",
        timestamp: "2023-11-14T09:15:00",
        details: "Created '7-Day Weight Loss Plan'"
      },
      {
        id: "act4",
        type: "chat",
        userName: "Fatima Zahra",
        userId: "3",
        timestamp: "2023-11-14T11:20:00",
        details: "Started a new chat session"
      },
      {
        id: "act5",
        type: "login",
        userName: "Ahmed Raza",
        userId: "4",
        timestamp: "2023-11-13T16:05:00",
        details: "Logged in after 7 days"
      }
    ]);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'signup':
        return <Users className="h-4 w-4 text-green-600" />;
      case 'login':
        return <UserCheck className="h-4 w-4 text-blue-600" />;
      case 'plan_created':
        return <FileText className="h-4 w-4 text-purple-600" />;
      case 'chat':
        return <Activity className="h-4 w-4 text-yellow-600" />;
      case 'dietitian_registration':
        return <TrendingUp className="h-4 w-4 text-red-600" />;
      default:
        return <CalendarCheck className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout title="Admin Dashboard">
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{stats.totalUsers}</div>
                    <p className="text-xs text-gray-500">+{stats.userGrowth}% from last month</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Link to="/admin/users" className="text-sm text-blue-600 hover:underline">
                  View all users
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-green-100 p-3">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{stats.activeUsers}</div>
                    <p className="text-xs text-gray-500">{Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total users</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-green-600 h-1.5 rounded-full" 
                    style={{ width: `${(stats.activeUsers / stats.totalUsers) * 100}%` }}
                  ></div>
                </div>
              </CardFooter>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Dietitians</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-purple-100 p-3">
                    <LineChart className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{stats.totalDietitians}</div>
                    <p className="text-xs text-gray-500">+3 from last month</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Link to="/admin/dietitians" className="text-sm text-purple-600 hover:underline">
                  View all dietitians
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Diet Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-yellow-100 p-3">
                    <PieChart className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{stats.totalPlans}</div>
                    <p className="text-xs text-gray-500">+28 from last month</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Link to="/admin/plans" className="text-sm text-yellow-600 hover:underline">
                  View all plans
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">AI Chat Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-orange-100 p-3">
                    <Activity className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{stats.totalChats}</div>
                    <p className="text-xs text-gray-500">+105 from last month</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Link to="/admin/chats" className="text-sm text-orange-600 hover:underline">
                  View chat logs
                </Link>
              </CardFooter>
            </Card>
          </div>
          
          {/* User Activity Tabs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
              <CardDescription>Latest user actions and platform activity</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="users" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="users">New Users</TabsTrigger>
                  <TabsTrigger value="activity">Platform Activity</TabsTrigger>
                </TabsList>
                
                <TabsContent value="users" className="pt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Signed Up</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsers.map(user => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.profileImage} />
                                <AvatarFallback className="bg-nutrition-100 text-nutrition-800">
                                  {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                user.role === "admin"
                                  ? "bg-purple-100 text-purple-800"
                                  : user.role === "dietitian"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }
                            >
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(user.date).toLocaleDateString("en-PK", { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <Link to={`/admin/users?id=${user.id}`}>View</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="activity" className="pt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Activity</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead className="text-right">Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentActivity.map(activity => (
                        <TableRow key={activity.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getActivityIcon(activity.type)}
                              <span className="capitalize">{activity.type.replace('_', ' ')}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{activity.userName}</TableCell>
                          <TableCell>{new Date(activity.timestamp).toLocaleString("en-PK", { 
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                          })}</TableCell>
                          <TableCell className="text-right">{activity.details}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Admin Actions</CardTitle>
              <CardDescription>Quick links to common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Link to="/admin/users" className="block">
                  <div className="border rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
                    <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-medium">Manage Users</h3>
                  </div>
                </Link>
                
                <Link to="/admin/dietitians" className="block">
                  <div className="border rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
                    <UserCheck className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-medium">Manage Dietitians</h3>
                  </div>
                </Link>
                
                <Link to="/admin/plans" className="block">
                  <div className="border rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                    <h3 className="font-medium">Manage Plans</h3>
                  </div>
                </Link>
                
                <Link to="/admin/chats" className="block">
                  <div className="border rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
                    <Activity className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                    <h3 className="font-medium">View Chat Logs</h3>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
