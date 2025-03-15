
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add a slight delay to ensure smooth page entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-[1280px]">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-xs font-medium text-nutrition-600 bg-nutrition-50 rounded-full mb-3">Contact Us</span>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Get in Touch with Dietitian Bridge</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Have questions about our services? Want to find a dietitian or ask about nutrition advice? 
                We're here to help you on your journey to better health.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-xl shadow-soft p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-nutrition-50 rounded-full flex items-center justify-center mb-6">
                  <Phone className="h-8 w-8 text-nutrition-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Call Us</h3>
                <p className="text-gray-600 mb-4">Our team is available during business hours</p>
                <a href="tel:+923001234567" className="text-nutrition-600 font-medium hover:underline">+92 300 123 4567</a>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-nutrition-50 rounded-full flex items-center justify-center mb-6">
                  <Mail className="h-8 w-8 text-nutrition-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Email Us</h3>
                <p className="text-gray-600 mb-4">Send us an email and we'll respond shortly</p>
                <a href="mailto:mtahseen1122@gmail.com" className="text-nutrition-600 font-medium hover:underline">mtahseen1122@gmail.com</a>
              </div>

              <div className="bg-white rounded-xl shadow-soft p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-nutrition-50 rounded-full flex items-center justify-center mb-6">
                  <MessageCircle className="h-8 w-8 text-nutrition-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Chat with Us</h3>
                <p className="text-gray-600 mb-4">Talk to our AI nutritionist or schedule a consultation</p>
                <a href="/chat" className="text-nutrition-600 font-medium hover:underline">Start a Chat</a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
                <ContactForm />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">How do I find a dietitian in my city?</h3>
                    <p className="text-gray-600">
                      You can use our dietitian directory to search for professionals in your city. 
                      We have registered dietitians in Karachi, Lahore, Islamabad and other major 
                      cities across Pakistan.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">What are your pricing plans?</h3>
                    <p className="text-gray-600">
                      We offer a range of pricing plans starting from our Basic Plan. 
                      For detailed information about features and pricing, please visit our 
                      <a href="/plans" className="text-nutrition-600 hover:underline"> Plans page</a>.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Is the AI nutritionist accurate?</h3>
                    <p className="text-gray-600">
                      Our AI nutritionist is designed to provide general nutrition guidance based on 
                      scientific principles. While it offers valuable advice, it's not a replacement 
                      for personalized consultation with a registered dietitian.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl shadow-soft p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">How do I become a registered dietitian on your platform?</h3>
                    <p className="text-gray-600">
                      If you're a qualified dietitian in Pakistan and would like to join our platform, 
                      please contact us at mtahseen1122@gmail.com with your credentials and we'll 
                      guide you through the verification and onboarding process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
