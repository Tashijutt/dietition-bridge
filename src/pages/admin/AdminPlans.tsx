
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
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react";
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

interface Plan {
  id: string;
  title: string;
  type: "weight-loss" | "diabetes" | "heart-health" | "general";
  createdDate: string;
  updatedDate: string;
  status: "published" | "draft";
}

const AdminPlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll use mock data
    const mockPlans: Plan[] = [
      {
        id: "1",
        title: "7-Day Weight Loss Plan",
        type: "weight-loss",
        createdDate: "2023-10-12",
        updatedDate: "2023-11-05",
        status: "published"
      },
      {
        id: "2",
        title: "Diabetes Management Diet",
        type: "diabetes",
        createdDate: "2023-09-18",
        updatedDate: "2023-10-22",
        status: "published"
      },
      {
        id: "3",
        title: "Heart-Healthy Pakistani Meals",
        type: "heart-health",
        createdDate: "2023-11-01",
        updatedDate: "2023-11-10",
        status: "published"
      },
      {
        id: "4",
        title: "30-Day Weight Loss Challenge",
        type: "weight-loss",
        createdDate: "2023-11-15",
        updatedDate: "2023-11-15",
        status: "draft"
      },
      {
        id: "5",
        title: "Ramadan Nutritional Guide",
        type: "general",
        createdDate: "2023-10-05",
        updatedDate: "2023-10-05",
        status: "draft"
      }
    ];
    
    setPlans(mockPlans);
  }, []);

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType ? plan.type === filterType : true;
    const matchesStatus = filterStatus ? plan.status === filterStatus : true;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddPlan = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The ability to add new diet plans will be available soon.",
    });
  };

  const handleViewPlan = (id: string) => {
    toast({
      title: "View Plan",
      description: `Viewing plan with ID: ${id}`,
    });
  };

  const handleEditPlan = (id: string) => {
    toast({
      title: "Edit Plan",
      description: `Editing plan with ID: ${id}`,
    });
  };

  const handleDeletePlan = (id: string) => {
    toast({
      title: "Delete Plan",
      description: `Are you sure you want to delete this plan?`,
      variant: "destructive",
    });
  };

  return (
    <ProtectedRoute requireAdmin>
      <AdminLayout title="Manage Diet Plans">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0 pb-4">
            <div>
              <CardTitle>Diet Plans</CardTitle>
              <CardDescription>Manage all diet plans on the platform</CardDescription>
            </div>
            <Button onClick={handleAddPlan} className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Plan
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid gap-4 md:grid-cols-3">
              <div>
                <Input
                  placeholder="Search plans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="diabetes">Diabetes</SelectItem>
                    <SelectItem value="heart-health">Heart Health</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlans.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No diet plans found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPlans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">
                          {plan.title}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              plan.type === "weight-loss"
                                ? "bg-green-100 text-green-800"
                                : plan.type === "diabetes"
                                ? "bg-blue-100 text-blue-800"
                                : plan.type === "heart-health"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {plan.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(plan.updatedDate).toLocaleDateString("en-PK", { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={plan.status === "published" ? "default" : "outline"}
                            className={
                              plan.status === "published"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            }
                          >
                            {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewPlan(plan.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditPlan(plan.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeletePlan(plan.id)}
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

export default AdminPlans;
