
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref: headingRef, inView: headingInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: accordionRef, inView: accordionInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    // Add a slight delay to ensure smooth page entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const faqCategories = [
    {
      title: "General",
      faqs: [
        {
          question: "What is Dietitian Bridge?",
          answer: "Dietitian Bridge is Pakistan's premier platform connecting patients with qualified dietitians. We provide easy access to professional nutrition guidance, personalized diet plans, and evidence-based advice tailored to Pakistani dietary habits and health concerns."
        },
        {
          question: "How does Dietitian Bridge work?",
          answer: "Our platform allows you to browse profiles of certified dietitians, view their qualifications and specialties, and book appointments either in-person or via video consultation. Once connected, the dietitian will create a personalized nutrition plan based on your health goals, medical history, and food preferences."
        },
        {
          question: "Is Dietitian Bridge available throughout Pakistan?",
          answer: "Yes, Dietitian Bridge services are available across major cities in Pakistan including Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Quetta, and others. With our video consultation service, you can connect with dietitians from anywhere in the country."
        }
      ]
    },
    {
      title: "Consultations & Appointments",
      faqs: [
        {
          question: "How do I book an appointment with a dietitian?",
          answer: "You can book an appointment by browsing our dietitian directory, selecting a dietitian that matches your needs, and clicking on either 'Video Consultation' or 'Book Appointment' button. Follow the prompts to select a date and time, enter your contact information, and confirm your appointment."
        },
        {
          question: "What happens during the first consultation?",
          answer: "During your first consultation, the dietitian will assess your current diet, medical history, lifestyle, and nutritional goals. They'll ask questions about your eating habits, activity level, and any health concerns. Based on this information, they'll work with you to develop a personalized nutrition plan."
        },
        {
          question: "How long are the consultation sessions?",
          answer: "Initial consultations typically last 45-60 minutes, while follow-up sessions are usually 20-30 minutes. The exact duration may vary depending on the dietitian and your specific needs."
        },
        {
          question: "What's the difference between in-person and video consultations?",
          answer: "In-person consultations take place at the dietitian's clinic, allowing for physical assessments like body measurements. Video consultations offer the same professional advice but from the comfort of your home, saving travel time and providing flexibility. Both consultation types offer the same quality of nutritional guidance."
        }
      ]
    },
    {
      title: "Payments & Plans",
      faqs: [
        {
          question: "What are the consultation fees?",
          answer: "Consultation fees vary by dietitian based on their experience, qualifications, and location. You can view each dietitian's fee on their profile before booking. Typically, fees range from Rs. 1,000 to Rs. 3,000 for an initial consultation, with follow-up sessions priced lower."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept various payment methods including credit/debit cards, mobile wallets like EasyPaisa and JazzCash, and bank transfers. All online payments are securely processed through our payment gateway."
        },
        {
          question: "Do you offer subscription plans?",
          answer: "Yes, we offer several nutrition subscription plans that provide ongoing support at a reduced rate. Our Basic, Regular, and Lifetime plans include different levels of services to suit various needs and budgets. You can view details on our Plans page."
        }
      ]
    },
    {
      title: "Technical Questions",
      faqs: [
        {
          question: "What do I need for a video consultation?",
          answer: "For video consultations, you need a device (smartphone, tablet, or computer) with a camera and microphone, a stable internet connection, and a quiet, well-lit space. Our platform works on most modern browsers without requiring any additional software installation."
        },
        {
          question: "Is my personal and health information kept confidential?",
          answer: "Yes, we take privacy very seriously. All your personal and health information is encrypted and securely stored in compliance with data protection regulations. Our dietitians are bound by professional ethics to maintain patient confidentiality."
        },
        {
          question: "What if I experience technical issues during my video consultation?",
          answer: "If you encounter technical difficulties during a video consultation, you can use our in-app chat feature to communicate with your dietitian. If the issues persist, the session can be rescheduled at no additional cost, or you can switch to a phone consultation."
        }
      ]
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-nutrition-50 to-white py-16">
          <div 
            ref={headingRef}
            className={cn(
              "container mx-auto px-4 text-center",
              headingInView ? "animate-fade-up" : "opacity-0"
            )}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about Dietitian Bridge, consultations, nutrition plans, and more.
            </p>
          </div>
        </div>

        {/* FAQs Section */}
        <section className="py-12">
          <div 
            ref={accordionRef}
            className={cn(
              "container mx-auto px-4 max-w-4xl",
              accordionInView ? "animate-fade-up" : "opacity-0"
            )}
          >
            {faqCategories.map((category, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">{category.title}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`faq-${index}-${faqIndex}`}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                        <span className="font-medium text-left">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-4 text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              If you couldn't find the answer you were looking for, our support team is here to help. 
              Get in touch with us and we'll get back to you as soon as possible.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary/90 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;