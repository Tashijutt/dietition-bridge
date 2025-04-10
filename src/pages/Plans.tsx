
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingPlans from "@/components/PricingPlans";
import { ArrowLeft, Star, Download, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample free diet plans
const freeDietPlans = [
  {
    id: "free1",
    title: "Balanced Nutrition Plan",
    description: "A well-balanced diet plan suitable for most adults seeking to maintain healthy weight.",
    category: "General Health",
    duration: "4 weeks",
    dietitianName: "Dr. Ayesha Khan",
    dietitianCredentials: "PhD in Nutritional Sciences",
    popularity: 4.8,
    downloads: 1250,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop",
    preview: [
      "Breakfast: Whole grain paratha with yogurt",
      "Lunch: Grilled chicken with brown rice and vegetables",
      "Dinner: Lentil soup with whole grain roti"
    ]
  },
  {
    id: "free2",
    title: "Diabetes Management Diet",
    description: "Specially designed plan to help manage blood sugar levels with traditional Pakistani foods.",
    category: "Medical Condition",
    duration: "6 weeks",
    dietitianName: "Dr. Farhan Ahmed",
    dietitianCredentials: "Specialist in Diabetic Care",
    popularity: 4.9,
    downloads: 2100,
    image: "https://images.unsplash.com/photo-1605493725784-84d97448829d?q=80&w=1974&auto=format&fit=crop",
    preview: [
      "Breakfast: Egg whites with whole wheat toast",
      "Lunch: Chicken tikka with brown rice and salad",
      "Dinner: Vegetable curry with minimal oil"
    ]
  },
  {
    id: "free3",
    title: "Heart Health Diet",
    description: "Low sodium, heart-healthy diet plan with delicious Pakistani cuisine alternatives.",
    category: "Medical Condition",
    duration: "8 weeks",
    dietitianName: "Dr. Sana Malik",
    dietitianCredentials: "Cardiac Nutrition Specialist",
    popularity: 4.7,
    downloads: 980,
    image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=1978&auto=format&fit=crop",
    preview: [
      "Breakfast: Oatmeal with nuts and seeds",
      "Lunch: Baked fish with vegetables",
      "Dinner: Daal with minimal salt and whole grain roti"
    ]
  },
  {
    id: "free4",
    title: "Weight Loss Plan",
    description: "Effective and sustainable weight loss diet without compromising on taste.",
    category: "Weight Management",
    duration: "12 weeks",
    dietitianName: "Dr. Imran Habib",
    dietitianCredentials: "Weight Management Expert",
    popularity: 4.9,
    downloads: 3200,
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2070&auto=format&fit=crop",
    preview: [
      "Breakfast: Vegetable omelette with one roti",
      "Lunch: Grilled chicken breast with salad",
      "Dinner: Clear soup with vegetable cutlets"
    ]
  }
];

const Plans = () => {
  const [showPlans, setShowPlans] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Add this useEffect to ensure the page starts from the top
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Animation effect for staggered appearance
    const timer = setTimeout(() => {
      setShowPlans(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = (planId) => {
    toast({
      title: "Download Started",
      description: "Your diet plan is being downloaded.",
    });
    // In a real app, this would trigger the actual download
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 pt-32 pb-12">
          <div className="max-w-6xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Nutrition Plans
              </h1>
              <p className="text-xl text-gray-600">
                Explore our range of personalized nutrition and diet plans designed by professional dietitians to help you achieve your health goals.
              </p>
            </div>

            {/* Free Diet Plans Section */}
            <div className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Free Diet Plans</h2>
                <div className="text-sm text-gray-500">
                  Curated by top nutrition specialists
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {freeDietPlans.map((plan, index) => (
                  <Card 
                    key={plan.id} 
                    className={`overflow-hidden transition-all duration-500 hover:shadow-md ${showPlans ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
                    style={{ 
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={plan.image} 
                        alt={plan.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <Badge 
                        className="absolute top-3 right-3" 
                        variant="secondary"
                      >
                        {plan.category}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-5">
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-gray-900 line-clamp-1">{plan.title}</h3>
                          <div className="flex items-center text-amber-500">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <span className="text-xs ml-1">{plan.popularity}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{plan.description}</p>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-3 justify-between">
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>{plan.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <Download className="h-3.5 w-3.5 mr-1" />
                            <span>{plan.downloads}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {plan.dietitianName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-xs">
                            <p className="font-medium">{plan.dietitianName}</p>
                            <p className="text-gray-500">{plan.dietitianCredentials}</p>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleDownload(plan.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Free
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Premium Plans Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Premium Nutrition Plans</h2>
              <PricingPlans />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {/* ChatWidget removed from Plans page */}
    </div>
  );
};

export default Plans;
