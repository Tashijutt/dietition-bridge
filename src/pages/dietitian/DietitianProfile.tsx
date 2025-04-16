import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import DietitianLayout from "@/components/dietitian/DietitianLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, FileText, Award, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DietitianProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    specialization: "Weight Management",
    phone: "+92 345 1234567",
    address: "101 Elm St, Faisalabad",
    bio: "Certified dietitian with over 10 years of experience specializing in weight management, diabetes, and sports nutrition.",
    education: "PhD in Nutritional Sciences, University of Lahore",
    yearsOfExperience: "10"
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (updateUserProfile && user) {
      const updatedUser = {
        ...user,
        name: formData.name,
        // Other fields would be updated here if they were part of the User type
      };
      
      updateUserProfile(updatedUser);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }
    
    setIsEditing(false);
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DietitianLayout title="My Profile">
      <div className={`space-y-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* Profile Overview Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 border-2 border-blue-100">
                  <AvatarImage src={user?.profilePicture} alt={user?.name || ""} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                    {user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "D"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">Dr. {user?.name}</CardTitle>
                  <CardDescription className="text-blue-600">
                    {formData.specialization} Specialist
                  </CardDescription>
                </div>
              </div>
              {!isEditing && (
                <Button 
                  variant="outline" 
                  className="mt-4 sm:mt-0"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!isEditing ? (
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <User className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{formData.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{formData.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{formData.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Biography */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Biography</h3>
                  <p className="text-gray-700">{formData.bio}</p>
                </div>
                
                {/* Professional Information */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Professional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <Award className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Education</p>
                        <p className="font-medium">{formData.education}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Experience</p>
                        <p className="font-medium">{formData.yearsOfExperience} years</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Specialization</p>
                        <p className="font-medium">{formData.specialization}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled
                      placeholder="Your email"
                    />
                    <p className="text-xs text-gray-500">Email cannot be changed</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Your address"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      placeholder="Your specialization"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <Input
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      placeholder="Your education"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                    <Input
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleChange}
                      placeholder="Years of experience"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Biography</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell about yourself"
                    rows={4}
                  />
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </DietitianLayout>
  );
};

export default DietitianProfile;
