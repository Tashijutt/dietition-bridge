
import { useState, useEffect } from "react";
import { MapPin, Search, Phone, Mail, ExternalLink, Grid, List, Star, User, Award, Calendar, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from 'react-intersection-observer';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    experience: "4 Years",
    satisfiedPatients: "100% (5)",
    fee: "Rs. 1,200",
    availability: "Available Mon, Apr 14"
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
    experience: "11 Years",
    satisfiedPatients: "98% (183)",
    fee: "Rs. 1,400",
    availability: "Available Mon, Apr 14"
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
    experience: "7 Years",
    satisfiedPatients: "97% (42)",
    fee: "Rs. 1,500",
    availability: "Available Tue, Apr 15"
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
    experience: "5 Years",
    satisfiedPatients: "94% (31)",
    fee: "Rs. 1,300",
    availability: "Available Wed, Apr 16"
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
    experience: "6 Years",
    satisfiedPatients: "96% (74)",
    fee: "Rs. 1,100",
    availability: "Available Thu, Apr 17"
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
    experience: "9 Years",
    satisfiedPatients: "99% (87)",
    fee: "Rs. 1,800",
    availability: "Available Fri, Apr 18"
  },
];

// Cities for the filter
const CITIES = ["All Cities", "Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta", "Multan"];

// Filter categories based on the reference image
const FILTER_CATEGORIES = [
  { id: "female", label: "Female Doctors" },
  { id: "nearby", label: "Doctors Near Me" },
  { id: "experienced", label: "Most Experienced" },
  { id: "lowest_fee", label: "Lowest Fee" },
  { id: "highest_rated", label: "Highest Rated" },
  { id: "today", label: "Available Today" },
  { id: "discounts", label: "Discounts" },
  { id: "video", label: "Video Consultation" },
];

const DietitianDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [filteredDietitians, setFilteredDietitians] = useState(DIETITIANS);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list'); // Default to list view
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  const [selectedDietitian, setSelectedDietitian] = useState<any>(null);
  
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

  const handleBookAppointment = (dietitian) => {
    setSelectedDietitian(dietitian);
    setAppointmentDialogOpen(true);
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

        {/* Filter Categories - horizontal scrollable buttons */}
        <div className={cn(
          "mb-6 overflow-x-auto no-scrollbar",
          inView ? "animate-fade-up" : "opacity-0"
        )} style={{ animationDelay: '100ms' }}>
          <div className="flex space-x-2 pb-2 min-w-max">
            {FILTER_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? "" : category.id)}
                className={cn(
                  "px-4 py-2 rounded-full border text-sm whitespace-nowrap transition-all",
                  selectedCategory === category.id
                    ? "bg-primary text-white border-primary"
                    : "border-gray-300 text-gray-700 hover:border-primary hover:text-primary"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
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

        {/* Dietitians Lists */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDietitians.length > 0 ? (
              filteredDietitians.map((dietitian, index) => (
                <div 
                  key={dietitian.id}
                  className={cn(
                    "bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden",
                    inView ? "animate-fade-up" : "opacity-0"
                  )}
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="p-5">
                    {/* Dietitian Header with Image */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="rounded-full overflow-hidden w-14 h-14 flex-shrink-0">
                        <img 
                          src={dietitian.image} 
                          alt={dietitian.name} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold text-gray-900">{dietitian.name}</h3>
                          <Badge className="ml-2 bg-amber-500 text-white text-[10px] h-5 px-1.5">
                            <Award className="w-3 h-3 mr-1" /> PLATINUM DOCTOR
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{dietitian.qualifications}</p>
                      </div>
                    </div>
                    
                    {/* Details */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">{dietitian.clinic}</p>
                      <div className="flex items-center space-x-1 text-sm">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{dietitian.rating}</span>
                        <span className="text-gray-500">({dietitian.reviewCount} reviews)</span>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4 text-center">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="font-medium">{dietitian.experience}</p>
                        <p className="text-xs text-gray-500">Experience</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="font-medium">{dietitian.satisfiedPatients}</p>
                        <p className="text-xs text-gray-500">Satisfied Patients</p>
                      </div>
                    </div>
                    
                    {/* Appointment Option */}
                    <div className="border-t border-gray-200 mt-3 pt-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Video className="w-4 h-4 text-primary mr-2" />
                          <span className="text-sm font-medium">Online Video Consultation</span>
                        </div>
                        <span className="text-sm font-medium">{dietitian.fee}</span>
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm text-gray-600">{dietitian.availability}</span>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button
                          variant="outline"
                          className="w-full border-primary text-primary hover:bg-primary/5"
                          onClick={() => window.open(`tel:${dietitian.contact.phone}`, '_blank')}
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Video Consultation
                        </Button>
                        <Button
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={() => handleBookAppointment(dietitian)}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Appointment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 border rounded-lg">
                <User className="w-12 h-12 mx-auto text-gray-400" />
                <h3 className="mt-4 text-xl font-semibold">No dietitians found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your search criteria.</p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCity("All Cities");
                    setSelectedCategory("");
                  }}
                  className="mt-4 px-4 py-2 text-sm text-primary hover:text-primary/80"
                  variant="ghost"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDietitians.length > 0 ? (
              filteredDietitians.map((dietitian, index) => (
                <div 
                  key={dietitian.id}
                  className={cn(
                    "bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden",
                    inView ? "animate-fade-up" : "opacity-0"
                  )}
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="p-6">
                    {/* Dietitian Header with Image */}
                    <div className="flex flex-col md:flex-row">
                      {/* Left Section - Image and Basic Info */}
                      <div className="md:w-1/4 flex items-start space-x-4">
                        <div className="rounded-full overflow-hidden w-16 h-16 flex-shrink-0">
                          <img 
                            src={dietitian.image} 
                            alt={dietitian.name} 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <div className="flex items-center flex-wrap gap-2">
                            <h3 className="text-lg font-semibold text-gray-900">{dietitian.name}</h3>
                            <Badge className="bg-amber-500 text-white text-[10px] h-5 px-1.5">
                              <Award className="w-3 h-3 mr-1" /> PLATINUM DOCTOR
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{dietitian.qualifications}</p>
                          <div className="flex items-center mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium ml-1">{dietitian.rating}</span>
                            <span className="text-sm text-gray-500 ml-1">({dietitian.reviewCount} reviews)</span>
                          </div>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                            {dietitian.clinic}, {dietitian.city}
                          </p>
                        </div>
                      </div>
                      
                      {/* Middle Section - Experience and Consultations */}
                      <div className="md:w-2/5 mt-4 md:mt-0 md:px-6">
                        <div className="flex flex-wrap gap-4 mb-3">
                          <div className="bg-gray-50 p-3 rounded text-center">
                            <p className="font-medium">{dietitian.experience}</p>
                            <p className="text-xs text-gray-500">Experience</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded text-center">
                            <p className="font-medium">{dietitian.satisfiedPatients}</p>
                            <p className="text-xs text-gray-500">Satisfied Patients</p>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Video className="w-4 h-4 text-primary mr-2" />
                              <span className="text-sm font-medium">Online Video Consultation</span>
                            </div>
                            <span className="text-sm font-medium">{dietitian.fee}</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm text-gray-600">{dietitian.availability}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Section - Actions */}
                      <div className="md:w-1/3 flex flex-col justify-center items-end gap-3 mt-4 md:mt-0">
                        <Button
                          variant="outline"
                          className="w-full md:w-auto px-6 py-2.5 border-primary text-primary hover:bg-primary/5"
                          onClick={() => window.open(`tel:${dietitian.contact.phone}`, '_blank')}
                        >
                          <Video className="h-4 w-4 mr-1.5" />
                          Video Consultation
                        </Button>
                        <Button
                          className="w-full md:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={() => handleBookAppointment(dietitian)}
                        >
                          <Calendar className="h-4 w-4 mr-1.5" />
                          Book Appointment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <User className="w-12 h-12 mx-auto text-gray-400" />
                <h3 className="mt-4 text-xl font-semibold">No dietitians found</h3>
                <p className="mt-2 text-gray-500">No dietitians match your search criteria.</p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCity("All Cities");
                    setSelectedCategory("");
                  }}
                  className="mt-4 px-4 py-2 text-sm text-primary hover:text-primary/80"
                  variant="ghost"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Appointment Booking Dialog */}
      <Dialog open={appointmentDialogOpen} onOpenChange={setAppointmentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedDietitian && (
            <div className="p-2">
              <h3 className="text-xl font-semibold mb-4">Book an Appointment</h3>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="rounded-full overflow-hidden w-16 h-16 border-2 border-primary">
                  <img 
                    src={selectedDietitian.image} 
                    alt={selectedDietitian.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedDietitian.name}</h3>
                  <p className="text-sm text-gray-500">{selectedDietitian.qualifications}</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium ml-1">{selectedDietitian.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({selectedDietitian.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-base font-medium mb-1">Available Slots</h4>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button className="p-2 border border-primary text-primary rounded hover:bg-primary/5">
                    Today<br />9:00 AM
                  </button>
                  <button className="p-2 border border-primary text-primary rounded hover:bg-primary/5">
                    Today<br />11:30 AM
                  </button>
                  <button className="p-2 border border-primary text-primary rounded hover:bg-primary/5">
                    Today<br />2:00 PM
                  </button>
                  <button className="p-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                    Tomorrow<br />10:00 AM
                  </button>
                  <button className="p-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                    Tomorrow<br />1:00 PM
                  </button>
                  <button className="p-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                    Tomorrow<br />4:30 PM
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-base font-medium mb-1">Fee Information</h4>
                <p className="text-sm mb-1"><span className="font-medium">Consultation Fee:</span> {selectedDietitian.fee}</p>
                <p className="text-sm text-gray-600">The fee covers a 30-minute consultation session.</p>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setAppointmentDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DietitianDirectory;
