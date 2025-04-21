import { useState, useEffect } from "react";
import { useInView } from 'react-intersection-observer';
import { DIETITIANS } from "./dietitians/dietitianData";
import DietitianFilters from "./dietitians/DietitianFilters";
import DietitianCard from "./dietitians/DietitianCard";
import NoResultsFound from "./dietitians/NoResultsFound";
import { Dietitian } from "./dietitians/dietitianTypes";
import { cn } from "@/lib/utils";

const DietitianDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [filteredDietitians, setFilteredDietitians] = useState(DIETITIANS);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list'); // Default to list view
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Filter dietitians based on search, city filter and selected category
  useEffect(() => {
    const filtered = DIETITIANS.filter((dietitian) => {
      const matchesSearch =
        dietitian.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dietitian.specializations.some((spec) =>
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesCity = 
        selectedCity === "All Cities" || dietitian.city === selectedCity;
      
      // Additional filtering based on selected category
      let matchesCategory = true;
      if (selectedCategory === "female") {
        matchesCategory = dietitian.name.startsWith("Dr.") || dietitian.name.includes("Zainab") || dietitian.name.includes("Ayesha") || dietitian.name.includes("Farah");
      } else if (selectedCategory === "experienced") {
        matchesCategory = parseInt(dietitian.experience) > 5;
      } else if (selectedCategory === "lowest_fee") {
        matchesCategory = parseFloat(dietitian.fee.replace('Rs. ', '').replace(',', '')) < 1300;
      } else if (selectedCategory === "highest_rated") {
        matchesCategory = dietitian.rating > 4.7;
      }
      
      return matchesSearch && matchesCity && matchesCategory;
    });
    
    setFilteredDietitians(filtered);
  }, [searchTerm, selectedCity, selectedCategory]);
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCity("All Cities");
    setSelectedCategory("");
  };

  return (
    <section id="dietitians" className="py-12">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div 
          ref={ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-12",
            inView ? "animate-fade-up" : "opacity-0"
          )}
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-3">Dietitian Directory</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Find Qualified Dietitians Near You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our directory of certified dietitians across Pakistan specializing in various health conditions.
          </p>
        </div>

        <DietitianFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          viewMode={viewMode}
          setViewMode={setViewMode}
          inView={inView}
        />

        {/* Dietitians Lists */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDietitians.length > 0 ? (
              filteredDietitians.map((dietitian, index) => (
                <DietitianCard
                  key={dietitian.id}
                  dietitian={dietitian}
                  viewMode="grid"
                  index={index}
                  inView={inView}
                />
              ))
            ) : (
              <NoResultsFound clearFilters={clearFilters} />
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDietitians.length > 0 ? (
              filteredDietitians.map((dietitian, index) => (
                <DietitianCard
                  key={dietitian.id}
                  dietitian={dietitian}
                  viewMode="list"
                  index={index}
                  inView={inView}
                />
              ))
            ) : (
              <NoResultsFound clearFilters={clearFilters} />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DietitianDirectory;
