
import { useInView } from 'react-intersection-observer';
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ReadyToChangeSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div 
          ref={ref} 
          className={cn(
            "bg-[#004D40] rounded-xl text-white py-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between",
            inView ? "animate-fade-up" : "opacity-0"
          )}
        >
          <div className="md:max-w-2xl mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to make a change?</h2>
            <p className="text-lg text-white/90 mb-2">
              Get advice from registered dietitians. No insurance needed—
              <Link to="/about" className="underline hover:text-white/80">learn more</Link>.
            </p>
          </div>
          <Link 
            to="/signin" 
            className="bg-white text-[#004D40] px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-colors flex items-center gap-2 shadow-md"
          >
            Register for free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReadyToChangeSection;
