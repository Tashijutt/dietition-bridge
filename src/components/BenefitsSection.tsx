
import { useInView } from 'react-intersection-observer';
import { cn } from "@/lib/utils";
import { Activity, DollarSign, BarChart2, LineChart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BenefitsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "$0",
      description: "out-of-pocket for most commercial plans"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "+12%",
      description: "improvement in physical quality of life"
    },
    {
      icon: <BarChart2 className="w-8 h-8" />,
      title: "+5%",
      description: "increase for mental quality of life"
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "-10%",
      description: "decrease in blood sugar levels"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div ref={ref} className={cn(
          "rounded-2xl bg-[#004D40] text-white p-10 md:p-16",
          inView ? "animate-fade-up" : "opacity-0"
        )}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Working with a dietitian can significantly improve your health
              </h2>
              
              <div className="mt-8">
                <img 
                  src="/lovable-uploads/ab80068f-64c3-45ff-9a71-f01ee99a4c32.png" 
                  alt="Green vegetable icon" 
                  className="w-32 h-auto"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center md:text-left">
                  <div className="text-4xl md:text-5xl font-bold text-[#4CAF50] mb-2">
                    {benefit.title}
                  </div>
                  <p className="text-white/80">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
