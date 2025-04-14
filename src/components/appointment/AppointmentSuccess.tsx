
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Check, CalendarDays } from "lucide-react";
import { Dietitian } from "../dietitians/dietitianTypes";

interface AppointmentSuccessProps {
  dietitian: Dietitian | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  onClose: () => void;
}

const AppointmentSuccess = ({ dietitian, selectedDate, selectedTime, onClose }: AppointmentSuccessProps) => {
  if (!dietitian || !selectedDate || !selectedTime) return null;
  
  return (
    <div className="p-6 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      
      <h2 className="text-xl font-bold mb-2">Appointment Confirmed!</h2>
      <p className="text-gray-600 mb-6">
        Your appointment has been successfully scheduled.
      </p>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
            <img
              src={dietitian.image}
              alt={dietitian.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <h3 className="font-medium">{dietitian.name}</h3>
            <p className="text-sm text-gray-500">{dietitian.qualifications}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center text-sm">
          <CalendarDays className="h-4 w-4 mr-2 text-primary" />
          <span>{format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}</span>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 mb-6">
        <p>A confirmation has been sent to your phone.</p>
        <p>You'll receive a reminder 30 minutes before your appointment.</p>
      </div>
      
      <Button 
        className="bg-primary hover:bg-primary/90 text-white"
        onClick={onClose}
      >
        Done
      </Button>
    </div>
  );
};

export default AppointmentSuccess;
