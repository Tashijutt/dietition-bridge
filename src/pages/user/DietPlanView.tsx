
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Calendar, Tag, User } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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

const DietPlanView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDietPlan = async () => {
      setLoading(true);
      try {
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
            dietitianName: "Dr. Ayesha Ahmed",
            mealPlan: [
              {
                day: "Day 1",
                meals: [
                  {
                    type: "Breakfast",
                    name: "Low-GI Oatmeal with Cinnamon",
                    ingredients: ["1/2 cup steel-cut oats", "1 tbsp chia seeds", "Cinnamon", "1/4 cup mixed berries"],
                    nutritionalInfo: {
                      calories: 280,
                      protein: 10,
                      carbs: 35,
                      fats: 8
                    }
                  },
                  {
                    type: "Lunch",
                    name: "Chickpea and Vegetable Salad",
                    ingredients: ["1/2 cup boiled chickpeas", "Fresh vegetables", "Olive oil dressing", "1 small whole wheat roti"],
                    nutritionalInfo: {
                      calories: 350,
                      protein: 15,
                      carbs: 40,
                      fats: 12
                    }
                  },
                  {
                    type: "Dinner",
                    name: "Karahi Chicken (Lean) with Brown Rice",
                    ingredients: ["100g lean chicken", "Tomato-based karahi gravy", "1/3 cup brown rice"],
                    nutritionalInfo: {
                      calories: 400,
                      protein: 28,
                      carbs: 45,
                      fats: 10
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "3",
            title: "Heart-Healthy Pakistani Meals",
            description: "A collection of heart-friendly meal options focusing on reducing sodium and unhealthy fats.",
            type: "heart-health",
            createdDate: "2023-11-10",
            source: "ai",
            mealPlan: [
              {
                day: "Day 1",
                meals: [
                  {
                    type: "Breakfast",
                    name: "Low-sodium Vegetable Upma",
                    ingredients: ["Semolina", "Mixed vegetables", "Minimal salt"],
                    nutritionalInfo: {
                      calories: 280,
                      protein: 8,
                      carbs: 45,
                      fats: 6
                    }
                  },
                  {
                    type: "Lunch",
                    name: "Baked Fish with Herbs",
                    ingredients: ["150g fish fillet", "Fresh herbs", "Lemon", "Steamed vegetables"],
                    nutritionalInfo: {
                      calories: 330,
                      protein: 30,
                      carbs: 15,
                      fats: 12
                    }
                  }
                ]
              }
            ]
          },
          {
            id: "4",
            title: "Ramadan Nutrition Guide",
            description: "Special meal timings and nutritional guidance for the holy month of Ramadan.",
            type: "general",
            createdDate: "2023-10-25",
            source: "dietitian",
            dietitianName: "Dr. Fatima Khan",
            mealPlan: [
              {
                day: "Day 1",
                meals: [
                  {
                    type: "Sehri",
                    name: "Slow-release Energy Breakfast",
                    ingredients: ["2 whole wheat parathas", "1 boiled egg", "1 cup milk", "1 date"],
                    nutritionalInfo: {
                      calories: 450,
                      protein: 20,
                      carbs: 55,
                      fats: 18
                    }
                  },
                  {
                    type: "Iftar",
                    name: "Balanced Iftar Plate",
                    ingredients: ["2 dates", "Fruit chaat", "1 samosa", "Chickpea chaat", "Fresh juice"],
                    nutritionalInfo: {
                      calories: 480,
                      protein: 12,
                      carbs: 70,
                      fats: 15
                    }
                  },
                  {
                    type: "Dinner",
                    name: "Light Dinner",
                    ingredients: ["Chicken soup", "1 whole wheat roti", "Mixed vegetable curry"],
                    nutritionalInfo: {
                      calories: 400,
                      protein: 25,
                      carbs: 40,
                      fats: 12
                    }
                  }
                ]
              }
            ]
          }
        ];
        
        const plan = mockDietPlans.find(p => p.id === id);
        if (plan) {
          setDietPlan(plan);
        } else {
          toast({
            title: "Diet Plan Not Found",
            description: "The requested diet plan could not be found.",
            variant: "destructive"
          });
          navigate("/dashboard/plans");
        }
      } catch (error) {
        console.error("Error fetching diet plan:", error);
        toast({
          title: "Error",
          description: "Failed to load diet plan. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDietPlan();
  }, [id, navigate]);

  const handleDownloadPDF = () => {
    if (dietPlan) {
      generatePDF(dietPlan);
      toast({
        title: "PDF Generated",
        description: "Your diet plan has been downloaded as a PDF file."
      });
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <UserLayout title="Loading Diet Plan...">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nutrition-600"></div>
          </div>
        </UserLayout>
      </ProtectedRoute>
    );
  }

  if (!dietPlan) {
    return (
      <ProtectedRoute>
        <UserLayout title="Diet Plan Not Found">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-lg text-gray-600 mb-4">The requested diet plan could not be found.</p>
              <Button onClick={() => navigate("/dashboard/plans")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Diet Plans
              </Button>
            </CardContent>
          </Card>
        </UserLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <UserLayout title={dietPlan.title}>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/dashboard/plans")}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Diet Plans
            </Button>
            <Button 
              onClick={handleDownloadPDF}
              className="w-full sm:w-auto"
            >
              <Download className="mr-2 h-4 w-4" />
              Download as PDF
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <CardTitle className="text-2xl mb-2">{dietPlan.title}</CardTitle>
                  <CardDescription className="text-base">{dietPlan.description}</CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className={
                    dietPlan.type === "weight-loss"
                      ? "bg-green-100 text-green-800"
                      : dietPlan.type === "diabetes"
                      ? "bg-blue-100 text-blue-800"
                      : dietPlan.type === "heart-health"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }
                >
                  {dietPlan.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-1 h-4 w-4" />
                  Created: {new Date(dietPlan.createdDate).toLocaleDateString("en-PK", {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Tag className="mr-1 h-4 w-4" />
                  {dietPlan.source === "ai" ? "AI Generated" : "Dietitian Provided"}
                </div>
                {dietPlan.dietitianName && (
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="mr-1 h-4 w-4" />
                    {dietPlan.dietitianName}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {dietPlan.mealPlan ? (
                <div className="space-y-6">
                  {dietPlan.mealPlan.map((day, dayIndex) => (
                    <div key={dayIndex} className="space-y-4">
                      <h3 className="text-xl font-semibold text-nutrition-700 bg-nutrition-50 px-4 py-2 rounded-md">
                        {day.day}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {day.meals.map((meal, mealIndex) => (
                          <Card key={mealIndex} className="border-l-4 border-l-nutrition-400">
                            <CardHeader className="pb-2">
                              <div className="text-sm font-medium text-nutrition-600">{meal.type}</div>
                              <CardTitle className="text-lg">{meal.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-600">Ingredients:</h4>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                  {meal.ingredients.map((ingredient, i) => (
                                    <li key={i}>{ingredient}</li>
                                  ))}
                                </ul>
                                
                                {meal.instructions && (
                                  <div className="mt-3">
                                    <h4 className="text-sm font-medium text-gray-600">Instructions:</h4>
                                    <p className="text-sm">{meal.instructions}</p>
                                  </div>
                                )}
                                
                                {meal.nutritionalInfo && (
                                  <div className="mt-3">
                                    <h4 className="text-sm font-medium text-gray-600">Nutritional Information:</h4>
                                    <div className="grid grid-cols-4 gap-2 text-xs mt-1">
                                      <div className="bg-gray-50 p-2 rounded">
                                        <div className="font-medium">Calories</div>
                                        <div>{meal.nutritionalInfo.calories} kcal</div>
                                      </div>
                                      <div className="bg-gray-50 p-2 rounded">
                                        <div className="font-medium">Protein</div>
                                        <div>{meal.nutritionalInfo.protein}g</div>
                                      </div>
                                      <div className="bg-gray-50 p-2 rounded">
                                        <div className="font-medium">Carbs</div>
                                        <div>{meal.nutritionalInfo.carbs}g</div>
                                      </div>
                                      <div className="bg-gray-50 p-2 rounded">
                                        <div className="font-medium">Fats</div>
                                        <div>{meal.nutritionalInfo.fats}g</div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-500">Detailed meal plan not available for this diet plan.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </UserLayout>
    </ProtectedRoute>
  );
};

export default DietPlanView;
