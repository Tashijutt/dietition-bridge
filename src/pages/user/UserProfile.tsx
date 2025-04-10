
import { useState, useRef, useEffect } from "react";
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
import { uploadProfileImage } from "@/utils/imageUploadUtils";

const apiUrl = import.meta.env.VITE_API_URL;

const UserProfile = () => {
  const { user, updateUserProfile, token } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // const [profileData, setProfileData] = useState({
  //   name: user?.name || "",
  //   email: user?.email || "",
  //   phone: "+92 300 1234567",
  //   gender: "female" as const,
  //   age: "32",
  //   weight: "65",
  //   height: "165",
  //   healthConditions: ["Diabetes", "High Blood Pressure"],
  //   bio: "I'm interested in improving my diet to better manage my diabetes and blood pressure. Looking for meal plans that are both healthy and delicious.",
  //   dietaryPreferences: "No beef, prefer chicken and fish. Vegetarian options welcomed."
  // });

  // const [profileData, setProfileData] = useState({
  //   name: user?.name || "",
  //   email: user?.email || "",
  //   phone: user?.phone || "",
  //   gender: user?.gender || "other" as const,
  //   age: user?.age?.toString() || "",
  //   weight: user?.weight?.toString() || "",
  //   height: user?.height?.toString() || "",
  //   healthConditions: user?.healthConditions || [],
  //   bio: user?.bio || "",
  //   dietaryPreferences: user?.dietaryPreferences || ""
  // });
  
  // Define profileData state first
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "other" as const,
    age: user?.age?.toString() || "",
    weight: user?.weight?.toString() || "",
    height: user?.height?.toString() || "",
    healthConditions: user?.healthConditions || [],
    bio: user?.bio || "",
    dietaryPreferences: user?.dietaryPreferences || ""
  });

  // Then use it in useEffect
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "other" as const,
        age: user.age?.toString() || "",
        weight: user.weight?.toString() || "",
        height: user.height?.toString() || "",
        healthConditions: user.healthConditions || [],
        bio: user.bio || "",
        dietaryPreferences: user.dietaryPreferences || ""
      });
      setIsLoading(false);
    }
  }, [user]);

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

  // const handleProfileUpdate = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // In a real app, this would call an API
  //   updateUserProfile && updateUserProfile({
  //     ...user,
  //     name: profileData.name
  //   });
    
  //   toast({
  //     title: "Profile Updated",
  //     description: "Your profile has been updated successfully."
  //   });
  // };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
  
      const updatedUser = await response.json();
      updateUserProfile && updateUserProfile(updatedUser);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleProfilePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a JPEG or PNG image.",
          variant: "destructive"
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload an image smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }
      
      setUploading(true);
      uploadProfileImage(file, (imageUrl) => {
        // Update user profile with new image
        updateUserProfile && updateUserProfile({
          ...user,
          profileImage: imageUrl
        });
        
        setUploading(false);
        toast({
          title: "Profile Photo Updated",
          description: "Your profile photo has been updated successfully."
        });
      });
    }
  };

  // Handle adding a health condition
  const [newCondition, setNewCondition] = useState("");
  
  const handleAddHealthCondition = () => {
    if (newCondition.trim()) {
      setProfileData({
        ...profileData,
        healthConditions: [...profileData.healthConditions, newCondition.trim()]
      });
      setNewCondition("");
    }
  };
  
  const handleRemoveHealthCondition = (index: number) => {
    const updatedConditions = [...profileData.healthConditions];
    updatedConditions.splice(index, 1);
    setProfileData({
      ...profileData,
      healthConditions: updatedConditions
    });
  };

  return (
    <ProtectedRoute>
      <UserLayout title="My Profile">
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nutrition-600"></div>
            </div>
          ) : (
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
                    <Avatar 
                      className="w-24 h-24 mb-4 cursor-pointer relative" 
                      onClick={handleProfilePhotoClick}
                    >
                      {uploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        </div>
                      )}
                      <AvatarImage src={user?.profileImage} alt={user?.name || ""} />
                      <AvatarFallback className="bg-nutrition-100 text-nutrition-800 text-2xl">
                        {user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleFileChange}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={handleProfilePhotoClick}
                      className="w-full"
                      disabled={uploading}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {uploading ? "Uploading..." : "Upload Photo"}
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
                    <div className="flex flex-wrap gap-2 mb-2">
                      {profileData.healthConditions.map((condition, index) => (
                        <div key={index} className="bg-nutrition-50 text-nutrition-700 px-3 py-1 rounded-full text-sm flex items-center">
                          {condition}
                          <button 
                            type="button" 
                            className="ml-2 text-nutrition-700 hover:text-nutrition-900"
                            onClick={() => handleRemoveHealthCondition(index)}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value)}
                        placeholder="Add a health condition"
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleAddHealthCondition}
                      >
                        Add
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
          )}
        </div>
      </UserLayout>
    </ProtectedRoute>
  );
};

export default UserProfile;
