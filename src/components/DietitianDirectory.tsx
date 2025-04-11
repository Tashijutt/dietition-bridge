
import { useState, useEffect } from "react";
import { MapPin, Search, Phone, Mail, ExternalLink, Grid, List, Star, User, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from 'react-intersection-observer';
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Mock data for dietitians
const DIETITIANS = [
  {
    id: 1,
    name: "Dr. Farah Khan",
    qualifications: "PhD Nutrition Sciences",
    city: "Karachi",
    specializations: ["Diabetes", "Weight Management"],
    contact: {
      email: "farah.khan@example.com",
      phone: "+92-321-1234567",
    },
    clinic: "Nutrition Care Center, Clifton",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    rating: 4.8,
    reviewCount: 24,
    about: "Specialized in helping patients with diabetes maintain a balanced diet while enjoying traditional Pakistani cuisine.",
  },
  {
    id: 2,
    name: "Ahmad Malik",
    qualifications: "MSc Clinical Nutrition",
    city: "Lahore",
    specializations: ["Hypertension", "Heart Health"],
    contact: {
      email: "ahmad.malik@example.com",
      phone: "+92-300-9876543",
    },
    clinic: "Diet Clinic, Gulberg",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    rating: 4.5,
    reviewCount: 18,
    about: "Focuses on heart-healthy diets that incorporate local Pakistani ingredients and cooking methods.",
  },
  {
    id: 3,
    name: "Dr. Ayesha Nasir",
    qualifications: "MBBS, Diploma in Nutrition",
    city: "Islamabad",
    specializations: ["Pediatric Nutrition", "Allergies"],
    contact: {
      email: "ayesha.nasir@example.com",
      phone: "+92-333-5557777",
    },
    clinic: "HealthWay Nutrition, F-10",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    rating: 4.9,
    reviewCount: 32,
    about: "Expert in pediatric nutrition with special focus on food allergies and sensitivities in children.",
  },
  {
    id: 4,
    name: "Syed Ali Raza",
    qualifications: "BSc Nutrition, Certified Dietitian",
    city: "Karachi",
    specializations: ["Sports Nutrition", "Muscle Building"],
    contact: {
      email: "ali.raza@example.com",
      phone: "+92-312-9998887",
    },
    clinic: "FitNutrition, DHA Phase 6",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    rating: 4.6,
    reviewCount: 21,
    about: "Specializes in sports nutrition and helping athletes optimize their performance through diet.",
  },
  {
    id: 5,
    name: "Zainab Fatima",
    qualifications: "MSc Food Science & Nutrition",
    city: "Lahore",
    specializations: ["Pregnancy Nutrition", "Women's Health"],
    contact: {
      email: "zainab.fatima@example.com",
      phone: "+92-345-1112223",
    },
    clinic: "NutriWomen Center, Johar Town",
    image: "https://images.unsplash.com/photo-1643297654416-05795d62e9a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    rating: 4.7,
    reviewCount: 27,
    about: "Dedicated to women's nutritional health with a focus on prenatal and postnatal nutrition.",
  },
  {
    id: 6,
    name: "Dr. Usman Ahmed",
    qualifications: "PhD Dietetics",
    city: "Islamabad",
    specializations: ["Kidney Disease", "Hypertension"],
    contact: {
      email: "usman.ahmed@example.com",
      phone: "+92-321-4445556",
    },
    clinic: "Renal Diet Clinic, Blue Area",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    rating: 4.8,
    reviewCount: 19,
    about: "Specialized in dietary management of kidney diseases and hypertension using evidence-based approaches.",
  },
];

// Cities for the filter
const CITIES = ["All Cities", "Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta", "Multan"];

const DietitianDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [filteredDietitians, setFilteredDietitians] = useState(DIETITIANS);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list'); // Default to list view
  const [selectedDietitian, setSelectedDietitian] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Filter dietitians based on search and city filter
  useEffect(() => {
    const filtered = DIETITIANS.filter((dietitian) => {
      const matchesSearch =
        dietitian.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dietitian.specializations.some((spec) =>
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesCity = 
        selectedCity === "All Cities" || dietitian.city === selectedCity;
      
      return matchesSearch && matchesCity;
    });
    
    setFilteredDietitians(filtered);
  }, [searchTerm, selectedCity]);

  const handleBookAppointment = (dietitian) => {
    setSelectedDietitian(dietitian);
    setIsModalOpen(true);
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

        {/* Search & Filter */}
        <div className={cn(
          "mb-8 max-w-4xl mx-auto",
          inView ? "animate-fade-up" : "opacity-0"
        )} style={{ animationDelay: '200ms' }}>
          <div className="glass-card p-4 flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none"
              />
            </div>
            
            {/* City Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="pl-10 pr-8 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none appearance-none"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "flex items-center justify-center p-1.5 rounded",
                  viewMode === 'grid' 
                    ? "bg-primary text-white" 
                    : "bg-transparent text-gray-500 hover:bg-gray-100"
                )}
                aria-label="Grid view"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "flex items-center justify-center p-1.5 rounded",
                  viewMode === 'list' 
                    ? "bg-primary text-white" 
                    : "bg-transparent text-gray-500 hover:bg-gray-100"
                )}
                aria-label="List view"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dietitians List View */}
        <div className="space-y-4">
          {filteredDietitians.length > 0 ? (
            filteredDietitians.map((dietitian, index) => (
              <div 
                key={dietitian.id}
                className={cn(
                  "bg-white border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md overflow-hidden",
                  inView ? "animate-fade-up" : "opacity-0"
                )}
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="p-5 flex flex-col md:flex-row">
                  {/* Dietitian Image and Basic Info */}
                  <div className="md:w-1/4 flex items-start space-x-4">
                    <div className="rounded-full overflow-hidden w-16 h-16 flex-shrink-0 border-2 border-primary">
                      <img 
                        src={dietitian.image} 
                        alt={dietitian.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{dietitian.name}</h3>
                      <p className="text-sm text-gray-500">{dietitian.qualifications}</p>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium ml-1">{dietitian.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({dietitian.reviewCount} reviews)</span>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        {dietitian.city}
                      </p>
                    </div>
                  </div>
                  
                  {/* Specializations & About */}
                  <div className="md:w-2/4 pt-4 md:pt-0 md:px-6">
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {dietitian.specializations.map((spec, i) => (
                          <span 
                            key={i} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{dietitian.about}</p>
                    <div className="mt-3">
                      <a 
                        href="#" 
                        className="text-sm text-blue-600 hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          handleBookAppointment(dietitian);
                        }}
                      >
                        View full profile
                      </a>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="md:w-1/4 flex flex-col justify-center items-end gap-2 pt-4 md:pt-0">
                    <button
                      onClick={() => handleBookAppointment(dietitian)}
                      className="w-full md:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded shadow-sm transition-colors"
                    >
                      Book Appointment
                    </button>
                    <button 
                      className="w-full md:w-auto px-6 py-2.5 border border-primary text-primary bg-white hover:bg-primary/5 font-medium rounded shadow-sm transition-colors"
                    >
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <User className="w-12 h-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-xl font-semibold">No dietitians found</h3>
              <p className="mt-2 text-gray-500">No dietitians match your search criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCity("All Cities");
                }}
                className="mt-4 px-4 py-2 text-sm text-primary hover:text-primary/80"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Dietitian Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedDietitian && (
            <div className="p-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="rounded-full overflow-hidden w-16 h-16 border-2 border-primary">
                  <img 
                    src={selectedDietitian.image} 
                    alt={selectedDietitian.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedDietitian.name}</h3>
                  <p className="text-sm text-gray-500">{selectedDietitian.qualifications}</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium ml-1">{selectedDietitian.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({selectedDietitian.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-base font-medium mb-1">Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDietitian.specializations.map((spec, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-base font-medium mb-1">About</h4>
                <p className="text-sm text-gray-600">{selectedDietitian.about}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-base font-medium mb-1">Contact</h4>
                <div className="space-y-2">
                  <a 
                    href={`mailto:${selectedDietitian.contact.email}`}
                    className="flex items-center text-sm text-gray-600 hover:text-primary"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {selectedDietitian.contact.email}
                  </a>
                  <a 
                    href={`tel:${selectedDietitian.contact.phone}`}
                    className="flex items-center text-sm text-gray-600 hover:text-primary"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {selectedDietitian.contact.phone}
                  </a>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DietitianDirectory;
