
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { Mail, MapPin, Phone, SendIcon, AlertCircle } from "lucide-react";

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref: formRef, inView: formInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: infoRef, inView: infoInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Add a slight delay to ensure smooth page entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('success');
    // Reset form after success
    setTimeout(() => {
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setFormStatus('idle');
    }, 3000);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-nutrition-50 to-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about NutriCare? We're here to help. Reach out to our team for assistance or information.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div 
                ref={formRef}
                className={cn(
                  "glass-card p-8",
                  formInView ? "animate-fade-up" : "opacity-0"
                )}
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
                
                {formStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg flex items-start">
                    <AlertCircle className="w-5 h-5 mr-2 mt-0.5" />
                    <p>Thank you for your message! We'll get back to you shortly.</p>
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg flex items-start">
                    <AlertCircle className="w-5 h-5 mr-2 mt-0.5" />
                    <p>There was a problem sending your message. Please try again.</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nutrition-500 focus:border-transparent transition-all duration-200 outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nutrition-500 focus:border-transparent transition-all duration-200 outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nutrition-500 focus:border-transparent transition-all duration-200 outline-none"
                    >
                      <option value="">Select a subject</option>
                      <option value="dietitian">Find a Dietitian</option>
                      <option value="diet-plan">Diet Plan Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nutrition-500 focus:border-transparent transition-all duration-200 outline-none"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full md:w-auto px-8 py-3 bg-nutrition-600 text-white font-medium rounded-lg shadow-md hover:bg-nutrition-700 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Send Message
                      <SendIcon className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Contact Info */}
              <div 
                ref={infoRef}
                className={cn(
                  "space-y-8",
                  infoInView ? "animate-fade-up" : "opacity-0"
                )}
                style={{ animationDelay: '200ms' }}
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
                  <p className="text-gray-600 mb-8">
                    Our team is available Monday through Friday, 9am to 5pm PKT. You can reach us through any of the following methods:
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="mr-4 bg-nutrition-50 p-3 rounded-full">
                      <Mail className="w-6 h-6 text-nutrition-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Email Us</h3>
                      <p className="text-gray-600 mb-2">For general inquiries:</p>
                      <a href="mailto:info@nutricare.pk" className="text-nutrition-600 hover:underline">info@nutricare.pk</a>
                      <p className="text-gray-600 mt-2 mb-2">For support:</p>
                      <a href="mailto:support@nutricare.pk" className="text-nutrition-600 hover:underline">support@nutricare.pk</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="mr-4 bg-nutrition-50 p-3 rounded-full">
                      <Phone className="w-6 h-6 text-nutrition-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Call Us</h3>
                      <p className="text-gray-600 mb-2">Customer Support:</p>
                      <a href="tel:+921234567890" className="text-nutrition-600 hover:underline">+92 123 456 7890</a>
                      <p className="text-gray-600 mt-2 mb-2">Business Inquiries:</p>
                      <a href="tel:+921234567891" className="text-nutrition-600 hover:underline">+92 123 456 7891</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="mr-4 bg-nutrition-50 p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-nutrition-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Visit Us</h3>
                      <p className="text-gray-600 mb-2">Main Office:</p>
                      <p className="text-gray-800">123 Health Avenue, F-8 Markaz, Islamabad, Pakistan</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-nutrition-50 rounded-lg">
                  <h3 className="text-lg font-medium mb-4 text-nutrition-800">Frequently Asked Questions</h3>
                  <ul className="space-y-4">
                    <li>
                      <h4 className="font-medium text-gray-900">How can I find a dietitian?</h4>
                      <p className="text-gray-600">You can browse our dietitian directory and filter by location or specialization.</p>
                    </li>
                    <li>
                      <h4 className="font-medium text-gray-900">Are the AI recommendations reliable?</h4>
                      <p className="text-gray-600">Our AI provides general guidance based on nutritional science, but always consult a professional for personalized advice.</p>
                    </li>
                    <li>
                      <h4 className="font-medium text-gray-900">How do I become a listed dietitian?</h4>
                      <p className="text-gray-600">If you're a qualified dietitian in Pakistan, contact us at partners@nutricare.pk</p>
                    </li>
                  </ul>
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
