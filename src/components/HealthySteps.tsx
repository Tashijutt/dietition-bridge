
import { useInView } from 'react-intersection-observer';
import { cn } from "@/lib/utils";
import { CheckSquare, Calendar, BarChart3, Utensils } from "lucide-react";

const HealthySteps = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const steps = [
    {
      icon: <CheckSquare className="w-8 h-8" />,
      number: "01",
      title: "Choose Your Option",
      description: "Select a plan that fits your goals and health needs."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      number: "02",
      title: "Set the Data",
      description: "Input your preferences, allergies, and nutritional requirements."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      number: "03",
      title: "Manage Consistency",
      description: "Follow your tailored routine with easy tracking and adjustments."
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      number: "04",
      title: "Enjoy Your Diet",
      description: "Thrive with delicious, nutritious meals you'll love eating."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16",
            inView ? "animate-fade-up" : "opacity-0"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Your Path to a Healthier You in Four Simple Steps
          </h2>
          <p className="text-xl text-gray-600">
            We've streamlined the journey to better nutrition with our proven process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={cn(
                "relative p-6 bg-white rounded-lg shadow-soft border border-gray-100 hover:border-primary/20 transition-all duration-300",
                inView ? "animate-fade-up" : "opacity-0"
              )}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                {step.number}
              </div>
              <div className="text-primary mb-5">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthySteps;
