
import { useEffect, useState } from "react";
import { BarChart, LineChart, PieChart } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDietitians: 0,
    totalPlans: 0,
    totalChats: 0
  });

  const [recentUsers, setRecentUsers] = useState<Array<{id: string, name: string, email: string, date: string}>>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll use mock data
    setStats({
      totalUsers: 253,
      totalDietitians: 18,
      totalPlans: 142,
      totalChats: 569
    });

    setRecentUsers([
      {id: "1", name: "Ayesha Khan", email: "ayesha@example.com", date: "2023-11-15"},
      {id: "2", name: "Muhammad Ali", email: "mali@example.com", date: "2023-11-14"},
      {id: "3", name: "Fatima Zahra", email: "fatima@example.com", date: "2023-11-14"},
      {id: "4", name: "Ahmed Raza", email: "ahmed@example.com", date: "2023-11-13"},
      {id: "5", name: "Saira Batool", email: "saira@example.com", date: "2023-11-12"}
    ]);
  }, []);

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout title="Dashboard">
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-blue-100 p-2">
                    <BarChart className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.totalUsers}</div>
                    <p className="text-xs text-gray-500">+12% from last month</p>
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
                  <div className="mr-4 rounded-full bg-green-100 p-2">
                    <LineChart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.totalDietitians}</div>
                    <p className="text-xs text-gray-500">+3 from last month</p>
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
                    <PieChart className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.totalPlans}</div>
                    <p className="text-xs text-gray-500">+28 from last month</p>
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
                    <BarChart className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.totalChats}</div>
                    <p className="text-xs text-gray-500">+105 from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Users who recently signed up for Dietitian Bridge</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Signed Up</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{new Date(user.date).toLocaleDateString("en-PK", { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
