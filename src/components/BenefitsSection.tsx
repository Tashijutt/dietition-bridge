
import { useInView } from 'react-intersection-observer';
import { cn } from "@/lib/utils";
import { Activity, DollarSign, BarChart2, LineChart, ArrowRight } from "lucide-react";

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
              
              <p className="text-white/90 mb-4 text-lg">
                Research demonstrates that nutritional counseling from registered dietitians leads to measurable improvements in health outcomes across various conditions.
              </p>
              
              <p className="text-white/90 mb-4">
                Our dietitians create personalized nutrition plans based on your unique health profile, food preferences, and lifestyle factors. These evidence-based interventions address both immediate concerns and long-term wellness goals.
              </p>
              
              <p className="text-white/90">
                Many insurance plans cover medical nutrition therapy with minimal or no out-of-pocket costs, making professional nutrition care accessible to those who need it most.
              </p>
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
