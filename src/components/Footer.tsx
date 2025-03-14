
import { Heart, MessageCircle, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
              <Heart className="h-6 w-6 text-nutrition-400 fill-nutrition-400" />
              <span className="tracking-tight">NutriCare</span>
              <sup className="text-xs font-normal text-health-400">Pakistan</sup>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting patients with qualified dietitians across Pakistan and providing personalized nutrition guidance for better health outcomes.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Find a Dietitian', 'Blog', 'FAQs'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors inline-block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">contact@nutricare.pk</span>
              </li>
              <li className="flex items-start">
                <MessageCircle className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">Live chat available 9 AM - 5 PM, Monday to Friday</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest nutrition tips and updates.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-nutrition-500 focus:border-transparent transition-all duration-200 outline-none text-white"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-nutrition-600 text-white rounded-md hover:bg-nutrition-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} NutriCare Pakistan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
