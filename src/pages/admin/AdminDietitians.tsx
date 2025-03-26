
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
import { PlusCircle, Edit, Trash2 } from "lucide-react";
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

interface Dietitian {
  id: string;
  name: string;
  email: string;
  city: string;
  specialization: string;
  status: "active" | "pending" | "inactive";
}

const AdminDietitians = () => {
  const [dietitians, setDietitians] = useState<Dietitian[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCity, setFilterCity] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll use mock data
    const mockDietitians: Dietitian[] = [
      {
        id: "1",
        name: "Dr. Ayesha Ahmed",
        email: "dr.ayesha@example.com",
        city: "Karachi",
        specialization: "Diabetes Management",
        status: "active"
      },
      {
        id: "2",
        name: "Dr. Fatima Khan",
        email: "fatima.khan@example.com",
        city: "Lahore",
        specialization: "Weight Management",
        status: "active"
      },
      {
        id: "3",
        name: "Dr. Muhammad Ali",
        email: "m.ali@example.com",
        city: "Islamabad",
        specialization: "Heart Health",
        status: "active"
      },
      {
        id: "4",
        name: "Dr. Saima Malik",
        email: "saima@example.com",
        city: "Karachi",
        specialization: "Sports Nutrition",
        status: "pending"
      },
      {
        id: "5",
        name: "Dr. Ahmed Raza",
        email: "ahmed.raza@example.com",
        city: "Lahore",
        specialization: "Pediatric Nutrition",
        status: "inactive"
      }
    ];
    
    setDietitians(mockDietitians);
  }, []);

  const filteredDietitians = dietitians.filter(dietitian => {
    const matchesSearch = dietitian.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         dietitian.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dietitian.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = filterCity === "all" ? true : dietitian.city === filterCity;
    const matchesStatus = filterStatus === "all" ? true : dietitian.status === filterStatus;
    
    return matchesSearch && matchesCity && matchesStatus;
  });

  const handleAddDietitian = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The ability to add new dietitians will be available soon.",
    });
  };

  const handleEditDietitian = (id: string) => {
    toast({
      title: "Edit Dietitian",
      description: `Editing dietitian with ID: ${id}`,
    });
  };

  const handleDeleteDietitian = (id: string) => {
    toast({
      title: "Delete Dietitian",
      description: `Are you sure you want to delete this dietitian?`,
      variant: "destructive",
    });
  };

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout title="Manage Dietitians">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0 pb-4">
            <div>
              <CardTitle>Dietitians</CardTitle>
              <CardDescription>Manage all dietitians on the platform</CardDescription>
            </div>
            <Button onClick={handleAddDietitian} className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Dietitian
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid gap-4 md:grid-cols-3">
              <div>
                <Input
                  placeholder="Search dietitians..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Select value={filterCity} onValueChange={setFilterCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    <SelectItem value="Karachi">Karachi</SelectItem>
                    <SelectItem value="Lahore">Lahore</SelectItem>
                    <SelectItem value="Islamabad">Islamabad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDietitians.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No dietitians found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDietitians.map((dietitian) => (
                      <TableRow key={dietitian.id}>
                        <TableCell className="font-medium">
                          <div>{dietitian.name}</div>
                          <div className="text-sm text-gray-500">{dietitian.email}</div>
                        </TableCell>
                        <TableCell>{dietitian.specialization}</TableCell>
                        <TableCell>{dietitian.city}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              dietitian.status === "active"
                                ? "default"
                                : dietitian.status === "pending"
                                ? "outline"
                                : "secondary"
                            }
                            className={
                              dietitian.status === "active"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : dietitian.status === "pending"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }
                          >
                            {dietitian.status.charAt(0).toUpperCase() + dietitian.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditDietitian(dietitian.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteDietitian(dietitian.id)}
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

export default AdminDietitians;
