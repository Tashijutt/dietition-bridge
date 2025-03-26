
import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, Check, X, UserCog, Mail, Phone, Calendar } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface User {
  id: string;
  name: string;
  email: string;
  registrationDate: string;
  lastLogin: string;
  status: "active" | "inactive" | "banned";
  role: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  profileImage?: string;
  healthConditions?: string[];
  dietaryPreferences?: string[];
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<User>>({});

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
        status: "active",
        role: "user",
        phone: "+92 300 1234567",
        address: "123 Main St, Islamabad",
        dateOfBirth: "1990-05-15",
        healthConditions: ["Diabetes"],
        dietaryPreferences: ["Vegetarian"]
      },
      {
        id: "2",
        name: "Muhammad Ali",
        email: "mali@example.com",
        registrationDate: "2023-11-14",
        lastLogin: "2023-11-20",
        status: "active",
        role: "user",
        phone: "+92 321 1234567",
        address: "456 Oak St, Lahore",
        dateOfBirth: "1985-08-20",
        healthConditions: ["Hypertension"],
        dietaryPreferences: ["Low-sodium"]
      },
      {
        id: "3",
        name: "Fatima Zahra",
        email: "fatima@example.com",
        registrationDate: "2023-11-14",
        lastLogin: "2023-11-18",
        status: "inactive",
        role: "user",
        phone: "+92 333 1234567",
        address: "789 Pine St, Karachi",
        dateOfBirth: "1992-03-10"
      },
      {
        id: "4",
        name: "Ahmed Raza",
        email: "ahmed@example.com",
        registrationDate: "2023-11-13",
        lastLogin: "2023-11-15",
        status: "active",
        role: "dietitian",
        phone: "+92 345 1234567",
        address: "101 Elm St, Faisalabad",
        dateOfBirth: "1980-11-25",
        profileImage: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      {
        id: "5",
        name: "Saira Batool",
        email: "saira@example.com",
        registrationDate: "2023-11-12",
        lastLogin: "2023-11-12",
        status: "banned",
        role: "user",
        phone: "+92 312 1234567",
        address: "202 Maple St, Peshawar",
        dateOfBirth: "1995-07-02"
      },
      {
        id: "admin1",
        name: "Admin User",
        email: "admin@dietitianbridge.com",
        registrationDate: "2023-10-01",
        lastLogin: "2023-11-23",
        status: "active",
        role: "admin",
        phone: "+92 300 9876543",
        address: "Admin Office, Islamabad",
        dateOfBirth: "1985-01-15"
      },
      {
        id: "dietitian1",
        name: "Dr. Ayesha Ahmed",
        email: "dietitian@example.com",
        registrationDate: "2023-10-10",
        lastLogin: "2023-11-21",
        status: "active",
        role: "dietitian",
        phone: "+92 321 9876543",
        address: "Nutrition Clinic, Lahore",
        dateOfBirth: "1978-06-22",
        profileImage: "https://randomuser.me/api/portraits/women/28.jpg"
      }
    ];
    
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" ? true : user.status === filterStatus;
    const matchesRole = filterRole === "all" ? true : user.role === filterRole;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleAddUser = () => {
    // Set up a blank form for a new user
    setEditFormData({
      name: "",
      email: "",
      role: "user",
      status: "active",
      phone: "",
      address: "",
      dateOfBirth: "",
    });
    setSelectedUser(null); // No selected user for new user creation
    setIsEditDialogOpen(true);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditFormData({ ...user });
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (selectedUser) {
      // In a real app, this would be an API call
      setUsers(users.filter(u => u.id !== selectedUser.id));
      toast({
        title: "User Deleted",
        description: `${selectedUser.name} has been deleted successfully.`,
      });
    }
    setIsDeleteDialogOpen(false);
  };

  const handleToggleStatus = (user: User) => {
    // In a real app, this would be an API call
    const newStatus = user.status === "active" ? "inactive" : "active";
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, status: newStatus } : u
    );
    setUsers(updatedUsers);
    
    toast({
      title: `User ${newStatus === "active" ? "Activated" : "Deactivated"}`,
      description: `${user.name} has been ${newStatus === "active" ? "activated" : "deactivated"} successfully.`,
    });
  };

  const handleEditFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setEditFormData(prev => ({ ...prev, role: value }));
  };

  const handleStatusChange = (value: string) => {
    setEditFormData(prev => ({ ...prev, status: value as "active" | "inactive" | "banned" }));
  };

  const handleSaveUser = () => {
    // Validate required fields
    if (!editFormData.name || !editFormData.email || !editFormData.role) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (selectedUser) {
      // Update existing user
      const updatedUsers = users.map(u => 
        u.id === selectedUser.id ? { ...u, ...editFormData } as User : u
      );
      setUsers(updatedUsers);
      toast({
        title: "User Updated",
        description: `${editFormData.name} has been updated successfully.`,
      });
    } else {
      // Create new user with a generated ID
      const newUser = {
        ...editFormData,
        id: `user${Date.now()}`,
        registrationDate: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString().split('T')[0],
      } as User;
      
      setUsers([...users, newUser]);
      toast({
        title: "User Created",
        description: `${newUser.name} has been created successfully.`,
      });
    }
    
    setIsEditDialogOpen(false);
  };

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout title="Manage Users">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0 pb-4">
            <div>
              <CardTitle className="text-2xl">Users Management</CardTitle>
              <CardDescription>Manage all users on the platform, including regular users, dietitians, and admins</CardDescription>
            </div>
            <Button onClick={handleAddUser} className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid gap-4 md:grid-cols-3">
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
              <div>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="user">Users</SelectItem>
                    <SelectItem value="dietitian">Dietitians</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Registration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={user.profileImage} />
                              <AvatarFallback className="bg-nutrition-100 text-nutrition-800">
                                {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {user.phone || "-"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                                : user.role === "dietitian"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                : "bg-green-100 text-green-800 hover:bg-green-100"
                            }
                          >
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.registrationDate).toLocaleDateString("en-PK", { 
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
                              onClick={() => handleViewUser(user)}
                              className="text-blue-600"
                            >
                              <UserCog className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleStatus(user)}
                              className={user.status === "active" ? "text-red-600" : "text-green-600"}
                            >
                              {user.status === "active" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteUser(user)}
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

        {/* View User Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>View User Details</DialogTitle>
              <DialogDescription>
                Complete information about {selectedUser?.name}
              </DialogDescription>
            </DialogHeader>
            
            {selectedUser && (
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="health">Health Info</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={selectedUser.profileImage} />
                      <AvatarFallback className="bg-nutrition-100 text-nutrition-800 text-xl">
                        {selectedUser.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{selectedUser.email}</span>
                      </div>
                      {selectedUser.phone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{selectedUser.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-500">Role</Label>
                      <div className="font-medium mt-1">
                        <Badge
                          variant="outline"
                          className={
                            selectedUser.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : selectedUser.role === "dietitian"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }
                        >
                          {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-gray-500">Status</Label>
                      <div className="font-medium mt-1">
                        <Badge
                          variant={
                            selectedUser.status === "active"
                              ? "default"
                              : selectedUser.status === "inactive"
                              ? "outline"
                              : "secondary"
                          }
                          className={
                            selectedUser.status === "active"
                              ? "bg-green-100 text-green-800"
                              : selectedUser.status === "inactive"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-gray-500">Date of Birth</Label>
                      <div className="font-medium mt-1">
                        {selectedUser.dateOfBirth ? (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            {new Date(selectedUser.dateOfBirth).toLocaleDateString("en-PK", {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        ) : (
                          "Not provided"
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-gray-500">Address</Label>
                      <div className="font-medium mt-1">
                        {selectedUser.address || "Not provided"}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="health" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-500">Health Conditions</Label>
                      <div className="font-medium mt-1">
                        {selectedUser.healthConditions && selectedUser.healthConditions.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {selectedUser.healthConditions.map((condition, index) => (
                              <Badge key={index} variant="outline" className="bg-red-50 text-red-700">
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          "None reported"
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-gray-500">Dietary Preferences</Label>
                      <div className="font-medium mt-1">
                        {selectedUser.dietaryPreferences && selectedUser.dietaryPreferences.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {selectedUser.dietaryPreferences.map((pref, index) => (
                              <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                                {pref}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          "None specified"
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="activity" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-500">Registration Date</Label>
                      <div className="font-medium mt-1">
                        {new Date(selectedUser.registrationDate).toLocaleDateString("en-PK", {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-gray-500">Last Login</Label>
                      <div className="font-medium mt-1">
                        {new Date(selectedUser.lastLogin).toLocaleDateString("en-PK", {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
              <Button onClick={() => { 
                setIsViewDialogOpen(false);
                if (selectedUser) handleEditUser(selectedUser);
              }}>
                Edit User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedUser ? "Edit User" : "Add New User"}</DialogTitle>
              <DialogDescription>
                {selectedUser 
                  ? `Update information for ${selectedUser.name}`
                  : "Enter information to create a new user"}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    name="name"
                    value={editFormData.name || ""}
                    onChange={handleEditFormChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={editFormData.email || ""}
                    onChange={handleEditFormChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
                  <Select 
                    value={editFormData.role || "user"} 
                    onValueChange={handleRoleChange}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="dietitian">Dietitian</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
                  <Select 
                    value={editFormData.status || "active"} 
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="banned">Banned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={editFormData.phone || ""}
                    onChange={handleEditFormChange}
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={editFormData.dateOfBirth || ""}
                    onChange={handleEditFormChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={editFormData.address || ""}
                  onChange={handleEditFormChange}
                  placeholder="Enter address"
                  className="resize-none"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveUser}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete User Confirmation */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the user {selectedUser?.name}. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteUser} className="bg-red-600 text-white hover:bg-red-700">
                Delete User
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminUsers;
