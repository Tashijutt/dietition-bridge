
import { 
  Utensils, 
  Activity, 
  Weight, 
  Salad, 
  Baby, 
  Apple, 
  HeartPulse, 
  Wheat, 
  Dumbbell 
} from "lucide-react";
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
            What We Can Help With
          </h2>
          <p className="text-xl text-gray-600">
            Our professional dietitians provide expert guidance for a wide range of nutritional needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Feature
            icon={<Weight className="w-7 h-7" />}
            title="Weight Loss"
            description="Personalized programs for sustainable and healthy weight management"
            delay={100}
          />
          <Feature
            icon={<Wheat className="w-7 h-7" />}
            title="Food Allergies"
            description="Specialized diet plans for those with food sensitivities and allergies"
            delay={200}
          />
          <Feature
            icon={<Utensils className="w-7 h-7" />}
            title="Digestive Issues"
            description="Nutrition strategies to improve gut health and digestive wellness"
            delay={300}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Feature
            icon={<Baby className="w-7 h-7" />}
            title="Pregnancy Diets"
            description="Nutritional guidance for maternal and fetal health during pregnancy"
            delay={400}
          />
          <Feature
            icon={<Apple className="w-7 h-7" />}
            title="Diabetes"
            description="Blood sugar management through proper nutrition and meal planning"
            delay={500}
          />
          <Feature
            icon={<HeartPulse className="w-7 h-7" />}
            title="High Blood Pressure"
            description="Dietary approaches to reduce hypertension and improve heart health"
            delay={600}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            icon={<Dumbbell className="w-7 h-7" />}
            title="Sports Nutrition"
            description="Optimized nutrition plans for athletic performance and recovery"
            delay={700}
          />
          <Feature
            icon={<Salad className="w-7 h-7" />}
            title="Vegetarian/Vegan Diets"
            description="Balanced plant-based meal plans ensuring complete nutrition"
            delay={800}
          />
          <Feature
            icon={<Activity className="w-7 h-7" />}
            title="Pediatric Nutrition"
            description="Age-appropriate nutrition guidance for children's healthy development"
            delay={900}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
