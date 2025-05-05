
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, CalendarIcon, X } from "lucide-react";
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

const getNextWorkingDays = (startDate: Date, count: number) => {
  const days = [];
  let date = new Date(startDate);
  while (days.length < count) {
    const dayOfWeek = date.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
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

const getDefaultSlots = () => ({
  afternoonSlots: [
    { time: "01:00 PM", available: true },
    { time: "01:30 PM", available: true },
    { time: "02:00 PM", available: true },
    { time: "02:30 PM", available: true },
    { time: "03:00 PM", available: true },
    { time: "03:30 PM", available: true },
    { time: "04:00 PM", available: true },
    { time: "04:30 PM", available: false },
  ],
  eveningSlots: [
    { time: "05:00 PM", available: true },
    { time: "05:30 PM", available: true },
  ],
});

const AppointmentDialog = ({ open, onOpenChange, dietitian }: AppointmentDialogProps) => {
  const [step, setStep] = useState<Step>("select-date");
  const [sliderStart, setSliderStart] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const dates = getNextWorkingDays(sliderStart, 5);

  const { afternoonSlots, eveningSlots } = getDefaultSlots();

  useEffect(() => {
    if (dates.length > 0 && !dates.find(d => d.value.toDateString() === selectedDate.toDateString())) {
      setSelectedDate(dates[0].value);
      setSelectedTime(null);
    }
  }, [sliderStart]);

  const today = new Date();
  today.setHours(0,0,0,0);

  const sliderCanGoPrev = sliderStart > today;

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("enter-phone");
  };

  const handlePhoneSubmit = () => {
    setStep("verify-otp");
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer(prev => {
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

  const modalBaseClass = "rounded-2xl shadow-xl border border-gray-100 bg-white p-0 relative max-w-full sm:max-w-md";
  const headerFont = "font-semibold text-[1.25rem] leading-tight text-primary mb-2";
  const outerPad = "px-6 pt-7 pb-3";

  const renderContent = () => {
    switch (step) {
      case "select-date":
        return (
          <div className={outerPad}>
            <div className="mb-7">
              <h3 className={headerFont}>Book an Appointment</h3>
              <p className="text-gray-500 mb-2 text-[0.98rem]">{dietitian?.name}</p>
              <div className="flex items-center mb-4 gap-2">
                <div className="rounded-full w-10 h-10 overflow-hidden border border-primary flex-shrink-0">
                  <img src={dietitian?.image} className="w-full h-full object-cover" alt={dietitian?.name} />
                </div>
                <span className="text-sm text-gray-600">{dietitian?.qualifications}</span>
              </div>
            </div>
            <div className="relative flex items-center justify-between gap-2 mb-6">
              <div className="flex-1 flex justify-center">
                <div className="flex w-full max-w-xs mx-auto gap-1 justify-center" style={{ minWidth: 0 }}>
                  {dates.map((date, idx) => (
                    <button
                      key={date.value.toISOString()}
                      onClick={() => {
                        setSelectedDate(date.value);
                        setSelectedTime(null);
                      }}
                      className={cn(
                        "px-3 py-1.5 min-w-[70px] rounded-[7px] text-center font-medium text-[0.97rem] border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary",
                        selectedDate.toDateString() === date.value.toDateString()
                          ? "bg-primary text-white border-primary shadow-card"
                          : "border-gray-200 text-gray-600 bg-white hover:bg-primary/5"
                      )}
                      aria-current={selectedDate.toDateString() === date.value.toDateString()}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {date.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 text-[1.05rem] mb-2">Available Slots</h4>
              <div>
                <div>
                  <div className="flex items-center mb-1 gap-2">
                    <span className="text-amber-500">☀️</span>
                    <span className="text-gray-600 text-sm">Afternoon</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-5">
                    {afternoonSlots.map((slot, idx) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => slot.available && handleTimeSelect(slot.time)}
                        className={cn(
                          "w-full px-2.5 py-2 rounded-md border text-sm select-none transition disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-100 disabled:cursor-not-allowed",
                          selectedTime === slot.time
                            ? "bg-primary text-white border-primary shadow"
                            : slot.available
                            ? "bg-white border-gray-200 text-gray-700 hover:bg-primary/10 hover:text-primary"
                            : "opacity-60"
                        )}
                        style={{ fontFamily: "Inter, sans-serif", minWidth: "75px" }}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-1 gap-2">
                    <span className="text-blue-500">🌙</span>
                    <span className="text-gray-600 text-sm">Evening</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {eveningSlots.map((slot, idx) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => slot.available && handleTimeSelect(slot.time)}
                        className={cn(
                          "w-full px-2.5 py-2 rounded-md border text-sm select-none transition disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-100 disabled:cursor-not-allowed",
                          selectedTime === slot.time
                            ? "bg-primary text-white border-primary shadow"
                            : slot.available
                            ? "bg-white border-gray-200 text-gray-700 hover:bg-primary/10 hover:text-primary"
                            : "opacity-60"
                        )}
                        style={{ fontFamily: "Inter, sans-serif", minWidth: "75px" }}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "enter-phone":
        return (
          <div className="px-8 pt-7 pb-6">
            <h2 className={headerFont + " text-center"}>Enter your Phone Number</h2>
            <p className="text-sm text-gray-500 text-center mb-5 mt-1">We share this information with the doctor</p>
            <div className="flex mb-5">
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
              <div className="mb-7">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Your appointment</h3>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border border-primary/40">
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
              style={{ borderRadius: "8px", fontWeight: 600, fontSize: "1rem" }}
            >
              Continue 
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      case "verify-otp":
        return (
          <div className="px-8 pt-7 pb-6">
            <h2 className={headerFont + " text-center"}>Verify OTP code</h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              A message has been sent to: {formatPhoneForDisplay(phoneNumber)}
              <button 
                className="text-primary ml-1 font-medium"
                onClick={() => setStep("enter-phone")}
                tabIndex={0}
              >
                (Edit)
              </button>
            </p>
            <div className="flex justify-center mb-3">
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
            <p className="text-sm text-center mb-7">
              Resend verification code in {resendTimer > 0 ? `0:${resendTimer.toString().padStart(2, '0')}` : 'now'}
            </p>
            <div className="flex items-center mb-4">
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
              style={{ borderRadius: "8px", fontWeight: 600, fontSize: "1rem" }}
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
      <DialogContent className={modalBaseClass + " w-full max-w-[420px] fixed"}>
        <DialogTitle className="sr-only">Book an Appointment</DialogTitle>
        <button
          className="absolute right-4 top-4 rounded-full p-2 border border-gray-200 bg-white shadow hover:bg-gray-50 transition"
          onClick={handleClose}
          tabIndex={0}
          aria-label="Close"
          style={{ zIndex: 10 }}
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        {step !== "select-date" && step !== "success" && (
          <button 
            onClick={() => setStep(step === "verify-otp" ? "enter-phone" : "select-date")}
            className="absolute left-4 top-4 p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
