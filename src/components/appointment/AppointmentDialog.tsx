
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Dietitian } from "../dietitians/dietitianTypes";
import AppointmentSuccess from "./AppointmentSuccess";

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dietitian: Dietitian | null;
}

type Step = "select-date" | "enter-phone" | "verify-otp" | "success";

interface TimeSlot {
  time: string;
  available: boolean;
}

const AppointmentDialog = ({ open, onOpenChange, dietitian }: AppointmentDialogProps) => {
  const [step, setStep] = useState<Step>("select-date");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  
  // Generate next 5 working days (Mon-Fri) starting from today
  const getNextWorkingDays = (count: number) => {
    const days = [];
    let date = new Date();
    while (days.length < count) {
      const day = date.getDay();
      if (day !== 0 && day !== 6) { // 0 = Sunday, 6 = Saturday
        days.push({
          label:
            days.length === 0
              ? `Today, ${date.getDate()}`
              : `${date.toLocaleString("default", { month: "short" })}. ${date.getDate()}`,
          value: new Date(date),
        });
      }
      date.setDate(date.getDate() + 1);
    }
    return days;
  };
  const dates = getNextWorkingDays(5);
  
  const afternoonSlots: TimeSlot[] = [
    { time: "01:00 PM", available: true },
    { time: "01:30 PM", available: true },
    { time: "02:00 PM", available: true },
    { time: "02:30 PM", available: true },
    { time: "03:00 PM", available: true },
    { time: "03:30 PM", available: true },
    { time: "04:00 PM", available: true },
    { time: "04:30 PM", available: false },
  ];
  
  const eveningSlots: TimeSlot[] = [
    { time: "05:00 PM", available: true },
    { time: "05:30 PM", available: true },
  ];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("enter-phone");
  };

  const handlePhoneSubmit = () => {
    // In a real app, this would trigger an API call to send OTP
    setStep("verify-otp");
    
    // Start countdown for resend code
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOtp = () => {
    // In a real app, this would verify the OTP with an API
    setStep("success");
  };

  const handleClose = () => {
    // Reset states when closing
    setStep("select-date");
    setSelectedTime(null);
    setPhoneNumber("");
    setOtpValue("");
    onOpenChange(false);
  };

  const formatPhoneForDisplay = (phone: string) => {
    // Only show full number with partial masking for privacy
    return phone ? "0" + phone : "";
  };

  // Conditionally render content based on current step
  const renderContent = () => {
    switch (step) {
      case "select-date":
        return (
          <div className="p-2">
            {/* Date Slider */}
            <div className="flex items-center justify-between mb-6 border-b pb-4 relative">
              {/* Left scroll button - only visible when there are items to scroll to */}
              <div className="absolute left-0 z-10">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0 transition-opacity duration-200"
                  onClick={() => {
                    const container = document.getElementById('date-slider');
                    if (container) {
                      container.scrollBy({ left: -100, behavior: 'smooth' });
                    }
                  }}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div 
                id="date-slider"
                className="flex space-x-4 overflow-x-auto scrollbar-hide mx-10 w-full" 
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {dates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(date.value)}
                    className={cn(
                      "px-3 py-2 text-sm font-medium text-center flex-shrink-0 transition-colors relative",
                      selectedDate.toDateString() === date.value.toDateString() 
                        ? "text-primary" 
                        : "text-gray-600 hover:text-primary"
                    )}
                  >
                    {date.label}
                    {selectedDate.toDateString() === date.value.toDateString() && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Right scroll button - only visible when there are items to scroll to */}
              <div className="absolute right-0 z-10">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0 transition-opacity duration-200"
                  onClick={() => {
                    const container = document.getElementById('date-slider');
                    if (container) {
                      container.scrollBy({ left: 100, behavior: 'smooth' });
                    }
                  }}
                >
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            {/* Afternoon Slots */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <span className="text-amber-500 mr-2">☀️</span>
                <h3 className="text-sm font-medium text-gray-600">Afternoon Slots</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {afternoonSlots.map((slot, index) => (
                  <button
                    key={index}
                    disabled={!slot.available}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                    className={cn(
                      "py-2 px-1 text-center border rounded-md text-sm transition-colors whitespace-nowrap overflow-hidden text-ellipsis",
                      selectedTime === slot.time
                        ? "border-primary bg-primary/5 text-primary"
                        : slot.available
                        ? "border-gray-200 hover:border-primary hover:text-primary"
                        : "border-gray-100 text-gray-300 cursor-not-allowed"
                    )}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Evening Slots */}
            <div>
              <div className="flex items-center mb-3">
                <span className="text-blue-500 mr-2">🌙</span>
                <h3 className="text-sm font-medium text-gray-600">Evening Slots</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {eveningSlots.map((slot, index) => (
                  <button
                    key={index}
                    disabled={!slot.available}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                    className={cn(
                      "py-2 px-1 text-center border rounded-md text-sm transition-colors whitespace-nowrap overflow-hidden text-ellipsis",
                      selectedTime === slot.time
                        ? "border-primary bg-primary/5 text-primary"
                        : slot.available
                        ? "border-gray-200 hover:border-primary hover:text-primary"
                        : "border-gray-100 text-gray-300 cursor-not-allowed"
                    )}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "enter-phone":
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-center mb-2">Enter your Phone Number</h2>
            <p className="text-sm text-gray-500 text-center mb-6">We share this information with the doctor</p>
            
            <div className="flex mb-6">
              <div className="bg-gray-100 border border-gray-200 rounded-l-md px-3 flex items-center text-sm">
                +92
              </div>
              <Input 
                type="tel"
                placeholder="Enter your phone number"
                className="flex-1 rounded-l-none"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                maxLength={10}
              />
            </div>
            
            {dietitian && selectedTime && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Your appointment</h3>
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      <img 
                        src={dietitian.image} 
                        alt={dietitian.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <span className="font-medium">{dietitian.name}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">
                      {format(selectedDate, "MMM d")}, {selectedTime}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <Button 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handlePhoneSubmit}
              disabled={phoneNumber.length < 10}
            >
              Continue 
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case "verify-otp":
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-center mb-2">Verify OTP code</h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              A message has been sent to: {formatPhoneForDisplay(phoneNumber)}
              <button 
                className="text-primary ml-1"
                onClick={() => setStep("enter-phone")}
              >
                (Edit)
              </button>
            </p>
            
            <div className="flex justify-center mb-4">
              <InputOTP
                value={otpValue}
                onChange={setOtpValue}
                maxLength={6}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <p className="text-sm text-center mb-8">
              Resend verification code in {resendTimer > 0 ? `0:${resendTimer.toString().padStart(2, '0')}` : 'now'}
            </p>
            
            <div className="flex items-center mb-5">
              <Checkbox 
                id="remember" 
                checked={rememberMe} 
                onCheckedChange={(checked) => setRememberMe(!!checked)} 
              />
              <label htmlFor="remember" className="ml-2 text-sm">Remember me</label>
            </div>
            
            <Button 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleVerifyOtp}
              disabled={otpValue.length < 6}
            >
              Verify & Login
            </Button>
          </div>
        );

      case "success":
        return <AppointmentSuccess dietitian={dietitian} selectedDate={selectedDate} selectedTime={selectedTime} onClose={handleClose} />;

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-lg shadow-lg">
        {step !== "select-date" && step !== "success" && (
          <button 
            onClick={() => setStep(step === "verify-otp" ? "enter-phone" : "select-date")}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
        
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
