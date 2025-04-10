
import { useState, useEffect } from "react";
import DietitianLayout from "@/components/dietitian/DietitianLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Search, Clock } from "lucide-react";

// Mock diet plans data
const mockDietPlans = [
  {
    id: 4,
    title: "Sarah Johnson - Personalized Plan",
    description: "Custom weight loss and diabetes management plan",
    category: "Custom",
    duration: "2 months",
    patientsAssigned: 1,
    rating: null,
    createdAt: "2025-04-01",
    isTemplate: false,
    patientName: "Sarah Johnson",
    details: "This personalized plan includes a 1500-calorie daily intake, focused on low-carb options. Breakfast should include protein and fiber. Lunch should be rich in vegetables and lean protein. Dinner should be light and include complex carbohydrates. Snacks are allowed twice daily, focusing on nuts, fruits, or yogurt."
  },
  {
    id: 5,
    title: "Michael Brown - Heart Health Plan",
    description: "Customized heart-healthy diet with exercise recommendations",
    category: "Custom",
    duration: "3 months",
    patientsAssigned: 1,
    rating: null,
    createdAt: "2025-03-15",
    isTemplate: false,
    patientName: "Michael Brown",
    details: "This heart-healthy plan focuses on reducing sodium intake and increasing omega-3 fatty acids. Daily sodium should be limited to 1500mg. Include fatty fish twice weekly. Increase fiber intake through whole grains and vegetables. Limit processed foods and added sugars. Complement with 30 minutes of moderate exercise 5 days a week."
  },
  {
    id: 6,
    title: "Emily Davis - Vegetarian Plan",
    description: "Balanced vegetarian nutrition with adequate protein sources",
    category: "Custom",
    duration: "1 month",
    patientsAssigned: 1,
    rating: null,
    createdAt: "2025-04-05",
    isTemplate: false,
    patientName: "Emily Davis",
    details: "This vegetarian plan ensures adequate protein intake through plant-based sources. Include legumes, tofu, or tempeh daily. Ensure vitamin B12 through fortified foods or supplements. Focus on iron-rich foods like spinach and lentils. Incorporate calcium sources such as fortified plant milks. Include a variety of fruits and vegetables for complete nutrition."
  }
];

const DietitianPlans = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [plans, setPlans] = useState(mockDietPlans);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Filter plans based on search query
  const filteredPlans = plans.filter(plan =>
    plan.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleViewPlan = (plan) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  return (
    <DietitianLayout title="Diet Plans">
      <div className={`space-y-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search diet plans..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Patient Plans */}
        <div className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlans.map(plan => (
              <Card key={plan.id} className="h-full flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge className="mb-2" variant="outline">{plan.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{plan.title}</CardTitle>
                  {plan.patientName && (
                    <p className="text-sm text-blue-600 font-medium">Patient: {plan.patientName}</p>
                  )}
                </CardHeader>
                <CardContent className="flex-1 flex flex-col pb-6">
                  <p className="text-sm text-gray-600 flex-1">{plan.description}</p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{plan.duration}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <Button 
                      variant="default" 
                      className="w-full"
                      onClick={() => handleViewPlan(plan)}
                    >
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredPlans.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No patient plans</h3>
              <p className="mt-1 text-gray-500">No diet plans found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Plan View Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Diet Plan Details</DialogTitle>
          </DialogHeader>
          {selectedPlan && (
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-xl font-medium">{selectedPlan.title}</h3>
                <p className="text-blue-600">Patient: {selectedPlan.patientName}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline">{selectedPlan.category}</Badge>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  <span>{selectedPlan.duration}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-600">{selectedPlan.description}</p>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Plan Details</h4>
                <p className="text-gray-600 whitespace-pre-line">{selectedPlan.details}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DietitianLayout>
  );
};

export default DietitianPlans;
