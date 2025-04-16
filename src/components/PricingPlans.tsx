import { useInView } from 'react-intersection-observer';
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useState } from "react";

const PricingPlans = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [isAnnual, setIsAnnual] = useState(false);
  
  const plans = [
    {
      name: "Basic Plan",
      price: isAnnual ? 2000 : 2500,
      priceId: "price_basic",
      description: "Essential nutrition guidance for beginners",
      features: [
        "Core diet plan",
        "Email support",
        "Monthly check-ins",
        "Basic meal suggestions",
        "Educational resources"
      ],
      notIncluded: [
        "Personalized exercise plan",
        "Weekly support calls",
        "Mobile app access",
        "Nutrition tracking tools",
        "One-on-one coaching"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Regular Plan",
      price: isAnnual ? 4000 : 4500,
      priceId: "price_regular",
      description: "Complete nutrition and fitness guidance",
      features: [
        "Personalized diet plan",
        "Custom exercise program",
        "Weekly support calls",
        "Mobile app access",
        "Nutrition tracking tools",
        "Recipe database access",
        "Bi-weekly check-ins"
      ],
      notIncluded: [
        "One-on-one coaching",
        "Lifetime updates"
      ],
      cta: "Choose Regular",
      popular: true
    },
    {
      name: "Lifetime Plan",
      price: isAnnual ? 8000 : 8500,
      priceId: "price_lifetime",
      description: "Ultimate personalized nutrition experience",
      features: [
        "Unlimited plan updates",
        "One-on-one coaching",
        "Priority support",
        "Personalized diet plan",
        "Custom exercise program",
        "Weekly support calls",
        "Mobile app access", 
        "Nutrition tracking tools",
        "Advanced analytics",
        "Lifestyle integration"
      ],
      notIncluded: [],
      cta: "Choose Lifetime",
      popular: false
    }
  ];

  const handlePlanSelection = (planId: string) => {
    const plan = plans.find(p => p.priceId === planId);
    if (!plan) return;

    const searchParams = new URLSearchParams({
      plan: planId,
      price: plan.price.toString(),
      duration: isAnnual ? 'annual' : 'monthly'
    });

    window.location.href = `/signin?${searchParams.toString()}`;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-8",
            inView ? "animate-fade-up" : "opacity-0"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Flexible Plans for Every Journey
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect nutrition package that aligns with your health goals and budget
          </p>
          
          <div className="flex items-center justify-center mb-8">
            <span className={`mr-3 text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button 
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isAnnual ? 'bg-nutrition-600' : 'bg-gray-300'}`}
              onClick={() => setIsAnnual(!isAnnual)}
            >
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-1'}`} 
              />
            </button>
            <span className={`ml-3 text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual <span className="text-nutrition-600">(Save 20%)</span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={cn(
                "relative rounded-xl overflow-hidden transition-all duration-300",
                plan.popular ? "shadow-xl border-2 border-nutrition-500" : "shadow-soft border border-gray-200",
                "bg-white",
                inView ? "animate-fade-up" : "opacity-0"
              )}
              style={{ animationDelay: `${index * 100 + 300}ms` }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-nutrition-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-end">
                    <span className="text-4xl font-bold text-gray-900">Rs. {plan.price}</span>
                    <span className="text-gray-500 ml-2 mb-1">{isAnnual ? '/year' : '/month'}</span>
                  </div>
                </div>
                
                <button 
                  className={cn(
                    "w-full py-3 px-4 rounded-lg font-medium mb-6",
                    plan.popular 
                      ? "bg-nutrition-600 text-white hover:bg-nutrition-700" 
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  )}
                  onClick={() => handlePlanSelection(plan.priceId)}
                >
                  {plan.cta}
                </button>
                
                <div className="space-y-3">
                  <p className="font-medium text-gray-900">What's included:</p>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex">
                      <Check className="w-5 h-5 text-nutrition-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded.length > 0 && (
                    <>
                      <div className="my-4 border-t border-gray-200"></div>
                      <p className="font-medium text-gray-900">Not included:</p>
                      {plan.notIncluded.map((feature, i) => (
                        <div key={i} className="flex text-gray-400">
                          <X className="w-5 h-5 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
