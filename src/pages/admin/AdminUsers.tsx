
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
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { mockUsers, User } from "@/data/mockUsers";
import UserFilters from "@/components/admin/users/UserFilters";
import UsersTable from "@/components/admin/users/UsersTable";
import UserViewDialog from "@/components/admin/users/UserViewDialog";
import UserEditDialog from "@/components/admin/users/UserEditDialog";
import DeleteUserDialog from "@/components/admin/users/DeleteUserDialog";

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
      u.id === user.id ? { ...u, status: newStatus as "active" | "inactive" | "banned" } : u
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
    setEditFormData(prev => ({ ...prev, role: value as "admin" | "user" | "dietitian" }));
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
            <UserFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterRole={filterRole}
              setFilterRole={setFilterRole}
            />
            
            <UsersTable 
              filteredUsers={filteredUsers}
              handleViewUser={handleViewUser}
              handleToggleStatus={handleToggleStatus}
              handleEditUser={handleEditUser}
              handleDeleteUser={handleDeleteUser}
            />
          </CardContent>
        </Card>

        {/* Dialogs */}
        <UserViewDialog 
          isOpen={isViewDialogOpen}
          setIsOpen={setIsViewDialogOpen}
          selectedUser={selectedUser}
          handleEditUser={handleEditUser}
        />

        <UserEditDialog 
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          selectedUser={selectedUser}
          editFormData={editFormData}
          handleEditFormChange={handleEditFormChange}
          handleRoleChange={handleRoleChange}
          handleStatusChange={handleStatusChange}
          handleSaveUser={handleSaveUser}
        />

        <DeleteUserDialog 
          isOpen={isDeleteDialogOpen}
          setIsOpen={setIsDeleteDialogOpen}
          selectedUser={selectedUser}
          confirmDeleteUser={confirmDeleteUser}
        />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminUsers;
