
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HomeDietitianSection from "@/components/HomeDietitianSection";
import BenefitsSection from "@/components/BenefitsSection";
import WeightLossTips from "@/components/WeightLossTips";
import HealthySteps from "@/components/HealthySteps";
import PricingPlans from "@/components/PricingPlans";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add a slight delay to ensure smooth page entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Show success notification
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        const notification = document.createElement('div');
        notification.className = 'fixed top-24 right-4 bg-white shadow-lg rounded-lg px-4 py-3 flex items-center z-50 animate-fade-in';
        notification.innerHTML = `
          <div class="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <p class="text-sm font-medium">Fatima just started her personalized diet plan!</p>
        `;
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
          notification.classList.add('animate-fade-out');
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 500);
        }, 5000);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <BenefitsSection />
        <WeightLossTips />
        <HealthySteps />
        <PricingPlans />
        <HomeDietitianSection limit={3} />
        
        {/* View All Dietitians CTA */}
        <div className="container mx-auto px-4 pb-16 text-center max-w-[1280px]">
          <Link 
            to="/dietitians" 
            className="inline-flex items-center justify-center px-6 py-3 bg-nutrition-600 text-white rounded-full hover:bg-nutrition-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            View All Dietitians
          </Link>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
