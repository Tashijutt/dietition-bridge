
import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  lastLogin: string;
  status: "active" | "inactive" | "banned";
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll use mock data
    const mockUsers: User[] = [
      {
        id: "1",
        name: "Ayesha Khan",
        email: "ayesha@example.com",
        registrationDate: "2023-11-15",
        lastLogin: "2023-11-22",
        status: "active"
      },
      {
        id: "2",
        name: "Muhammad Ali",
        email: "mali@example.com",
        registrationDate: "2023-11-14",
        lastLogin: "2023-11-20",
        status: "active"
      },
      {
        id: "3",
        name: "Fatima Zahra",
        email: "fatima@example.com",
        registrationDate: "2023-11-14",
        lastLogin: "2023-11-18",
        status: "inactive"
      },
      {
        id: "4",
        name: "Ahmed Raza",
        email: "ahmed@example.com",
        registrationDate: "2023-11-13",
        lastLogin: "2023-11-15",
        status: "active"
      },
      {
        id: "5",
        name: "Saira Batool",
        email: "saira@example.com",
        registrationDate: "2023-11-12",
        lastLogin: "2023-11-12",
        status: "banned"
      }
    ];
    
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" ? true : user.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddUser = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The ability to add new users will be available soon.",
    });
  };

  const handleEditUser = (id: string) => {
    toast({
      title: "Edit User",
      description: `Editing user with ID: ${id}`,
    });
  };

  const handleDeleteUser = (id: string) => {
    toast({
      title: "Delete User",
      description: `Are you sure you want to delete this user?`,
      variant: "destructive",
    });
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    toast({
      title: `User ${newStatus === "active" ? "Activated" : "Deactivated"}`,
      description: `User has been ${newStatus === "active" ? "activated" : "deactivated"} successfully.`,
    });
  };

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout title="Manage Users">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0 pb-4">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage all users on the platform</CardDescription>
            </div>
            <Button onClick={handleAddUser} className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div>
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="banned">Banned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Registration</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div>{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </TableCell>
                        <TableCell>
                          {new Date(user.registrationDate).toLocaleDateString("en-PK", { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </TableCell>
                        <TableCell>
                          {new Date(user.lastLogin).toLocaleDateString("en-PK", { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "active"
                                ? "default"
                                : user.status === "inactive"
                                ? "outline"
                                : "secondary"
                            }
                            className={
                              user.status === "active"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : user.status === "inactive"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleStatus(user.id, user.status)}
                              className={user.status === "active" ? "text-red-600" : "text-green-600"}
                            >
                              {user.status === "active" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditUser(user.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminUsers;
