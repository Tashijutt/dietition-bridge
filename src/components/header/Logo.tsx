
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="flex items-center">
        <img
          src="/db-uploads/dd607c1a-a2f2-410f-974d-5920f94bab84.png"
          alt="Dietitian Bridge Logo"
          className="h-20 w-auto" // 80px height (h-20)
        />
      </div>
    </Link>
  );
};

export default Logo;
