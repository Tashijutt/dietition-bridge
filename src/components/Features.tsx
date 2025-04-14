
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
        "flex flex-col p-8 rounded-xl shadow-md bg-white border border-gray-100 hover:shadow-lg transition-all duration-300",
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
            Professional Dietitian Services
          </h2>
          <p className="text-xl text-gray-600">
            Our registered dietitians provide evidence-based nutrition counseling for a variety of health conditions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Feature
            icon={<Weight className="w-7 h-7" />}
            title="Weight Management"
            description="Personalized plans for healthy, sustainable weight control through proper nutrition and lifestyle changes"
            delay={100}
          />
          <Feature
            icon={<Wheat className="w-7 h-7" />}
            title="Food Allergies & Intolerances"
            description="Expert guidance on managing food allergies, celiac disease, and intolerances while maintaining nutritional balance"
            delay={200}
          />
          <Feature
            icon={<Utensils className="w-7 h-7" />}
            title="Digestive Disorders"
            description="Specialized nutrition therapy for IBS, IBD, GERD, and other digestive health conditions"
            delay={300}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Feature
            icon={<Baby className="w-7 h-7" />}
            title="Prenatal & Pediatric Nutrition"
            description="Comprehensive nutrition support for expecting mothers and children's developmental needs"
            delay={400}
          />
          <Feature
            icon={<Apple className="w-7 h-7" />}
            title="Diabetes Management"
            description="Evidence-based meal planning and carbohydrate management to control blood sugar levels"
            delay={500}
          />
          <Feature
            icon={<HeartPulse className="w-7 h-7" />}
            title="Cardiovascular Health"
            description="Heart-healthy dietary strategies to manage cholesterol, blood pressure, and overall cardiac wellness"
            delay={600}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            icon={<Dumbbell className="w-7 h-7" />}
            title="Sports Nutrition"
            description="Performance-focused nutrition plans for athletes at all levels to optimize training and recovery"
            delay={700}
          />
          <Feature
            icon={<Salad className="w-7 h-7" />}
            title="Plant-Based Nutrition"
            description="Guidance for vegetarian, vegan, and plant-forward eating patterns with complete nutritional adequacy"
            delay={800}
          />
          <Feature
            icon={<Activity className="w-7 h-7" />}
            title="Medical Nutrition Therapy"
            description="Therapeutic nutrition interventions for chronic disease management and recovery support"
            delay={900}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
