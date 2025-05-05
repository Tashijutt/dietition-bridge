
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HomeDietitianSection from "@/components/HomeDietitianSection";
import BenefitsSection from "@/components/BenefitsSection";
import WeightLossTips from "@/components/WeightLossTips";
import HealthySteps from "@/components/HealthySteps";
import PricingPlans from "@/components/PricingPlans";
import HomeFAQ from "@/components/HomeFAQ";
import ReadyToChangeSection from "@/components/ReadyToChangeSection";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Add a slight delay to ensure smooth page entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HomeDietitianSection limit={3} />
        <BenefitsSection />
        <WeightLossTips />
        <ReadyToChangeSection />
        <HealthySteps />
        <PricingPlans />
        <HomeFAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
