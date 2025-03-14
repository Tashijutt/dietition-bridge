
import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from 'react-intersection-observer';
import { Link } from "react-router-dom";

// Use just 3 dietitians for the home page
const FEATURED_DIETITIANS = [
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
  },
];

const HomeDietitianSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <section id="dietitians" className="py-20">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16",
            inView ? "animate-fade-up" : "opacity-0"
          )}
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-nutrition-600 bg-nutrition-50 rounded-full mb-3">Meet Our Experts</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Featured Dietitians
          </h2>
          <p className="text-xl text-gray-600">
            Connect with certified dietitians across Pakistan specializing in various health conditions.
          </p>
        </div>

        {/* Dietitians Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_DIETITIANS.map((dietitian, index) => (
            <div 
              key={dietitian.id}
              className={cn(
                "glass-card overflow-hidden transition-all duration-500 hover:shadow-md",
                inView ? "animate-fade-up" : "opacity-0"
              )}
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <img 
                  src={dietitian.image} 
                  alt={dietitian.name} 
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{dietitian.city}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-gray-900">{dietitian.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{dietitian.qualifications}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {dietitian.specializations.map((spec, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 bg-nutrition-50 text-nutrition-700 text-xs font-medium rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                
                <p className="text-sm text-gray-600 mb-4 flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                  {dietitian.clinic}
                </p>
                
                <div className="flex flex-col space-y-2">
                  <a 
                    href={`mailto:${dietitian.contact.email}`}
                    className="text-sm text-gray-700 flex items-center hover:text-nutrition-600 transition-colors"
                  >
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {dietitian.contact.email}
                  </a>
                  <a 
                    href={`tel:${dietitian.contact.phone}`}
                    className="text-sm text-gray-700 flex items-center hover:text-nutrition-600 transition-colors"
                  >
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {dietitian.contact.phone}
                  </a>
                </div>
                
                <button 
                  className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-nutrition-600 text-white text-sm font-medium rounded-md hover:bg-nutrition-700 transition-colors"
                >
                  Book Appointment
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/dietitians" 
            className="inline-flex items-center gap-2 px-6 py-3 text-nutrition-600 font-medium hover:text-nutrition-700 transition-colors"
          >
            View All Dietitians
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeDietitianSection;
