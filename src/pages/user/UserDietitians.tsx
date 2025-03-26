
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, User, Phone, Mail, Star, Grid3X3, List } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

interface Dietitian {
  id: string;
  name: string;
  title: string;
  city: string;
  specialization: string[];
  rating: number;
  phone: string;
  email: string;
  bio: string;
  image?: string;
  isSaved: boolean;
}

const UserDietitians = () => {
  const [dietitians, setDietitians] = useState<Dietitian[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we'll use mock data
    const mockDietitians: Dietitian[] = [
      {
        id: "1",
        name: "Dr. Ayesha Ahmed",
        title: "Registered Dietitian",
        city: "Karachi",
        specialization: ["Diabetes Management", "Weight Loss"],
        rating: 4.8,
        phone: "+92 300 1234567",
        email: "dr.ayesha@example.com",
        bio: "Specialized in helping patients with diabetes maintain a balanced diet while enjoying traditional Pakistani cuisine. Over 10 years of experience in nutritional counseling.",
        isSaved: true
      },
      {
        id: "2",
        name: "Dr. Fatima Khan",
        title: "Clinical Nutritionist",
        city: "Lahore",
        specialization: ["Weight Management", "Sports Nutrition"],
        rating: 4.6,
        phone: "+92 321 9876543",
        email: "fatima.khan@example.com",
        bio: "Expert in weight management strategies tailored for South Asian body types and dietary patterns. Passionate about helping clients achieve sustainable weight loss.",
        isSaved: true
      },
      {
        id: "3",
        name: "Dr. Muhammad Ali",
        title: "Nutrition Specialist",
        city: "Islamabad",
        specialization: ["Heart Health", "General Wellness"],
        rating: 4.9,
        phone: "+92 333 4567890",
        email: "m.ali@example.com",
        bio: "Focuses on heart-healthy diets that incorporate local Pakistani ingredients and cooking methods to reduce the risk of cardiovascular disease while preserving cultural food preferences.",
        isSaved: false
      },
      {
        id: "4",
        name: "Dr. Saima Malik",
        title: "Sports Nutritionist",
        city: "Karachi",
        specialization: ["Sports Nutrition", "Fitness Planning"],
        rating: 4.7,
        phone: "+92 312 5678901",
        email: "saima@example.com",
        bio: "Specializes in nutrition for athletes and active individuals. Helps clients optimize their performance through scientifically-backed nutrition strategies.",
        isSaved: false
      }
    ];
    
    setDietitians(mockDietitians);
  }, []);

  const filteredDietitians = dietitians.filter(dietitian => {
    const matchesSearch = dietitian.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           dietitian.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           dietitian.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = filterCity ? dietitian.city === filterCity : true;
    const matchesSpecialization = filterSpecialization ? 
                                  dietitian.specialization.some(spec => 
                                    spec.toLowerCase() === filterSpecialization.toLowerCase()
                                  ) : true;
    
    return matchesSearch && matchesCity && matchesSpecialization;
  });

  const savedDietitians = filteredDietitians.filter(dietitian => dietitian.isSaved);

  const handleToggleSave = (id: string, isSaved: boolean) => {
    setDietitians(prev => 
      prev.map(dietitian => 
        dietitian.id === id 
          ? { ...dietitian, isSaved: !isSaved } 
          : dietitian
      )
    );
    
    toast({
      title: isSaved ? "Dietitian Removed" : "Dietitian Saved",
      description: isSaved 
        ? "The dietitian has been removed from your saved list." 
        : "The dietitian has been added to your saved list."
    });
  };

  const handleContact = (dietitian: Dietitian) => {
    toast({
      title: "Contact Information",
      description: `You can reach ${dietitian.name} at ${dietitian.phone} or ${dietitian.email}`
    });
  };

  return (
    <ProtectedRoute>
      <UserLayout title="My Dietitians">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Saved Dietitians</CardTitle>
              <CardDescription>Professional nutritionists you've connected with</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="saved">
                <TabsList className="mb-6">
                  <TabsTrigger value="saved">Saved Dietitians</TabsTrigger>
                  <TabsTrigger value="browse">Browse All</TabsTrigger>
                </TabsList>
                
                <TabsContent value="saved">
                  {savedDietitians.length === 0 ? (
                    <div className="text-center py-12 border rounded-lg bg-gray-50">
                      <User className="h-12 w-12 mx-auto text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium text-gray-900">No saved dietitians</h3>
                      <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                        You haven't saved any dietitians yet. Browse the directory to find and save professional nutritionists.
                      </p>
                      <Button className="mt-4" onClick={() => {
                        const tabsList = document.querySelector('[role="tablist"]');
                        const browseTab = tabsList?.querySelector('[data-value="browse"]') as HTMLButtonElement;
                        if (browseTab) browseTab.click();
                      }}>
                        Browse Dietitians
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {savedDietitians.map(dietitian => (
                        <Card key={dietitian.id} className="overflow-hidden border border-gray-200 transition-all hover:shadow-md">
                          <div className="p-6">
                            <div className="flex items-center mb-4">
                              <Avatar className="h-12 w-12 mr-4">
                                <AvatarImage src={dietitian.image} alt={dietitian.name} />
                                <AvatarFallback className="bg-nutrition-100 text-nutrition-800">
                                  {dietitian.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">{dietitian.name}</h3>
                                <p className="text-sm text-gray-500">{dietitian.title}</p>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <div className="flex items-center text-sm mb-2">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span className="font-medium">{dietitian.rating}</span>
                                <span className="text-gray-500 mx-2">•</span>
                                <span className="text-gray-500">{dietitian.city}</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {dietitian.specialization.map((spec, index) => (
                                  <Badge key={index} variant="outline" className="bg-nutrition-50 text-nutrition-700 border-nutrition-200">
                                    {spec}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex space-x-2 mt-4">
                              <Button
                                className="flex-1"
                                onClick={() => handleContact(dietitian)}
                              >
                                <Phone className="h-4 w-4 mr-1.5" />
                                Contact
                              </Button>
                              <Button
                                variant="outline"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleToggleSave(dietitian.id, dietitian.isSaved)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="browse">
                  <div className="mb-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            placeholder="Search dietitians by name or specialization..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-40">
                          <Select value={filterCity} onValueChange={setFilterCity}>
                            <SelectTrigger>
                              <SelectValue placeholder="City" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">All Cities</SelectItem>
                              <SelectItem value="Karachi">Karachi</SelectItem>
                              <SelectItem value="Lahore">Lahore</SelectItem>
                              <SelectItem value="Islamabad">Islamabad</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-48">
                          <Select value={filterSpecialization} onValueChange={setFilterSpecialization}>
                            <SelectTrigger>
                              <SelectValue placeholder="Specialization" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">All Specializations</SelectItem>
                              <SelectItem value="Diabetes Management">Diabetes Management</SelectItem>
                              <SelectItem value="Weight Management">Weight Management</SelectItem>
                              <SelectItem value="Heart Health">Heart Health</SelectItem>
                              <SelectItem value="Sports Nutrition">Sports Nutrition</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                            onClick={() => setViewMode('grid')}
                          >
                            <Grid3X3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                            onClick={() => setViewMode('list')}
                          >
                            <List className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {filteredDietitians.length === 0 ? (
                    <div className="text-center py-12 border rounded-lg bg-gray-50">
                      <User className="h-12 w-12 mx-auto text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium text-gray-900">No dietitians found</h3>
                      <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                        No dietitians match your current filters. Try adjusting your search criteria.
                      </p>
                      <Button 
                        className="mt-4" 
                        variant="outline"
                        onClick={() => {
                          setSearchQuery("");
                          setFilterCity("");
                          setFilterSpecialization("");
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  ) : viewMode === 'grid' ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filteredDietitians.map(dietitian => (
                        <Card key={dietitian.id} className="overflow-hidden border border-gray-200 transition-all hover:shadow-md">
                          <div className="p-6">
                            <div className="flex items-center mb-4">
                              <Avatar className="h-12 w-12 mr-4">
                                <AvatarImage src={dietitian.image} alt={dietitian.name} />
                                <AvatarFallback className="bg-nutrition-100 text-nutrition-800">
                                  {dietitian.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">{dietitian.name}</h3>
                                <p className="text-sm text-gray-500">{dietitian.title}</p>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <div className="flex items-center text-sm mb-2">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span className="font-medium">{dietitian.rating}</span>
                                <span className="text-gray-500 mx-2">•</span>
                                <span className="text-gray-500">{dietitian.city}</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {dietitian.specialization.map((spec, index) => (
                                  <Badge key={index} variant="outline" className="bg-nutrition-50 text-nutrition-700 border-nutrition-200">
                                    {spec}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex space-x-2 mt-4">
                              <Button
                                className="flex-1"
                                onClick={() => handleContact(dietitian)}
                              >
                                <Phone className="h-4 w-4 mr-1.5" />
                                Contact
                              </Button>
                              <Button
                                variant="outline"
                                className={dietitian.isSaved ? "text-red-600 border-red-200 hover:bg-red-50" : ""}
                                onClick={() => handleToggleSave(dietitian.id, dietitian.isSaved)}
                              >
                                {dietitian.isSaved ? "Remove" : "Save"}
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredDietitians.map(dietitian => (
                        <Card key={dietitian.id} className="overflow-hidden border border-gray-200 transition-all hover:shadow-md">
                          <div className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center">
                              <div className="flex items-center mb-4 md:mb-0 md:w-1/3">
                                <Avatar className="h-12 w-12 mr-4">
                                  <AvatarImage src={dietitian.image} alt={dietitian.name} />
                                  <AvatarFallback className="bg-nutrition-100 text-nutrition-800">
                                    {dietitian.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-lg font-medium text-gray-900">{dietitian.name}</h3>
                                  <div className="flex items-center text-sm">
                                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                    <span className="font-medium">{dietitian.rating}</span>
                                    <span className="text-gray-500 mx-2">•</span>
                                    <span className="text-gray-500">{dietitian.city}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="md:w-1/3">
                                <p className="text-sm text-gray-500 mb-2">{dietitian.title}</p>
                                <div className="flex flex-wrap gap-2">
                                  {dietitian.specialization.map((spec, index) => (
                                    <Badge key={index} variant="outline" className="bg-nutrition-50 text-nutrition-700 border-nutrition-200">
                                      {spec}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex space-x-2 mt-4 md:mt-0 md:w-1/3 md:justify-end">
                                <Button
                                  onClick={() => handleContact(dietitian)}
                                >
                                  <Phone className="h-4 w-4 mr-1.5" />
                                  Contact
                                </Button>
                                <Button
                                  variant="outline"
                                  className={dietitian.isSaved ? "text-red-600 border-red-200 hover:bg-red-50" : ""}
                                  onClick={() => handleToggleSave(dietitian.id, dietitian.isSaved)}
                                >
                                  {dietitian.isSaved ? "Remove" : "Save"}
                                </Button>
                              </div>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="text-sm text-gray-600">{dietitian.bio}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </UserLayout>
    </ProtectedRoute>
  );
};

export default UserDietitians;
