
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { Heart, Award, Users, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref: missionRef, inView: missionInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: teamRef, inView: teamInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    // Add a slight delay to ensure smooth page entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const team = [
    {
      name: "Dr. Sadia Khan",
      role: "Founder & Chief Nutritionist",
      bio: "With over 15 years of experience in nutritional sciences, Dr. Sadia founded Dietitian Bridge to bridge the gap between patients and qualified dietitians in Pakistan.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Umar Ahmed",
      role: "Technology Director",
      bio: "Umar leads our tech initiatives, ensuring our platform leverages cutting-edge technology to provide personalized nutrition advice across Pakistan.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Aisha Malik",
      role: "Clinical Research Head",
      bio: "Specializing in diabetes and cardiovascular health, Aisha ensures all dietary advice on our platform is scientifically validated and evidence-based.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const stats = [
    { value: "50+", label: "Qualified Dietitians", icon: Users },
    { value: "10,000+", label: "Patients Helped", icon: Heart },
    { value: "15+", label: "Cities Covered", icon: Award },
    { value: "24/7", label: "AI Support", icon: Phone }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-nutrition-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">About Dietitian Bridge Pakistan</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're on a mission to improve health outcomes across Pakistan through personalized nutrition guidance and expert dietitian connections.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div 
                ref={missionRef}
                className={cn(
                  "space-y-6",
                  missionInView ? "animate-fade-up" : "opacity-0"
                )}
              >
                <span className="inline-block px-3 py-1 text-xs font-medium text-nutrition-600 bg-nutrition-50 rounded-full">Our Mission</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Empowering Healthier Lives Through Nutrition</h2>
                <p className="text-lg text-gray-600">
                  In Pakistan, many individuals struggle with diet-related health conditions without access to professional guidance. Dietitian Bridge was founded to bridge this gap by connecting patients with qualified dietitians and providing AI-powered nutritional advice.
                </p>
                <p className="text-lg text-gray-600">
                  We believe everyone deserves access to personalized nutrition advice tailored to their specific health needs, cultural context, and dietary preferences.
                </p>
                <div>
                  <Link 
                    to="/dietitians"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-nutrition-600 text-white font-medium rounded-lg shadow-md hover:bg-nutrition-700 transition-all duration-300"
                  >
                    Find a Dietitian
                  </Link>
                </div>
              </div>
              <div 
                className={cn(
                  "relative h-96 rounded-2xl overflow-hidden",
                  missionInView ? "animate-fade-up" : "opacity-0"
                )}
                style={{ animationDelay: '200ms' }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Healthcare professionals"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <p className="text-xl font-medium">Started in 2020</p>
                  <p>With a vision to revolutionize nutrition care in Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div 
              ref={teamRef}
              className={cn(
                "text-center max-w-3xl mx-auto mb-16",
                teamInView ? "animate-fade-up" : "opacity-0"
              )}
            >
              <span className="inline-block px-3 py-1 text-xs font-medium text-nutrition-600 bg-nutrition-50 rounded-full mb-3">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Meet the Experts Behind Dietitian Bridge
              </h2>
              <p className="text-xl text-gray-600">
                Our team combines expertise in nutrition, healthcare, and technology to deliver the best solutions for your dietary needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div 
                  key={member.name}
                  className={cn(
                    "bg-white rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg",
                    teamInView ? "animate-fade-up" : "opacity-0"
                  )}
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-nutrition-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24">
          <div 
            ref={statsRef}
            className="container mx-auto px-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className={cn(
                    "text-center p-8 rounded-xl bg-white border border-gray-100 shadow-sm",
                    statsInView ? "animate-fade-up" : "opacity-0"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-nutrition-50 flex items-center justify-center">
                      <stat.icon className="w-7 h-7 text-nutrition-600" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-nutrition-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Nutrition Journey?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Connect with qualified dietitians or chat with our AI assistant to get personalized nutrition advice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/dietitians"
                className="px-8 py-3 bg-white text-nutrition-700 font-medium rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300"
              >
                Find a Dietitian
              </Link>
              <Link 
                to="/chat"
                className="px-8 py-3 bg-nutrition-700 text-white font-medium rounded-lg shadow-md hover:bg-nutrition-800 transition-all duration-300"
              >
                Chat with AI
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
