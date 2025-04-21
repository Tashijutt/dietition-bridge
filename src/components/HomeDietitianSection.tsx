
import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Star, User, Award, Calendar, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from 'react-intersection-observer';
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AppointmentDialog from "./appointment/AppointmentDialog";

const apiUrl = import.meta.env.VITE_API_URL;

// Mock data for dietitians
// const DIETITIANS = [
//   {
//     id: 1,
//     name: "Dr. Farah Khan",
//     qualifications: "PhD Nutrition Sciences",
//     city: "Karachi",
//     specializations: ["Diabetes", "Weight Management"],
//     contact: {
//       email: "farah.khan@example.com",
//       phone: "+92-321-1234567",
//     },
//     clinic: "Nutrition Care Center, Clifton",
//     image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
//     rating: 4.8,
//     reviewCount: 24,
//     about: "Specialized in helping patients with diabetes maintain a balanced diet while enjoying traditional Pakistani cuisine.",
//     experience: "4 Years",
//     satisfiedPatients: "100% (5)",
//     fee: "Rs. 1,200",
//     availability: "Available Mon, Apr 14"
//   },
//   {
//     id: 2,
//     name: "Ahmad Malik",
//     qualifications: "MSc Clinical Nutrition",
//     city: "Lahore",
//     specializations: ["Hypertension", "Heart Health"],
//     contact: {
//       email: "ahmad.malik@example.com",
//       phone: "+92-300-9876543",
//     },
//     clinic: "Diet Clinic, Gulberg",
//     image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
//     rating: 4.5,
//     reviewCount: 18,
//     about: "Focuses on heart-healthy diets that incorporate local Pakistani ingredients and cooking methods.",
//     experience: "11 Years",
//     satisfiedPatients: "98% (183)",
//     fee: "Rs. 1,400",
//     availability: "Available Mon, Apr 14"
//   },
//   {
//     id: 3,
//     name: "Dr. Ayesha Nasir",
//     qualifications: "MBBS, Diploma in Nutrition",
//     city: "Islamabad",
//     specializations: ["Pediatric Nutrition", "Allergies"],
//     contact: {
//       email: "ayesha.nasir@example.com",
//       phone: "+92-333-5557777",
//     },
//     clinic: "HealthWay Nutrition, F-10",
//     image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
//     rating: 4.9,
//     reviewCount: 32,
//     about: "Expert in pediatric nutrition with special focus on food allergies and sensitivities in children.",
//     experience: "7 Years",
//     satisfiedPatients: "97% (42)",
//     fee: "Rs. 1,500",
//     availability: "Available Tue, Apr 15"
//   },
// ];

interface Dietitian {
  id: number;
  name: string;
  qualifications: string;
  city: string;
  specializations: string[];
  contact: {
    email: string;
    phone: string;
  };
  clinic: string;
  image: string;
  rating: number;
  reviewCount: number;
  about: string;
  experience: string;
  satisfiedPatients: string;
  fee: string;
  availability: string;
}

interface HomeDietitianSectionProps {
  limit?: number;
}

const HomeDietitianSection = ({ limit }: HomeDietitianSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  const [selectedDietitian, setSelectedDietitian] = useState<Dietitian | null>(null);
  const [dietitians, setDietitians] = useState<Dietitian[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDietitians = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/dietitians`);
        if (!response.ok) {
          throw new Error('Failed to fetch dietitians');
        }
        const data = await response.json();
        setDietitians(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDietitians();
  }, []);
  
  // Apply limit if provided
  const displayedDietitians = limit ? dietitians.slice(0, limit) : dietitians;

  const handleBookAppointment = (dietitian) => {
    setSelectedDietitian(dietitian);
    setAppointmentDialogOpen(true);
  };

  const handleVideoConsultation = (dietitian) => {
    setSelectedDietitian(dietitian);
    setAppointmentDialogOpen(true);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p>Loading dietitians...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="dietitians" className="py-12 bg-gray-50">
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
              key={`dietitian-${dietitian.id}-${index}`}
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
                      onClick={() => handleVideoConsultation(dietitian)}
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
          ))}
        </div>

        {/* View All Link */}
        {limit && displayedDietitians.length < dietitians.length && (
          <div className="text-center mt-10">
            <Link 
              to="/dietitians"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-all duration-300"
            >
              View All Dietitians
            </Link>
          </div>
        )}
        
        {/* Appointment Dialog */}
        <AppointmentDialog
          open={appointmentDialogOpen}
          onOpenChange={setAppointmentDialogOpen}
          dietitian={selectedDietitian}
        />
      </div>
    </section>
  );
};

export default HomeDietitianSection;
