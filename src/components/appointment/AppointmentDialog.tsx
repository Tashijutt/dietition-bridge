
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, CalendarIcon } from "lucide-react";
import { format, addDays, isWeekend } from "date-fns";
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

const afternoonSlots: TimeSlot[] = [
  { time: "12:00 PM", available: true },
  { time: "12:30 PM", available: false },
  { time: "1:00 PM", available: true },
  { time: "1:30 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: false },
  { time: "3:00 PM", available: true },
  { time: "3:30 PM", available: true }
];

const eveningSlots: TimeSlot[] = [
  { time: "4:00 PM", available: true },
  { time: "4:30 PM", available: false },
  { time: "5:00 PM", available: true },
  { time: "5:30 PM", available: true },
  { time: "6:00 PM", available: true },
  { time: "6:30 PM", available: false },
  { time: "7:00 PM", available: false },
  { time: "7:30 PM", available: true }
];

const getNextWorkingDay = (date: Date): Date => {
  let nextDay = addDays(date, 1);
  while (isWeekend(nextDay)) {
    nextDay = addDays(nextDay, 1);
  }
  return nextDay;
};

const getWorkingDays = (startDate: Date): Date[] => {
  const days: Date[] = [];
  let currentDate = startDate;

  // If start date is weekend, move to next working day
  while (isWeekend(currentDate)) {
    currentDate = addDays(currentDate, 1);
  }

  days.push(currentDate);

  // Get next 4 working days (total 5 days including start date)
  while (days.length < 5) {
    currentDate = getNextWorkingDay(currentDate);
    days.push(currentDate);
  }

  return days;
};

const AppointmentDialog = ({ open, onOpenChange, dietitian }: AppointmentDialogProps) => {
  const [step, setStep] = useState<Step>("select-date");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [workingDays, setWorkingDays] = useState<Date[]>([]);
  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  
  useEffect(() => {
    if (open) {
      // Initialize workingDays with 5 working days starting from today
      const today = new Date();
      const days = getWorkingDays(today);
      setWorkingDays(days);
      setSelectedDate(days[0]);
      setCurrentDateIndex(0);
    }
  }, [open]);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("enter-phone");
  };

  const handlePhoneSubmit = () => {
    setStep("verify-otp");
    
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
    setStep("success");
  };

  const handleClose = () => {
    setStep("select-date");
    setSelectedTime(null);
    setPhoneNumber("");
    setOtpValue("");
    onOpenChange(false);
  };

  const formatPhoneForDisplay = (phone: string) => {
    return phone ? "0" + phone : "";
  };

  const handleNextDates = () => {
    if (currentDateIndex + 5 < workingDays.length) {
      setCurrentDateIndex(prev => prev + 1);
    } else {
      // Get the next set of working days
      const lastDate = workingDays[workingDays.length - 1];
      const nextDay = getNextWorkingDay(lastDate);
      const nextWorkingDays = getWorkingDays(nextDay);
      
      // Add next set of working days
      setWorkingDays(prev => [...prev, ...nextWorkingDays]);
      setCurrentDateIndex(prev => prev + 1);
    }
  };

  const handlePrevDates = () => {
    if (currentDateIndex > 0) {
      setCurrentDateIndex(prev => prev - 1);
    }
  };

  const renderContent = () => {
    switch (step) {
      case "select-date":
        return (
          <div className="p-2">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <button 
                className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
                onClick={handlePrevDates}
                disabled={currentDateIndex === 0}
              >
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </button>
              
              <div className="flex space-x-5 overflow-x-auto no-scrollbar">
                {workingDays.slice(currentDateIndex, currentDateIndex + 5).map((date, index) => {
                  const isToday = new Date().toDateString() === date.toDateString();
                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => setSelectedDate(date)}
                      className={cn(
                        "px-4 py-2 text-sm font-medium text-center flex-shrink-0 transition-colors relative",
                        selectedDate.toDateString() === date.toDateString() 
                          ? "text-primary" 
                          : "text-gray-600 hover:text-primary"
                      )}
                    >
                      {isToday ? "Today" : format(date, "MMM d")}
                      {selectedDate.toDateString() === date.toDateString() && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                      )}
                    </button>
                  );
                })}
              </div>
              
              <button 
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={handleNextDates}
              >
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <span className="text-amber-500 mr-2">☀️</span>
                <h3 className="text-sm font-medium text-gray-600">Afternoon Slots</h3>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {afternoonSlots.map((slot, index) => (
                  <button
                    key={index}
                    disabled={!slot.available}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                    className={cn(
                      "py-2 text-center border rounded-md text-sm transition-colors",
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
            
            <div>
              <div className="flex items-center mb-3">
                <span className="text-blue-500 mr-2">🌙</span>
                <h3 className="text-sm font-medium text-gray-600">Evening Slots</h3>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {eveningSlots.map((slot, index) => (
                  <button
                    key={index}
                    disabled={!slot.available}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                    className={cn(
                      "py-2 text-center border rounded-md text-sm transition-colors",
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
      <DialogContent className="sm:max-w-md p-0">
        {step !== "select-date" && step !== "success" && (
          <button 
            onClick={() => setStep(step === "verify-otp" ? "enter-phone" : "select-date")}
            className="absolute left-4 top-4 p-1 rounded-full hover:bg-gray-100"
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
