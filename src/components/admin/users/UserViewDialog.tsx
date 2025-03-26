
import { User } from "@/data/mockUsers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar } from "lucide-react";

interface UserViewDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedUser: User | null;
  handleEditUser: (user: User) => void;
}

const UserViewDialog = ({
  isOpen,
  setIsOpen,
  selectedUser,
  handleEditUser,
}: UserViewDialogProps) => {
  if (!selectedUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>View User Details</DialogTitle>
          <DialogDescription>
            Complete information about {selectedUser.name}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="health">Health Info</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={selectedUser.profileImage} />
                <AvatarFallback className="bg-nutrition-100 text-nutrition-800 text-xl">
                  {selectedUser.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{selectedUser.email}</span>
                </div>
                {selectedUser.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{selectedUser.phone}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-500">Role</Label>
                <div className="font-medium mt-1">
                  <Badge
                    variant="outline"
                    className={
                      selectedUser.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : selectedUser.role === "dietitian"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }
                  >
                    {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label className="text-gray-500">Status</Label>
                <div className="font-medium mt-1">
                  <Badge
                    variant={
                      selectedUser.status === "active"
                        ? "default"
                        : selectedUser.status === "inactive"
                        ? "outline"
                        : "secondary"
                    }
                    className={
                      selectedUser.status === "active"
                        ? "bg-green-100 text-green-800"
                        : selectedUser.status === "inactive"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label className="text-gray-500">Date of Birth</Label>
                <div className="font-medium mt-1">
                  {selectedUser.dateOfBirth ? (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      {new Date(selectedUser.dateOfBirth).toLocaleDateString("en-PK", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  ) : (
                    "Not provided"
                  )}
                </div>
              </div>
              
              <div>
                <Label className="text-gray-500">Address</Label>
                <div className="font-medium mt-1">
                  {selectedUser.address || "Not provided"}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="health" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-500">Health Conditions</Label>
                <div className="font-medium mt-1">
                  {selectedUser.healthConditions && selectedUser.healthConditions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.healthConditions.map((condition, index) => (
                        <Badge key={index} variant="outline" className="bg-red-50 text-red-700">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    "None reported"
                  )}
                </div>
              </div>
              
              <div>
                <Label className="text-gray-500">Dietary Preferences</Label>
                <div className="font-medium mt-1">
                  {selectedUser.dietaryPreferences && selectedUser.dietaryPreferences.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.dietaryPreferences.map((pref, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                          {pref}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    "None specified"
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-500">Registration Date</Label>
                <div className="font-medium mt-1">
                  {new Date(selectedUser.registrationDate).toLocaleDateString("en-PK", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
              
              <div>
                <Label className="text-gray-500">Last Login</Label>
                <div className="font-medium mt-1">
                  {new Date(selectedUser.lastLogin).toLocaleDateString("en-PK", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button onClick={() => { 
            setIsOpen(false);
            if (selectedUser) handleEditUser(selectedUser);
          }}>
            Edit User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserViewDialog;
