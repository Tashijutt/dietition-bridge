
import { useInView } from 'react-intersection-observer';
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const WeightLossTips = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const tips = [
    "Focus on balanced meals with protein, healthy fats, and complex carbs",
    "Practice portion control using smaller plates",
    "Stay hydrated by drinking at least 8 glasses of water daily",
    "Include fiber-rich foods to feel fuller longer",
    "Get sufficient sleep (7-8 hours) to regulate hunger hormones",
    "Stay active with both cardio and strength training exercises"
  ];
  
  const foodImages = [
    {
      src: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      alt: "Fresh vegetables",
      label: "Fresh Vegetables"
    },
    {
      src: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      alt: "Seafood dish",
      label: "Seafood"
    },
    {
      src: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      alt: "Fruit salad",
      label: "Fresh Fruits"
    },
    {
      src: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      alt: "Whole grains",
      label: "Whole Grains"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-12",
            inView ? "animate-fade-up" : "opacity-0"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            The Fastest Way to Lose Weight Naturally
          </h2>
          <p className="text-xl text-gray-600">
            Our expert dietitians recommend these evidence-based strategies for healthy weight management
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div className={cn(
            "",
            inView ? "animate-fade-up" : "opacity-0"
          )}
            style={{ animationDelay: "200ms" }}
          >
            <ul className="space-y-4">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-nutrition-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-lg text-gray-700">{tip}</p>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <Link 
                to="/weight-loss-tips" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-nutrition-600 text-white font-medium rounded-lg hover:bg-nutrition-700 transition-colors"
              >
                Get More Tips
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className={cn(
            "grid grid-cols-2 gap-6",
            inView ? "animate-fade-up" : "opacity-0"
          )}
            style={{ animationDelay: "400ms" }}
          >
            {foodImages.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md group">
                <div className="relative h-60">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <span className="text-white font-medium">{image.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeightLossTips;
