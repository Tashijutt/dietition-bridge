
import { useState } from "react";
import { MapPin, Phone, Mail, Star, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from 'react-intersection-observer';
import { Link } from "react-router-dom";
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
];

interface HomeDietitianSectionProps {
  limit?: number;
}

const HomeDietitianSection = ({ limit }: HomeDietitianSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [selectedDietitian, setSelectedDietitian] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Apply limit if provided
  const displayedDietitians = limit ? DIETITIANS.slice(0, limit) : DIETITIANS;

  const handleBookAppointment = (dietitian) => {
    setSelectedDietitian(dietitian);
    setIsModalOpen(true);
  };

  return (
    <section id="dietitians" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16",
            inView ? "animate-fade-up" : "opacity-0"
          )}
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full mb-3">Expert Dietitians</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Meet Our Expert Dietitians
          </h2>
          <p className="text-xl text-gray-600">
            Get personalized nutrition advice from qualified dietitians across Pakistan.
          </p>
        </div>

        {/* Dietitians */}
        <div className="space-y-4">
          {displayedDietitians.map((dietitian, index) => (
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
          ))}
        </div>

        {/* View All Link */}
        {limit && displayedDietitians.length < DIETITIANS.length && (
          <div className="text-center mt-8">
            <Link 
              to="/dietitians"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-all duration-300"
            >
              View All Dietitians
            </Link>
          </div>
        )}
        
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
      </div>
    </section>
  );
};

export default HomeDietitianSection;
