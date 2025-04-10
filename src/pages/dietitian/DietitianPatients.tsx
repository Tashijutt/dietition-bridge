
import { useState, useEffect } from "react";
import DietitianLayout from "@/components/dietitian/DietitianLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock patients data
const mockPatients = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    profileImage: "",
    healthConditions: ["Diabetes Type 2"],
    dietaryPreferences: ["Low Carb", "No Sugar"],
    weight: "78kg",
    height: "165cm",
    assignedDate: "2025-03-15"
  },
  {
    id: 2,
    name: "Michael Brown",
    age: 45,
    gender: "Male",
    profileImage: "",
    healthConditions: ["High Blood Pressure", "High Cholesterol"],
    dietaryPreferences: ["Low Sodium"],
    weight: "92kg",
    height: "180cm",
    assignedDate: "2025-03-10"
  },
  {
    id: 3,
    name: "Emily Davis",
    age: 28,
    gender: "Female",
    profileImage: "",
    healthConditions: [],
    dietaryPreferences: ["Vegetarian", "Gluten Free"],
    weight: "63kg",
    height: "170cm",
    assignedDate: "2025-04-01"
  }
];

const DietitianPatients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState(mockPatients);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Filter patients based on search query
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DietitianLayout title="My Patients">
      <div className={`space-y-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search patients..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Patients list */}
        <div className="grid gap-4 mt-6">
          {filteredPatients.map(patient => (
            <Card key={patient.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <Avatar className="h-14 w-14 border-2 border-blue-100">
                    <AvatarImage src={patient.profileImage} alt={patient.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                      {patient.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="font-medium text-lg">{patient.name}</h3>
                      <Badge variant="outline" className="w-fit">Patient since {patient.assignedDate}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 md:gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Age:</span> {patient.age} • <span className="text-gray-500">Gender:</span> {patient.gender}
                      </div>
                      <div>
                        <span className="text-gray-500">Height:</span> {patient.height} • <span className="text-gray-500">Weight:</span> {patient.weight}
                      </div>
                    </div>
                    
                    {/* Health conditions & dietary preferences */}
                    <div className="mt-3 space-y-2">
                      <div>
                        <span className="text-xs font-medium text-gray-500">Health Conditions:</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {patient.healthConditions.length > 0 ? (
                            patient.healthConditions.map((condition, i) => (
                              <Badge key={i} variant="secondary" className="bg-orange-50 text-orange-700 hover:bg-orange-100">
                                {condition}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">None reported</span>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-xs font-medium text-gray-500">Dietary Preferences:</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {patient.dietaryPreferences.map((pref, i) => (
                            <Badge key={i} variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100">
                              {pref}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No patients found</h3>
            <p className="mt-1 text-gray-500">No patients matching your search criteria.</p>
          </div>
        )}
      </div>
    </DietitianLayout>
  );
};

export default DietitianPatients;
