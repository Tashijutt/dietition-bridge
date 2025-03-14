
import { Heart, Users, Brain, BookOpen } from "lucide-react";
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
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-nutrition-50 text-nutrition-600 mb-5">
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
      icon: <Heart className="w-7 h-7" />,
      title: "Personalized Diet Plans",
      description: "Get customized nutrition plans based on your specific health conditions and dietary preferences.",
      delay: 100,
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Find Dietitians",
      description: "Connect with qualified dietitians across major cities in Pakistan through our searchable directory.",
      delay: 200,
    },
    {
      icon: <Brain className="w-7 h-7" />,
      title: "AI Nutrition Assistant",
      description: "Get instant answers to your nutrition questions from our AI-powered chatbot, available 24/7.",
      delay: 300,
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      title: "Educational Resources",
      description: "Access articles and resources about healthy eating tailored to Pakistani dietary habits.",
      delay: 400,
    },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16",
            inView ? "animate-fade-up" : "opacity-0"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            How NutriCare Pakistan Helps You
          </h2>
          <p className="text-xl text-gray-600">
            Our platform bridges the gap between patients and dietitians, providing personalized nutrition guidance for better health outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
