
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingPlans from "@/components/PricingPlans";
import ChatWidget from "@/components/ChatWidget";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Plans = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 pt-32 pb-12">
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nutrition Plans
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Explore our range of personalized nutrition and diet plans designed to help you achieve your health goals.
            </p>
          </div>
        </div>
        
        <PricingPlans />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Plans;
