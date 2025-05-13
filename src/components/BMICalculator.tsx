import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { getAIResponse } from "@/utils/aiService"; // Add this import
import TypingEffect from "@/components/TypingEffect";

const healthConditionOptions = [
  "Diabetes",
  "Hypertension",
  "Heart Issues",
  "None"
];

const allergyOptions = [
  "Beef",
  "Eggs",
  "Nuts",
  "Seafood",
  "None"
];

interface BMIFormData {
  age: string;
  weight: string;
  height: string;
  bmi: string;
  healthConditions: string[];
  dietaryPreference: string;
  allergies: string[];
  mealsPerDay: string;
  snacksPerDay: string;
}

interface BMICalculatorProps {
  userId?: string;
  onPlanSaved?: (planId: string) => void;
}

const BMICalculator = ({ userId, onPlanSaved }: BMICalculatorProps) => {
  const [bmiDialogOpen, setBmiDialogOpen] = useState(false);
  const [dietPlanDialogOpen, setDietPlanDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [typedPlan, setTypedPlan] = useState("");
  const [fullPlan, setFullPlan] = useState("");
  const [bmiForm, setBmiForm] = useState<BMIFormData>({
    age: "",
    weight: "",
    height: "",
    bmi: "",
    healthConditions: [],
    dietaryPreference: "",
    allergies: [],
    mealsPerDay: "",
    snacksPerDay: ""
  });
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  // Load saved profile if exists
  useEffect(() => {
    const savedProfile = localStorage.getItem("dietPlanProfile");
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setBmiForm(profile);
      } catch (error) {
        console.error("Error loading saved profile:", error);
      }
    }
  }, []);

  // Calculate BMI whenever weight or height changes
  useEffect(() => {
    const weight = parseFloat(bmiForm.weight);
    const heightCm = parseFloat(bmiForm.height);
    if (weight > 0 && heightCm > 0) {
      const heightM = heightCm / 100;
      const bmi = weight / (heightM * heightM);
      setBmiForm((prev) => ({ ...prev, bmi: bmi.toFixed(1) }));
    } else {
      setBmiForm((prev) => ({ ...prev, bmi: "" }));
    }
  }, [bmiForm.weight, bmiForm.height]);

  const handleBmiFormChange = (field: keyof BMIFormData, value: string) => {
    setBmiForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field: "healthConditions" | "allergies", value: string) => {
    setBmiForm((prev) => {
      let arr = [...prev[field]];
      if (arr.includes(value)) {
        arr = arr.filter((v) => v !== value);
      } else {
        if (value === "None") {
          arr = ["None"];
        } else {
          arr = arr.filter((v) => v !== "None");
          arr.push(value);
        }
      }
      return { ...prev, [field]: arr };
    });
  };

  const canSubmit =
    bmiForm.age &&
    bmiForm.weight &&
    bmiForm.height &&
    bmiForm.bmi &&
    bmiForm.healthConditions.length > 0 &&
    bmiForm.dietaryPreference &&
    bmiForm.allergies.length > 0 &&
    bmiForm.mealsPerDay &&
    bmiForm.snacksPerDay;

  const handleCreateDietPlan = async () => {
    setIsGenerating(true);
    setTypedPlan("");
    setFullPlan("");
    setBmiDialogOpen(false);
    setDietPlanDialogOpen(true);
    
    // Compose prompt for AI
    const prompt = `
Create a personalized diet plan based on the following information:

User Info:
- Age: ${bmiForm.age} years
- Weight: ${bmiForm.weight} kg
- Height: ${bmiForm.height} cm
- BMI: ${bmiForm.bmi}
- Health Conditions: ${bmiForm.healthConditions.join(", ")}
- Dietary Preference: ${bmiForm.dietaryPreference}
- Allergies: ${bmiForm.allergies.join(", ")}
- Meals per day: ${bmiForm.mealsPerDay}
- Snacks per day: ${bmiForm.snacksPerDay}

Please provide a comprehensive diet plan that includes:
1. A brief overview of their health status based on BMI
2. Daily caloric intake recommendation
3. Macronutrient distribution (protein, carbs, fats)
4. Detailed meal plan for one week with exact portions
5. Recommended foods to include and avoid
6. Hydration recommendations
7. Any supplements that might be beneficial

Format the plan professionally with clear sections and headings.
    `.trim();
    
    setAiPrompt(prompt);
    
    try {
      const response = await getAIResponse(prompt);
      setFullPlan(response);
      // Typing effect
      let i = 0;
      setTypedPlan("");
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = setInterval(() => {
        setTypedPlan((prev) => {
          if (i >= response.length) {
            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
            setIsGenerating(false);
            setGeneratedPlan(response); // Save for "Save" and "Add" buttons
            return response;
          }
          const next = prev + response[i];
          i++;
          return next;
        });
      }, 18);
      localStorage.setItem("dietPlanProfile", JSON.stringify(bmiForm));
    } catch (error) {
      setIsGenerating(false);
      setTypedPlan("Sorry, there was an error generating your diet plan. Please try again.");
    }
  };

  const handleSaveDietPlan = async () => {
    if (!generatedPlan) return;
    
    setIsSaving(true);
    try {
      // Save to database
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/plans`, {
        userId,
        title: `Diet Plan (BMI: ${bmiForm.bmi})`,
        content: generatedPlan,
        metadata: {
          ...bmiForm,
          createdAt: new Date().toISOString()
        }
      });
      
      if (onPlanSaved && response.data.id) {
        onPlanSaved(response.data.id);
      }
      
      setDietPlanDialogOpen(false);
      // Show success notification or redirect
    } catch (error) {
      console.error("Error saving diet plan:", error);
      // Show error notification
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddDietitianPlan = async () => {
    if (!generatedPlan) return;
    setIsSaving(true);
    try {
      // Example: Save the plan to user's diet plans (adapt as needed)
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/plans`, {
        userId,
        title: `Dietitian Plan (BMI: ${bmiForm.bmi})`,
        content: generatedPlan,
        metadata: {
          ...bmiForm,
          createdAt: new Date().toISOString()
        }
      });
      // Optionally, show a success notification or update state
      setDietPlanDialogOpen(false);
      // Optionally, call onPlanSaved if you want to update parent state
      if (onPlanSaved && response.data.id) {
        onPlanSaved(response.data.id);
      }
    } catch (error) {
      console.error("Error adding dietitian plan:", error);
      // Optionally, show an error notification
    } finally {
      setIsSaving(false);
    }
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!bmiDialogOpen) {
      setTimeout(() => {
        setBmiForm({
          age: "",
          weight: "",
          height: "",
          bmi: "",
          healthConditions: [],
          dietaryPreference: "",
          allergies: [],
          mealsPerDay: "",
          snacksPerDay: ""
        });
      }, 300); // Delay to allow modal close animation
    }
  }, [bmiDialogOpen]);

  return (
    <>
      <Button onClick={() => setBmiDialogOpen(true)}>Calculate BMI</Button>
      {/* BMI Form Dialog */}
      <Dialog open={bmiDialogOpen} onOpenChange={setBmiDialogOpen}>
        <DialogContent
          className="max-w-lg w-full rounded-2xl shadow-2xl border border-gray-100 bg-white p-0 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-700 text-center py-4">
              Calculate BMI & Generate Diet Plan
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Years"
                  value={bmiForm.age}
                  onChange={e => handleBmiFormChange("age", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="kg"
                  value={bmiForm.weight}
                  onChange={e => handleBmiFormChange("weight", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="cm"
                  value={bmiForm.height}
                  onChange={e => handleBmiFormChange("height", e.target.value)}
                />
              </div>
            </div>
            
            {bmiForm.bmi && (
              <div className="text-center p-3 bg-blue-50 rounded-md border border-blue-100">
                <div className="text-sm text-blue-600 font-medium">Your BMI</div>
                <div className="text-2xl font-bold text-blue-700">{bmiForm.bmi}</div>
                <div className="text-xs text-blue-600 mt-1">
                  {parseFloat(bmiForm.bmi) < 18.5 
                    ? "Underweight" 
                    : parseFloat(bmiForm.bmi) < 25 
                    ? "Normal weight" 
                    : parseFloat(bmiForm.bmi) < 30 
                    ? "Overweight" 
                    : "Obese"}
                </div>
              </div>
            )}
            
            {/* Health Conditions */}
            <div className="space-y-2">
              <Label>Health Conditions</Label>
              <div className="grid grid-cols-2 gap-2">
                {healthConditionOptions.map(opt => (
                  <div key={opt} className="flex items-center space-x-2">
                    <Checkbox
                      id={`health-${opt}`}
                      checked={bmiForm.healthConditions.includes(opt)}
                      onCheckedChange={() => handleMultiSelect("healthConditions", opt)}
                    />
                    <Label htmlFor={`health-${opt}`} className="cursor-pointer">{opt}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Dietary Preference as checkboxes */}
            <div className="space-y-2">
              <Label>Dietary Preference</Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="veg"
                    checked={bmiForm.dietaryPreference === "Vegetarian"}
                    onCheckedChange={() =>
                      handleBmiFormChange(
                        "dietaryPreference",
                        bmiForm.dietaryPreference === "Vegetarian" ? "" : "Vegetarian"
                      )
                    }
                  />
                  <Label htmlFor="veg">Vegetarian</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="nonveg"
                    checked={bmiForm.dietaryPreference === "Non-Vegetarian"}
                    onCheckedChange={() =>
                      handleBmiFormChange(
                        "dietaryPreference",
                        bmiForm.dietaryPreference === "Non-Vegetarian" ? "" : "Non-Vegetarian"
                      )
                    }
                  />
                  <Label htmlFor="nonveg">Non-Vegetarian</Label>
                </div>
              </div>
            </div>
            
            {/* Allergies */}
            <div className="space-y-2">
              <Label>Allergies</Label>
              <div className="grid grid-cols-2 gap-2">
                {allergyOptions.map(opt => (
                  <div key={opt} className="flex items-center space-x-2">
                    <Checkbox
                      id={`allergy-${opt}`}
                      checked={bmiForm.allergies.includes(opt)}
                      onCheckedChange={() => handleMultiSelect("allergies", opt)}
                    />
                    <Label htmlFor={`allergy-${opt}`} className="cursor-pointer">{opt}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Meals and Snacks */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="meals">Meals per day</Label>
                <Select
                  value={bmiForm.mealsPerDay}
                  onValueChange={val => handleBmiFormChange("mealsPerDay", val)}
                >
                  <SelectTrigger id="meals">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[2,3,4,5,6].map(n => (
                      <SelectItem key={n} value={String(n)}>{n} Meals</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="snacks">Snacks per day</Label>
                <Select
                  value={bmiForm.snacksPerDay}
                  onValueChange={val => handleBmiFormChange("snacksPerDay", val)}
                >
                  <SelectTrigger id="snacks">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[0,1,2,3,4].map(n => (
                      <SelectItem key={n} value={String(n)}>{n} Snacks</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button
              className="w-full mt-2"
              disabled={!canSubmit}
              onClick={handleCreateDietPlan}
            >
              Create Diet Plan for Me
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diet Plan Result Dialog */}
      <Dialog open={dietPlanDialogOpen} onOpenChange={setDietPlanDialogOpen}>
        <DialogContent
          className="max-w-3xl w-full rounded-2xl shadow-2xl border border-gray-100 bg-white p-0 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          <DialogHeader className="px-8 pt-8 pb-2">
            <DialogTitle className="text-2xl font-bold text-blue-700">
              Your Personalized Diet Plan
            </DialogTitle>
          </DialogHeader>
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-16">
              {/* Animated dots loader */}
              <div className="flex space-x-2 mt-8">
                <div className="w-3 h-3 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="w-3 h-3 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-3 h-3 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
              <p className="text-center text-gray-500 mt-6 text-lg font-medium">
                Generating your personalized diet plan...
              </p>
            </div>
          ) : (
            <div className="space-y-4 px-8 pb-8">
              <div className="prose max-w-none whitespace-pre-wrap text-gray-900 text-base leading-relaxed">
                {fullPlan && (
                  <TypingEffect
                    text={
                      // Remove any trailing "undefined" or similar artifacts
                      (fullPlan || "").replace(/undefined\s*$/gi, "").trim()
                    }
                    speed={18}
                  />
                )}
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setDietPlanDialogOpen(false)}>
                  Close
                </Button>
                <Button
                  onClick={handleAddDietitianPlan}
                  disabled={isSaving}
                  className="bg-blue-600 text-white"
                >
                  Add Dietitian Plan
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BMICalculator;