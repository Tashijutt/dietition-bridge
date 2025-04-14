
import { useState } from "react";
import { useInView } from 'react-intersection-observer';
import { cn } from "@/lib/utils";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WeightLossTips = () => {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = [
    "All Tips",
    "Nutrition",
    "Exercise",
    "Lifestyle",
    "Mindfulness",
    "Hydration"
  ];

  const [activeCategory, setActiveCategory] = useState("All Tips");

  const tips = [
    {
      category: "Nutrition",
      title: "Increase Protein Intake",
      description: "Aim for 25-30% of your calories from protein. This reduces appetite, boosts metabolism, and helps preserve muscle mass during weight loss.",
      image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      category: "Nutrition",
      title: "Eat More Fiber",
      description: "Add whole grains, fruits, vegetables, nuts, and seeds to your diet. Fiber helps you feel fuller longer and improves digestive health.",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      category: "Exercise",
      title: "Combine Cardio and Strength Training",
      description: "For optimal weight loss, include both aerobic exercise and resistance training in your fitness routine.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      category: "Lifestyle",
      title: "Prioritize Sleep",
      description: "Aim for 7-9 hours of quality sleep per night. Poor sleep can increase hunger hormones and lead to weight gain.",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      category: "Mindfulness",
      title: "Practice Mindful Eating",
      description: "Slow down, savor each bite, and pay attention to hunger and fullness cues to prevent overeating.",
      image: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      category: "Hydration",
      title: "Drink Water Before Meals",
      description: "Drinking water 30 minutes before meals can help reduce calorie intake and support weight loss.",
      image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      category: "Nutrition",
      title: "Plan Your Meals",
      description: "Prepare meals in advance to avoid impulsive, unhealthy food choices when hungry.",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      category: "Exercise",
      title: "Take 10,000 Steps Daily",
      description: "Increasing your daily step count promotes calorie burning and supports weight loss goals.",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      category: "Lifestyle",
      title: "Manage Stress",
      description: "Practice stress reduction techniques like meditation, yoga, or deep breathing to prevent stress-related eating.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const filteredTips = activeCategory === "All Tips" 
    ? tips 
    : tips.filter(tip => tip.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div 
          ref={headerRef}
          className={cn(
            "bg-gradient-to-r from-nutrition-50 to-health-50 py-20 px-4",
            headerInView ? "animate-fade-up" : "opacity-0"
          )}
        >
          <div className="container mx-auto max-w-4xl text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Evidence-Based Weight Loss Tips
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practical strategies recommended by our professional dietitians for safe and sustainable weight management
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 py-2 rounded-full transition-all",
                  activeCategory === category
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tips Grid */}
          <div 
            ref={contentRef}
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
              contentInView ? "animate-fade-up" : "opacity-0"
            )}
          >
            {filteredTips.map((tip, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={tip.image} 
                    alt={tip.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105" 
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {tip.category}
                  </span>
                  <h3 className="text-xl font-bold mt-3 mb-2">{tip.title}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredTips.length === 0 && (
            <div className="text-center py-10">
              <p className="text-lg text-gray-500">No tips found for this category.</p>
            </div>
          )}

          {/* General Advice Section */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">General Weight Loss Advice</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-1" />
                <p>Focus on sustainable lifestyle changes rather than quick fixes or extreme diets</p>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-1" />
                <p>Set realistic goals – aim for 1-2 pounds of weight loss per week</p>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-1" />
                <p>Track your food intake with a journal or app to increase awareness</p>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-1" />
                <p>Consult with a professional dietitian for personalized guidance</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WeightLossTips;
