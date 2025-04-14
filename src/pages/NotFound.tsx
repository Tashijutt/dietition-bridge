
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-md p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-red-500">404</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          We're sorry, the page you requested could not be found. Please check the URL or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild variant="default">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Return to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
