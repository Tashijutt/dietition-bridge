
import { useInView } from 'react-intersection-observer';
import { cn } from "@/lib/utils";
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
        "flex flex-col items-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 relative overflow-hidden",
        inView ? "animate-fade-up" : "opacity-0"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/70 to-primary"></div>
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-center text-gray-900">{title}</h3>
      <p className="text-gray-600 text-center leading-relaxed">{description}</p>
    </div>
  );
};

const Features = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16",
            inView ? "animate-fade-up" : "opacity-0"
          )}
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-3">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            What Can We Help You With?
          </h2>
          <p className="text-xl text-gray-600">
            Our registered dietitians provide evidence-based nutrition counseling for a variety of health conditions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            icon={<Weight className="w-8 h-8" />}
            title="Weight Management"
            description="Personalized plans for healthy, sustainable weight control through proper nutrition and lifestyle changes"
            delay={100}
          />
          <Feature
            icon={<Wheat className="w-8 h-8" />}
            title="Food Allergies & Intolerances"
            description="Expert guidance on managing food allergies, celiac disease, and intolerances while maintaining nutritional balance"
            delay={200}
          />
          <Feature
            icon={<Utensils className="w-8 h-8" />}
            title="Digestive Disorders"
            description="Specialized nutrition therapy for IBS, IBD, GERD, and other digestive health conditions"
            delay={300}
          />
          <Feature
            icon={<Baby className="w-8 h-8" />}
            title="Prenatal & Pediatric Nutrition"
            description="Comprehensive nutrition support for expecting mothers and children's developmental needs"
            delay={400}
          />
          <Feature
            icon={<Apple className="w-8 h-8" />}
            title="Diabetes Management"
            description="Evidence-based meal planning and carbohydrate management to control blood sugar levels"
            delay={500}
          />
          <Feature
            icon={<HeartPulse className="w-8 h-8" />}
            title="Cardiovascular Health"
            description="Heart-healthy dietary strategies to manage cholesterol, blood pressure, and overall cardiac wellness"
            delay={600}
          />
          <Feature
            icon={<Dumbbell className="w-8 h-8" />}
            title="Sports Nutrition"
            description="Performance-focused nutrition plans for athletes at all levels to optimize training and recovery"
            delay={700}
          />
          <Feature
            icon={<Salad className="w-8 h-8" />}
            title="Plant-Based Nutrition"
            description="Guidance for vegetarian, vegan, and plant-forward eating patterns with complete nutritional adequacy"
            delay={800}
          />
          <Feature
            icon={<Activity className="w-8 h-8" />}
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
