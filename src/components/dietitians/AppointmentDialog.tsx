
import { Star } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dietitian } from "./dietitianTypes";

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dietitian: Dietitian | null;
}

const AppointmentDialog = ({ open, onOpenChange, dietitian }: AppointmentDialogProps) => {
  if (!dietitian) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="p-2">
          <h3 className="text-xl font-semibold mb-4">Book an Appointment</h3>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="rounded-full overflow-hidden w-16 h-16 border-2 border-primary">
              <img 
                src={dietitian.image} 
                alt={dietitian.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{dietitian.name}</h3>
              <p className="text-sm text-gray-500">{dietitian.qualifications}</p>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium ml-1">{dietitian.rating}</span>
                <span className="text-sm text-gray-500 ml-1">({dietitian.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-base font-medium mb-1">Available Slots</h4>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button className="p-2 border border-primary text-primary rounded hover:bg-primary/5">
                Today<br />9:00 AM
              </button>
              <button className="p-2 border border-primary text-primary rounded hover:bg-primary/5">
                Today<br />11:30 AM
              </button>
              <button className="p-2 border border-primary text-primary rounded hover:bg-primary/5">
                Today<br />2:00 PM
              </button>
              <button className="p-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Tomorrow<br />10:00 AM
              </button>
              <button className="p-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Tomorrow<br />1:00 PM
              </button>
              <button className="p-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Tomorrow<br />4:30 PM
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-base font-medium mb-1">Fee Information</h4>
            <p className="text-sm mb-1"><span className="font-medium">Consultation Fee:</span> {dietitian.fee}</p>
            <p className="text-sm text-gray-600">The fee covers a 30-minute consultation session.</p>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600"
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
