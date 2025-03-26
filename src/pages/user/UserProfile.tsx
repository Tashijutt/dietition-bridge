
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Save, Upload } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const UserProfile = () => {
  const { user } = useAuth();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+92 300 1234567",
    gender: "female" as const,
    age: "32",
    weight: "65",
    height: "165",
    healthConditions: ["Diabetes", "High Blood Pressure"],
    bio: "I'm interested in improving my diet to better manage my diabetes and blood pressure. Looking for meal plans that are both healthy and delicious.",
    dietaryPreferences: "No beef, prefer chicken and fish. Vegetarian options welcomed."
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully."
    });
  };

  const handleProfilePhotoUpload = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The ability to upload a profile photo will be available soon."
    });
  };

  return (
    <ProtectedRoute>
      <UserLayout title="My Profile">
        <div className="space-y-6">
          <form onSubmit={handleProfileUpdate}>
            {/* Profile Picture and Basic Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your profile picture and personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src={user?.profileImage} alt={user?.name || ""} />
                      <AvatarFallback className="bg-nutrition-100 text-nutrition-800 text-2xl">
                        {user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={handleProfilePhotoUpload}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                  </div>
                  
                  <div className="flex-1 grid gap-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={profileData.name} 
                          onChange={handleInputChange}
                          placeholder="Your full name" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          value={profileData.email} 
                          onChange={handleInputChange}
                          placeholder="Your email address" 
                          disabled 
                        />
                        <p className="text-xs text-gray-500">Email cannot be changed</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={profileData.phone} 
                          onChange={handleInputChange}
                          placeholder="Your phone number" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select 
                          value={profileData.gender} 
                          onValueChange={(value) => handleSelectChange("gender", value)}
                        >
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Health Information</CardTitle>
                <CardDescription>Add your health details for better diet recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input 
                        id="age" 
                        name="age" 
                        type="number" 
                        value={profileData.age} 
                        onChange={handleInputChange}
                        placeholder="Your age" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input 
                        id="weight" 
                        name="weight" 
                        type="number" 
                        value={profileData.weight} 
                        onChange={handleInputChange}
                        placeholder="Your weight in kg" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input 
                        id="height" 
                        name="height" 
                        type="number" 
                        value={profileData.height} 
                        onChange={handleInputChange}
                        placeholder="Your height in cm" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="healthConditions">Health Conditions</Label>
                    <div className="flex flex-wrap gap-2">
                      {profileData.healthConditions.map((condition, index) => (
                        <div key={index} className="bg-nutrition-50 text-nutrition-700 px-3 py-1 rounded-full text-sm flex items-center">
                          {condition}
                        </div>
                      ))}
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        className="rounded-full px-3 h-8"
                      >
                        + Add
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">About You</Label>
                    <Textarea 
                      id="bio" 
                      name="bio" 
                      value={profileData.bio} 
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself and your health goals" 
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dietaryPreferences">Dietary Preferences</Label>
                    <Textarea 
                      id="dietaryPreferences" 
                      name="dietaryPreferences" 
                      value={profileData.dietaryPreferences} 
                      onChange={handleInputChange}
                      placeholder="Any food preferences or restrictions" 
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" className="w-full md:w-auto">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </UserLayout>
    </ProtectedRoute>
  );
};

export default UserProfile;
