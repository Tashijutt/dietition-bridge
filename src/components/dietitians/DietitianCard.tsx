import { MapPin, Star, Award, Video, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dietitian } from "./dietitianTypes";
import { useState } from "react";
import AppointmentDialog from "../appointment/AppointmentDialog";

interface DietitianCardProps {
  dietitian: Dietitian;
  viewMode: 'grid' | 'list';
  handleBookAppointment?: (dietitian: Dietitian) => void;
  index: number;
  inView: boolean;
}

const DietitianCard = ({ dietitian, viewMode, index, inView }: DietitianCardProps) => {
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  
  const openAppointmentDialog = () => {
    setAppointmentDialogOpen(true);
  };
  
  const handleVideoConsultation = () => {
    openAppointmentDialog(); // Use the same dialog for both video and in-person
  };

  if (viewMode === 'grid') {
    return (
      <div 
        key={dietitian.id}
        className={cn(
          "bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden",
          inView ? "animate-fade-up" : "opacity-0"
        )}
        style={{ animationDelay: `${300 + index * 100}ms` }}
      >
        <div className="p-5">
          {/* Dietitian Header with Image */}
          <div className="flex items-center space-x-3 mb-3">
            <div className="rounded-full overflow-hidden w-14 h-14 flex-shrink-0">
              <img 
                src={dietitian.image} 
                alt={dietitian.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="text-lg font-semibold text-gray-900">{dietitian.name}</h3>
                <Badge className="ml-2 bg-amber-500 text-white text-[10px] h-5 px-1.5">
                  <Award className="w-3 h-3 mr-1" /> PLATINUM DOCTOR
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{dietitian.qualifications}</p>
            </div>
          </div>
          
          {/* Details */}
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">{dietitian.clinic}</p>
            <div className="flex items-center space-x-1 text-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-medium">{dietitian.rating}</span>
              <span className="text-gray-500">({dietitian.reviewCount} reviews)</span>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-center">
            <div className="bg-gray-50 p-2 rounded">
              <p className="font-medium">{dietitian.experience}</p>
              <p className="text-xs text-gray-500">Experience</p>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="font-medium">{dietitian.satisfiedPatients}</p>
              <p className="text-xs text-gray-500">Satisfied Patients</p>
            </div>
          </div>
          
          {/* Appointment Option */}
          <div className="border-t border-gray-200 mt-3 pt-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Rs. {dietitian.fee.replace('$', '')}</span>
            </div>
            <div className="flex items-center mb-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600">{dietitian.availability}</span>
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                onClick={openAppointmentDialog}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
        
        {/* Appointment Dialog */}
        <AppointmentDialog
          open={appointmentDialogOpen}
          onOpenChange={setAppointmentDialogOpen}
          dietitian={dietitian}
        />
      </div>
    );
  } else {
    // List view
    return (
      <div 
        key={dietitian.id}
        className={cn(
          "bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden",
          inView ? "animate-fade-up" : "opacity-0"
        )}
        style={{ animationDelay: `${300 + index * 100}ms` }}
      >
        <div className="p-6">
          {/* Dietitian Header with Image */}
          <div className="flex flex-col md:flex-row">
            {/* Left Section - Image and Basic Info */}
            <div className="md:w-1/4 flex items-start space-x-4">
              <div className="rounded-full overflow-hidden w-16 h-16 flex-shrink-0">
                <img 
                  src={dietitian.image} 
                  alt={dietitian.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <div className="flex items-center flex-wrap gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{dietitian.name}</h3>
                  <Badge className="bg-amber-500 text-white text-[10px] h-5 px-1.5">
                    <Award className="w-3 h-3 mr-1" /> PLATINUM DOCTOR
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">{dietitian.qualifications}</p>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium ml-1">{dietitian.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({dietitian.reviewCount} reviews)</span>
                </div>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                  {dietitian.clinic}, {dietitian.city}
                </p>
              </div>
            </div>
            
            {/* Middle Section - Experience and Consultations */}
            <div className="md:w-2/5 mt-4 md:mt-0 md:px-6">
              <div className="flex flex-wrap gap-4 mb-3">
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="font-medium">{dietitian.experience}</p>
                  <p className="text-xs text-gray-500">Experience</p>
                </div>
                <div className="bg-gray-50 p-3 rounded text-center">
                  <p className="font-medium">{dietitian.satisfiedPatients}</p>
                  <p className="text-xs text-gray-500">Satisfied Patients</p>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{dietitian.fee.replace('$', '')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-600">{dietitian.availability}</span>
                </div>
              </div>
            </div>
            
            {/* Right Section - Actions */}
            <div className="md:w-1/3 flex flex-col justify-center items-end gap-3 mt-4 md:mt-0">
              <Button
                className="w-full md:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white"
                onClick={openAppointmentDialog}
              >
                <Calendar className="h-4 w-4 mr-1.5" />
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
        
        {/* Appointment Dialog */}
        <AppointmentDialog
          open={appointmentDialogOpen}
          onOpenChange={setAppointmentDialogOpen}
          dietitian={dietitian}
        />
      </div>
    );
  }
};

export default DietitianCard;
