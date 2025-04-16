
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const Terms = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref: contentRef, inView: contentInView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1 
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Terms of Service</h1>
            <p className="text-lg text-gray-600">Last Updated: April 15, 2025</p>
          </div>
          
          <div 
            ref={contentRef}
            className={cn(
              "prose prose-lg max-w-none",
              contentInView ? "animate-fade-up" : ""
            )}
          >
            <h2>1. Introduction</h2>
            <p>
              Welcome to Dietitian Bridge ("we," "our," or "us"). These Terms of Service ("Terms") govern your access 
              to and use of the Dietitian Bridge website, mobile application, and services (collectively, the "Services").
            </p>
            
            <p>
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, 
              please do not access or use our Services. These Terms constitute a legally binding agreement between you and 
              Dietitian Bridge.
            </p>

            <h2>2. Eligibility</h2>
            <p>
              You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that 
              you are 18 years of age or older. If you are using our Services on behalf of an organization or entity, you 
              represent and warrant that you have the authority to bind that organization or entity to these Terms.
            </p>

            <h2>3. Account Registration</h2>
            <p>
              To access certain features of our Services, you may need to register for an account. When you register, you 
              agree to provide accurate, current, and complete information about yourself. You are responsible for 
              safeguarding your account credentials and for all activities that occur under your account. You agree to 
              notify us immediately of any unauthorized use of your account.
            </p>
            
            <p>
              We reserve the right to disable your account if we determine, in our sole discretion, that you have violated 
              these Terms or that your account information is inaccurate.
            </p>

            <h2>4. User Types and Roles</h2>
            <p>
              Our platform serves two primary types of users: Patients and Dietitians. Each user type has specific rights 
              and responsibilities:
            </p>
            
            <h3>4.1 Patients</h3>
            <p>
              As a Patient, you may use our Services to find qualified dietitians, book consultations, receive personalized 
              nutrition plans, and engage in nutrition-related discussions. You acknowledge that the information provided 
              through our Services is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            
            <h3>4.2 Dietitians</h3>
            <p>
              As a Dietitian, you may use our Services to offer your professional services, connect with patients, provide 
              consultations, and create personalized nutrition plans. You represent and warrant that you hold all necessary 
              qualifications, certifications, and licenses required to provide nutrition advice in your jurisdiction.
            </p>

            <h2>5. Services and Payments</h2>
            <p>
              We offer various services including but not limited to dietitian consultations, personalized nutrition plans, 
              and educational resources. Specific services may have additional terms that will be presented to you at the 
              time you use such services.
            </p>
            
            <h3>5.1 Fees and Payments</h3>
            <p>
              Some of our Services require payment of fees. All fees are stated in Pakistani Rupees (PKR) unless otherwise 
              specified. You agree to pay all applicable fees as described on our website or mobile application. All payments 
              are non-refundable except as expressly set forth in these Terms or as required by applicable law.
            </p>
            
            <h3>5.2 Subscription Services</h3>
            <p>
              Some of our Services are offered on a subscription basis. By signing up for a subscription, you authorize us 
              to charge your payment method on a recurring basis for the subscription fee until you cancel your subscription.
            </p>

            <h2>6. User Content</h2>
            <p>
              Our Services may allow you to post, upload, or submit content ("User Content"). You retain all rights in any 
              User Content you submit, post, or display through our Services, and you are solely responsible for your User 
              Content and the consequences of posting it.
            </p>
            
            <p>
              By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, 
              modify, adapt, publish, translate, distribute, and display such User Content in connection with providing and 
              promoting our Services.
            </p>

            <h2>7. Prohibited Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use our Services for any illegal purpose or in violation of any local, state, national, or international law</li>
              <li>Violate or encourage others to violate the rights of third parties</li>
              <li>Post or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, 
              obscene, or otherwise objectionable</li>
              <li>Interfere with or disrupt the operation of our Services or the servers or networks used to make our Services 
              available</li>
              <li>Attempt to gain unauthorized access to our Services, other accounts, computer systems, or networks</li>
              <li>Use our Services for any commercial purpose without our prior written consent</li>
            </ul>

            <h2>8. Intellectual Property Rights</h2>
            <p>
              The content, organization, graphics, design, compilation, and other matters related to our Services are protected 
              under applicable intellectual property laws. Except as expressly provided in these Terms, we and our licensors 
              reserve all rights in and to our Services and all intellectual property rights therein.
            </p>
            
            <p>
              Dietitian Bridge, the Dietitian Bridge logo, and other marks, logos, and designs used in connection with our 
              Services are trademarks or registered trademarks of Dietitian Bridge. You may not use any of these marks without 
              our prior written permission.
            </p>

            <h2>9. Disclaimer of Warranties</h2>
            <p>
              OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR 
              IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, 
              THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            
            <p>
              WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, OR THAT DEFECTS WILL 
              BE CORRECTED. YOU UNDERSTAND AND AGREE THAT YOUR USE OF OUR SERVICES IS AT YOUR OWN RISK.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR ACCESS TO OR USE OF, OR INABILITY 
              TO ACCESS OR USE, OUR SERVICES OR ANY CONTENT THEREON.
            </p>
            
            <p>
              OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF OUR SERVICES 
              WILL NOT EXCEED THE AMOUNT PAID BY YOU TO US DURING THE THREE-MONTH PERIOD PRECEDING THE EVENT GIVING RISE TO 
              THE LIABILITY.
            </p>

            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold us harmless from and against any claims, liabilities, damages, losses, 
              and expenses, including, without limitation, reasonable legal fees, arising out of or in any way connected with 
              your access to or use of our Services or your violation of these Terms.
            </p>

            <h2>12. Termination</h2>
            <p>
              We may terminate or suspend your access to our Services at any time, with or without cause, and without prior 
              notice or liability. You may terminate your account at any time by contacting us at mtahseen1122@gmail.com.
            </p>
            
            <p>
              Upon termination, your right to use our Services will immediately cease. All provisions of these Terms that by 
              their nature should survive termination shall survive, including, without limitation, ownership provisions, 
              warranty disclaimers, indemnity, and limitations of liability.
            </p>

            <h2>13. Changes to these Terms</h2>
            <p>
              We may revise these Terms from time to time. The most current version will always be posted on our website. 
              If a revision, in our sole discretion, is material, we will notify you through our Services or by email. By 
              continuing to access or use our Services after revisions become effective, you agree to be bound by the revised 
              Terms.
            </p>

            <h2>14. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of Pakistan, without regard to its conflict of law principles. Any 
              dispute arising from these Terms or your use of our Services shall be exclusively resolved in the courts of 
              Pakistan.
            </p>

            <h2>15. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at mtahseen1122@gmail.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
