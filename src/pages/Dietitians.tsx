
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DietitianDirectory from "@/components/DietitianDirectory";
import { useEffect, useState } from "react";

const Dietitians = () => {
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
      <main className="flex-grow pt-20">
        <DietitianDirectory />
      </main>
      <Footer />
    </div>
  );
};

export default Dietitians;
