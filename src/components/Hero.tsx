
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const animateElements = () => {
      const headingElement = containerRef.current?.querySelector('h1') as HTMLElement | null;
      const subheadingElement = containerRef.current?.querySelector('p') as HTMLElement | null;
      const ctaElement = containerRef.current?.querySelector('.cta-container') as HTMLElement | null;
      
      if (headingElement) {
        headingElement.classList.add('animate-fade-up');
        headingElement.style.opacity = '1';
      }
      
      setTimeout(() => {
        if (subheadingElement) {
          subheadingElement.classList.add('animate-fade-up');
          subheadingElement.style.opacity = '1';
        }
      }, 200);
      
      setTimeout(() => {
        if (ctaElement) {
          ctaElement.classList.add('animate-fade-up');
          ctaElement.style.opacity = '1';
        }
      }, 400);
    };
    
    animateElements();
  }, []);

  return (
    <div className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-nutrition-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-health-100 rounded-full blur-3xl opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 opacity-0">
            Personalized Diet Plans For Your
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-nutrition-600 to-health-500 px-2">
              Health Needs
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto opacity-0">
            Connect with qualified dietitians across Pakistan and get AI-powered nutrition advice tailored to your specific health conditions.
          </p>
          
          <div className="cta-container flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 opacity-0">
            <Link 
              to="/dietitians"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-nutrition-600 text-white font-medium rounded-full shadow-md hover:shadow-xl hover:bg-nutrition-700 transition-all duration-300"
            >
              Find a Dietitian
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <Link 
              to="/chat"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 bg-white text-gray-800 font-medium rounded-full shadow-sm hover:shadow-md hover:border-nutrition-500 hover:text-nutrition-600 transition-all duration-300"
            >
              Chat with AI
              <Zap className="w-4 h-4 text-nutrition-600" />
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 opacity-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
            {['Diabetic Diets', 'Hypertension Management', 'Weight Control', 'Balanced Nutrition'].map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-nutrition-500 mr-2"></div>
                <span className="text-sm font-medium text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
