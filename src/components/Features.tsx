
import { Activity, UtensilsCrossed, CalendarClock } from "lucide-react";
import { useInView } from 'react-intersection-observer';
import { cn } from "@/lib/utils";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature = ({ icon, title, description, delay }: FeatureProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={cn(
        "flex flex-col items-center p-6 text-center glass-card",
        inView ? "animate-fade-up" : "opacity-0"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-secondary/20 text-secondary mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Activity className="w-7 h-7" />,
      title: "Daily Exercise",
      description: "Custom fitness plans to keep you active and energized.",
      delay: 100,
    },
    {
      icon: <UtensilsCrossed className="w-7 h-7" />,
      title: "Healthy Diets",
      description: "Expert guides for balanced, nutrient-rich meals.",
      delay: 200,
    },
    {
      icon: <CalendarClock className="w-7 h-7" />,
      title: "Routine Plans",
      description: "Simplified meal planning to fit your lifestyle.",
      delay: 300,
    },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16",
            inView ? "animate-fade-up" : "opacity-0"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Our Services
          </h2>
          <p className="text-xl text-gray-600">
            We provide comprehensive nutrition and wellness solutions tailored to your individual needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
