
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SignIn = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would implement actual authentication logic
  };

  useEffect(() => {
    // Add a slight delay to ensure smooth page entrance animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {isSignUp ? 'Create an Account' : 'Welcome Back'}
                </h1>
                <p className="text-gray-600">
                  {isSignUp 
                    ? 'Sign up to access personalized nutrition plans' 
                    : 'Sign in to access your account'}
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {isSignUp && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required={isSignUp}
                        className="pl-10 px-4 py-2.5 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-nutrition-500 focus:border-transparent transition-all duration-200 outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-10 px-4 py-2.5 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-nutrition-500 focus:border-transparent transition-all duration-200 outline-none"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    {!isSignUp && (
                      <Link to="#" className="text-xs text-nutrition-600 hover:text-nutrition-700">
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="pl-10 px-4 py-2.5 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-nutrition-500 focus:border-transparent transition-all duration-200 outline-none"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-nutrition-600 text-white font-medium rounded-lg shadow-sm hover:bg-nutrition-700 transition-all duration-300"
                >
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="ml-1 text-nutrition-600 hover:text-nutrition-700 font-medium"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>
              
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    className="w-full py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    Facebook
                  </button>
                </div>
              </div>
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-6">
              By continuing, you agree to NutriCare's
              <Link to="#" className="text-nutrition-600 hover:text-nutrition-700 mx-1">Terms of Service</Link>
              and
              <Link to="#" className="text-nutrition-600 hover:text-nutrition-700 ml-1">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
