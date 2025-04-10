
import { useState, useEffect } from "react";
import DietitianLayout from "@/components/dietitian/DietitianLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Search, Filter, Star, Clock, Users } from "lucide-react";

// Mock diet plans data
const mockDietPlans = [
  {
    id: 1,
    title: "Weight Loss Plan - Low Carb",
    description: "A comprehensive low carb diet plan designed for sustainable weight loss",
    category: "Weight Loss",
    duration: "4 weeks",
    patientsAssigned: 5,
    rating: 4.8,
    createdAt: "2025-01-15",
    isTemplate: true
  },
  {
    id: 2,
    title: "Diabetes Management Plan",
    description: "Specialized diet plan for type 2 diabetes patients with controlled carb intake",
    category: "Medical",
    duration: "Ongoing",
    patientsAssigned: 3,
    rating: 4.6,
    createdAt: "2025-02-10",
    isTemplate: true
  },
  {
    id: 3,
    title: "Heart Health Nutrition Plan",
    description: "Low sodium, heart-healthy diet plan focusing on reducing cholesterol",
    category: "Medical",
    duration: "3 months",
    patientsAssigned: 2,
    rating: 4.5,
    createdAt: "2025-03-05",
    isTemplate: true
  },
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
    patientName: "Sarah Johnson"
  }
];

const DietitianPlans = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [plans, setPlans] = useState(mockDietPlans);
  const [isLoaded, setIsLoaded] = useState(false);

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

  // Get template plans
  const templatePlans = filteredPlans.filter(plan => plan.isTemplate);
  
  // Get patient-specific plans
  const patientPlans = filteredPlans.filter(plan => !plan.isTemplate);

  return (
    <DietitianLayout title="Diet Plans">
      <div className={`space-y-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {/* Search and filters */}
          <div className="flex flex-1 flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search diet plans..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
          
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Create Plan</span>
          </Button>
        </div>

        {/* Diet Plans tabs */}
        <Tabs defaultValue="templates" className="w-full">
          <TabsList>
            <TabsTrigger value="templates">Template Plans</TabsTrigger>
            <TabsTrigger value="patients">Patient Plans</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templatePlans.map(plan => (
                <Card key={plan.id} className="h-full flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge className="mb-2" variant="outline">{plan.category}</Badge>
                      <div className="flex items-center text-yellow-500">
                        <Star className="fill-yellow-500 h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{plan.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{plan.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col pb-6">
                    <p className="text-sm text-gray-600 flex-1">{plan.description}</p>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{plan.duration}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{plan.patientsAssigned} patients assigned</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t flex justify-between">
                      <Button variant="outline" className="flex-1 mr-2">View</Button>
                      <Button variant="default" className="flex-1">Assign</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {templatePlans.length === 0 && (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No template plans</h3>
                <p className="mt-1 text-gray-500">Create a template plan to get started.</p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="patients" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patientPlans.map(plan => (
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
                    
                    <div className="mt-4 pt-4 border-t flex justify-between">
                      <Button variant="outline" className="flex-1 mr-2">Edit</Button>
                      <Button variant="default" className="flex-1">View</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {patientPlans.length === 0 && (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No patient plans</h3>
                <p className="mt-1 text-gray-500">Assign a plan to a patient to get started.</p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Assign Plan
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DietitianLayout>
  );
};

export default DietitianPlans;
