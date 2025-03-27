
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
          style={{ color: "#21205F" }}
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#FF9E15" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        <span className="ml-2 text-xl font-bold" style={{ color: "#21205F" }}>
          Dietitian Bridge
        </span>
      </div>
    </Link>
  );
};

export default Logo;
