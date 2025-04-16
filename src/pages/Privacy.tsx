
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const Privacy = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Privacy Policy</h1>
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
              At Dietitian Bridge ("we," "our," or "us"), we take your privacy seriously. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you use our website, 
              mobile application, and services (collectively, the "Services").
            </p>
            
            <p>
              Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge 
              that you have read, understood, and agree to be bound by this Privacy Policy. If you do not 
              agree with our policies and practices, please do not use our Services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We collect several types of information from and about users of our Services:</p>

            <h3>2.1 Personal Information</h3>
            <p>
              Personal information is data that can be used to identify you directly or indirectly. 
              We collect personal information that you voluntarily provide to us when you:
            </p>
            <ul>
              <li>Register for an account</li>
              <li>Fill out a form</li>
              <li>Book a consultation</li>
              <li>Submit a diet or health questionnaire</li>
              <li>Communicate with dietitians through our platform</li>
              <li>Contact us</li>
            </ul>
            
            <p>The personal information we collect may include:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Address</li>
              <li>Date of birth</li>
              <li>Gender</li>
              <li>Profile pictures</li>
              <li>Payment information</li>
            </ul>

            <h3>2.2 Health Information</h3>
            <p>
              As part of our Services, we may collect certain health-related information, including:
            </p>
            <ul>
              <li>Height, weight, and body measurements</li>
              <li>Medical conditions and allergies</li>
              <li>Dietary preferences and restrictions</li>
              <li>Fitness level and activities</li>
              <li>Health goals</li>
              <li>Medication information</li>
            </ul>
            
            <p>
              We treat this health information with extra care and protect it in accordance with 
              applicable healthcare privacy laws and regulations.
            </p>

            <h3>2.3 Usage Data</h3>
            <p>
              We automatically collect certain information when you visit, use, or navigate our Services. 
              This information does not reveal your specific identity but may include:
            </p>
            <ul>
              <li>Device and browser information</li>
              <li>IP address</li>
              <li>Operating system</li>
              <li>Browser type and version</li>
              <li>Pages of our Services that you visit</li>
              <li>Time spent on those pages</li>
              <li>Referring website addresses</li>
              <li>Other diagnostic data</li>
            </ul>

            <h3>2.4 Cookies and Similar Technologies</h3>
            <p>
              We use cookies and similar tracking technologies to track activity on our Services and to 
              hold certain information. Cookies are files with a small amount of data that may include an 
              anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate 
              when a cookie is being sent.
            </p>

            <h2>3. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including:</p>
            <ul>
              <li>Providing, maintaining, and improving our Services</li>
              <li>Processing and completing transactions</li>
              <li>Facilitating communication between patients and dietitians</li>
              <li>Creating and personalizing your account</li>
              <li>Developing personalized nutrition plans</li>
              <li>Sending administrative information, such as updates, security alerts, and support messages</li>
              <li>Sending promotional communications, such as special offers, newsletters, and marketing materials</li>
              <li>Responding to your comments, questions, and requests</li>
              <li>Monitoring and analyzing trends, usage, and activities</li>
              <li>Detecting, preventing, and addressing technical issues</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h2>4. How We Share Your Information</h2>
            <p>
              We may share your information in the following situations:
            </p>

            <h3>4.1 With Healthcare Providers</h3>
            <p>
              If you're a patient, we share your information with the dietitians you choose to consult 
              with through our platform to facilitate your nutrition counseling. Similarly, if you're a 
              dietitian, we share your professional information with patients who are seeking your services.
            </p>

            <h3>4.2 With Service Providers</h3>
            <p>
              We may share your information with third-party vendors, service providers, contractors, 
              or agents who perform services on our behalf and require access to such information to do 
              that work. Examples include payment processing, data analysis, email delivery, hosting services, 
              and customer service.
            </p>

            <h3>4.3 For Business Transfers</h3>
            <p>
              We may share or transfer your information in connection with, or during negotiations of, 
              any merger, sale of company assets, financing, or acquisition of all or a portion of our 
              business to another company.
            </p>

            <h3>4.4 With Your Consent</h3>
            <p>
              We may disclose your personal information for any other purpose with your consent.
            </p>

            <h3>4.5 Legal Requirements</h3>
            <p>
              We may disclose your information where we are legally required to do so to comply with 
              applicable law, governmental requests, judicial proceedings, court orders, or legal processes.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We will retain your personal information only for as long as is necessary for the purposes 
              set out in this Privacy Policy. We will retain and use your information to the extent necessary 
              to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.
            </p>
            
            <p>
              We will also retain usage data for internal analysis purposes. Usage data is generally retained 
              for a shorter period, except when this data is used to strengthen the security or to improve the 
              functionality of our Services, or we are legally obligated to retain this data for longer periods.
            </p>

            <h2>6. Data Security</h2>
            <p>
              The security of your personal information is important to us, but remember that no method of 
              transmission over the Internet or method of electronic storage is 100% secure. While we strive 
              to use commercially acceptable means to protect your personal information, we cannot guarantee 
              its absolute security.
            </p>
            
            <p>
              We implement appropriate technical and organizational measures to maintain the security of your 
              personal information, including:
            </p>
            <ul>
              <li>Encrypting sensitive information using secure SSL technology</li>
              <li>Regularly reviewing our information collection, storage, and processing practices</li>
              <li>Restricting access to personal information to employees, contractors, and agents on a need-to-know basis</li>
              <li>Utilizing firewalls, encryption, and other security technologies</li>
            </ul>

            <h2>7. Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information. 
              These may include:
            </p>
            <ul>
              <li>The right to access the personal information we have about you</li>
              <li>The right to request that we correct any inaccurate personal information</li>
              <li>The right to request that we delete your personal information</li>
              <li>The right to object to processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            
            <p>
              To exercise any of these rights, please contact us at mtahseen1122@gmail.com.
            </p>

            <h2>8. Children's Privacy</h2>
            <p>
              Our Services are not intended for children under the age of 18. We do not knowingly collect 
              personal information from children under 18. If you are a parent or guardian and you are aware 
              that your child has provided us with personal information, please contact us. If we discover 
              that a child under 18 has provided us with personal information, we will delete such information 
              from our servers immediately.
            </p>

            <h2>9. Changes to this Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last Updated" date at the top of this 
              Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
            </p>
            
            <p>
              Your continued use of our Services after any changes to this Privacy Policy constitutes your 
              acceptance of such changes.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at mtahseen1122@gmail.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
