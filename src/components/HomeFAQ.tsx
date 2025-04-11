
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
    question: "What makes Nutri-Vision different from other nutrition apps?",
    answer: "Nutri-Vision offers personalized diet plans crafted by qualified dietitians from across Pakistan. We combine human expertise with AI-powered recommendations to create nutrition plans specifically adapted to Pakistani cuisine and health needs."
  },
  {
    question: "How do I choose the right dietitian for my needs?",
    answer: "You can browse our directory of verified dietitians, filtered by specialty (diabetes, weight management, etc.), location, and patient ratings. Each dietitian profile includes their qualifications, experience, and approach to nutrition guidance."
  },
  {
    question: "Can I get nutrition advice specific to my medical condition?",
    answer: "Yes, our platform specializes in nutritional guidance for various health conditions including diabetes, hypertension, heart disease, and digestive disorders, all adapted to Pakistani dietary preferences."
  },
  {
    question: "How does the AI-powered nutritional guidance work?",
    answer: "Our AI nutrition assistant analyzes your health data, dietary preferences, and health goals to provide instant recommendations. For more comprehensive guidance, it works alongside our human dietitians to create fully personalized meal plans."
  },
  {
    question: "Are online consultations as effective as in-person visits?",
    answer: "Yes, research shows that online nutrition counseling can be just as effective as in-person consultations. Our platform enables dietitians to review your progress, adjust your plans, and provide continuous support remotely."
  },
  {
    question: "How much do the nutrition plans cost?",
    answer: "We offer a range of plans starting from free basic guidance to premium personalized plans. Pricing varies based on the level of personalization, dietitian expertise, and duration of the plan. View our pricing page for detailed information."
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
      </div>
    </section>
  );
};

export default HomeFAQ;
