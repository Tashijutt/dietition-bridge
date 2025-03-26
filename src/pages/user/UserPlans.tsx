
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileText, Download, Eye } from "lucide-react";
import UserLayout from "@/components/user/UserLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { generatePDF } from "@/utils/pdfGenerator";

interface DietPlan {
  id: string;
  title: string;
  description: string;
  type: "weight-loss" | "diabetes" | "heart-health" | "general";
  createdDate: string;
  source: "ai" | "dietitian";
  dietitianName?: string;
  mealPlan?: {
    day: string;
    meals: {
      type: string;
      name: string;
      ingredients: string[];
      instructions?: string;
      nutritionalInfo?: {
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
      };
    }[];
  }[];
}

const UserPlans = () => {
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll use mock data
    const mockDietPlans: DietPlan[] = [
      {
        id: "1",
        title: "7-Day Weight Loss Plan",
        description: "A balanced meal plan designed to help you lose weight gradually and sustainably, focusing on Pakistani cuisine.",
        type: "weight-loss",
        createdDate: "2023-11-20",
        source: "ai",
        mealPlan: [
          {
            day: "Day 1",
            meals: [
              {
                type: "Breakfast",
                name: "Vegetable Omelette with Whole Wheat Roti",
                ingredients: ["2 eggs", "Mixed vegetables (tomatoes, onions, green chilies)", "1 whole wheat roti", "1 tsp olive oil"],
                nutritionalInfo: {
                  calories: 350,
                  protein: 18,
                  carbs: 30,
                  fats: 15
                }
              },
              {
                type: "Lunch",
                name: "Chicken Chapli Kebab with Salad",
                ingredients: ["100g lean chicken mince", "Chapli kebab spices", "Fresh salad", "1 tbsp yogurt dip"],
                nutritionalInfo: {
                  calories: 400,
                  protein: 25,
                  carbs: 15,
                  fats: 20
                }
              },
              {
                type: "Dinner",
                name: "Daal with Brown Rice",
                ingredients: ["1/2 cup masoor daal", "1/3 cup brown rice", "Spices", "Fresh herbs"],
                nutritionalInfo: {
                  calories: 380,
                  protein: 15,
                  carbs: 60,
                  fats: 5
                }
              }
            ]
          },
          {
            day: "Day 2",
            meals: [
              {
                type: "Breakfast",
                name: "Fruit and Nut Yogurt Bowl",
                ingredients: ["1 cup low-fat yogurt", "Assorted fruits", "1 tbsp mixed nuts", "1 tsp honey"],
                nutritionalInfo: {
                  calories: 300,
                  protein: 12,
                  carbs: 40,
                  fats: 10
                }
              },
              {
                type: "Lunch",
                name: "Lentil and Vegetable Soup",
                ingredients: ["Mixed lentils", "Seasonal vegetables", "1 whole wheat roti"],
                nutritionalInfo: {
                  calories: 350,
                  protein: 18,
                  carbs: 45,
                  fats: 8
                }
              },
              {
                type: "Dinner",
                name: "Grilled Fish with Steamed Vegetables",
                ingredients: ["150g fish fillet", "Steamed vegetables", "Lemon garlic sauce"],
                nutritionalInfo: {
                  calories: 380,
                  protein: 30,
                  carbs: 20,
                  fats: 15
                }
              }
            ]
          }
        ]
      },
      {
        id: "2",
        title: "Diabetes Management Diet",
        description: "Specially crafted meal plan to help manage blood sugar levels with Pakistani food options.",
        type: "diabetes",
        createdDate: "2023-11-15",
        source: "dietitian",
        dietitianName: "Dr. Ayesha Ahmed"
      },
      {
        id: "3",
        title: "Heart-Healthy Pakistani Meals",
        description: "A collection of heart-friendly meal options focusing on reducing sodium and unhealthy fats.",
        type: "heart-health",
        createdDate: "2023-11-10",
        source: "ai"
      },
      {
        id: "4",
        title: "Ramadan Nutrition Guide",
        description: "Special meal timings and nutritional guidance for the holy month of Ramadan.",
        type: "general",
        createdDate: "2023-10-25",
        source: "dietitian",
        dietitianName: "Dr. Fatima Khan"
      }
    ];
    
    setDietPlans(mockDietPlans);
  }, []);

  const filteredPlans = dietPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          plan.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" ? true : plan.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const handleViewPlan = (id: string) => {
    navigate(`/dashboard/plans/${id}`);
  };

  const handleDownloadPlan = (plan: DietPlan) => {
    try {
      generatePDF(plan);
      toast({
        title: "PDF Downloaded",
        description: "Your diet plan has been downloaded as a PDF file."
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <ProtectedRoute>
      <UserLayout title="My Diet Plans">
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0 pb-4">
              <div>
                <CardTitle>Your Diet Plans</CardTitle>
                <CardDescription>View and manage your saved diet plans</CardDescription>
              </div>
              <Link to="/chat">
                <Button>Create New Plan with AI</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid gap-4 md:grid-cols-2">
                <div>
                  <Input
                    placeholder="Search your plans..."
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
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="weight-loss">Weight Loss</SelectItem>
                      <SelectItem value="diabetes">Diabetes</SelectItem>
                      <SelectItem value="heart-health">Heart Health</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {filteredPlans.length === 0 ? (
                <div className="text-center py-12 border rounded-lg bg-gray-50">
                  <FileText className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No diet plans found</h3>
                  <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                    You don't have any diet plans matching your search criteria. Try adjusting your filters or create a new plan with our AI assistant.
                  </p>
                  <Link to="/chat">
                    <Button className="mt-4">Create New Plan</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredPlans.map(plan => (
                    <Card key={plan.id} className="overflow-hidden border border-gray-200 transition-all hover:shadow-md">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{plan.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                          </div>
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
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <Badge variant="secondary" className="mr-2">
                              {plan.source === "ai" ? "AI Generated" : "Dietitian Provided"}
                            </Badge>
                            <p className="text-xs text-gray-500">
                              {new Date(plan.createdDate).toLocaleDateString("en-PK", {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewPlan(plan.id)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadPlan(plan)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              PDF
                            </Button>
                          </div>
                        </div>
                        
                        {plan.source === "dietitian" && plan.dietitianName && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-500">Created by: <span className="font-medium text-nutrition-600">{plan.dietitianName}</span></p>
                          </div>
                        )}
                      </div>
                    </Card>
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

export default UserPlans;
