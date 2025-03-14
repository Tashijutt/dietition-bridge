
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DietitianDirectory from "@/components/DietitianDirectory";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

// Let's create a hook to detect page scroll for animations
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

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <DietitianDirectory />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
