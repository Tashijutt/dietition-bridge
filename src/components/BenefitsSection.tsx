
import { useInView } from 'react-intersection-observer';
import { cn } from "@/lib/utils";
import { Salad, Pill, Leaf, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BenefitsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const benefits = [
    {
      icon: <Salad className="w-6 h-6" />,
      title: "Diet Programs",
      description: "Personalized plans for sustainable results."
    },
    {
      icon: <Pill className="w-6 h-6" />,
      title: "Diet Supplements",
      description: "Enhance your nutrition with expert recommendations."
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Vegan Programs",
      description: "Plant-based options for a healthier you."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className={cn(
            "order-2 lg:order-1",
            inView ? "animate-fade-up" : "opacity-0"
          )}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Eat Healthy, Look Healthy, Feel Healthy
            </h2>
            
            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex p-5 bg-white rounded-lg shadow-soft border border-gray-100 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="mr-4 p-3 bg-primary/10 text-primary rounded-full">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className={cn(
            "order-1 lg:order-2",
            inView ? "animate-fade-up" : "opacity-0"
          )}
            style={{ animationDelay: "200ms" }}
          >
            <img 
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Woman enjoying healthy salad" 
              className="w-full h-auto rounded-2xl shadow-lg object-cover"
              style={{ maxHeight: "600px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
