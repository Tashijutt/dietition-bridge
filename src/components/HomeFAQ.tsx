
import React, { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useInView } from "react-intersection-observer";

const FAQs = [
  {
    question: "How does the personalized diet plan work?",
    answer: "We provide personalized diet plans tailored to your health goals. 1-on-1 consultations with expert dietitians, meal planning guidance, and ongoing support to help you achieve sustainable lifestyle changes."
  },
  {
    question: "How do I connect with a dietitian?",
    answer: "You can easily book a consultation through our website. Once scheduled, you'll have a virtual or in-person session where a dietitian will assess your needs and create a personalized plan."
  },
  {
    question: "How do I book a consultation?",
    answer: "Simply visit our website, choose your preferred dietitian, select an available time slot, and confirm your booking."
  },
  {
    question: "How are the diet plans customized to my needs?",
    answer: "We analyze factors such as your metabolism, food preferences, medical conditions, activity level, and dietary restrictions to create a tailored plan that fits your lifestyle."
  },
  {
    question: "What makes Dietitian Bridge different from other nutrition platforms?",
    answer: "Dietitian Bridge offers personalized diet plans crafted by qualified dietitians from across Pakistan. We combine human expertise with AI-powered recommendations to create nutrition plans specifically adapted to Pakistani cuisine and health needs."
  },
  {
    question: "Are online consultations as effective as in-person visits?",
    answer: "Yes, research shows that online nutrition counseling can be just as effective as in-person consultations. Our platform enables dietitians to review your progress, adjust your plans, and provide continuous support remotely."
  }
];

const HomeFAQ = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className={`text-center mb-12 ${inView ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our nutrition services and how we can help you achieve your health goals.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {FAQs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className={`border border-gray-200 rounded-lg mb-3 shadow-sm bg-white ${
                  inView ? "animate-fade-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AccordionTrigger className="px-5 py-4 text-left font-medium text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 py-3 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="flex justify-center mt-12">
          <img 
            src="/lovable-uploads/c6d0bfb7-dbc8-4597-99a3-ff5b6b6523e5.png" 
            alt="FAQ Reference Image" 
            className="max-w-md w-full rounded-lg shadow-md opacity-90 hidden md:block" 
          />
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
