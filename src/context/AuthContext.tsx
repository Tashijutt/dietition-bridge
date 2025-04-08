
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "dietitian";
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isDietitian: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateUserProfile?: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Load user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("userAuth");
    const storedProfileImage = localStorage.getItem("userProfileImage");
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      // Apply stored profile image if exists
      if (storedProfileImage && !parsedUser.profileImage) {
        parsedUser.profileImage = storedProfileImage;
      }
      
      setUser(parsedUser);
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
  
      const userData = await response.json();
      setUser(userData);
      localStorage.setItem("userAuth", JSON.stringify(userData));
      
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // const login = async (email: string, password: string) => {
  //   try {
  //     setLoading(true);
  //     // In a real app, this would be an API call to verify credentials
  //     // For demo purposes, we'll use mock data
      
  //     // Admin credentials
  //     if (email === "admin@dietitianbridge.com" && password === "admin123") {
  //       const adminUser: User = {
  //         id: "admin1",
  //         name: "Admin User",
  //         email: "admin@dietitianbridge.com",
  //         role: "admin",
  //       };
  //       setUser(adminUser);
  //       localStorage.setItem("userAuth", JSON.stringify(adminUser));
  //       return;
  //     }
      
  //     // Dietitian credentials
  //     if (email === "dietitian@example.com" && password === "dietitian123") {
  //       const dietitianUser: User = {
  //         id: "dietitian1",
  //         name: "Dr. Ayesha Ahmed",
  //         email: "dietitian@example.com",
  //         role: "dietitian",
  //       };
  //       setUser(dietitianUser);
  //       localStorage.setItem("userAuth", JSON.stringify(dietitianUser));
  //       return;
  //     }
      
  //     // Regular user credentials
  //     if (email === "user@example.com" && password === "user123") {
  //       const regularUser: User = {
  //         id: "user1",
  //         name: "Sarah Khan",
  //         email: "user@example.com",
  //         role: "user",
  //       };
  //       setUser(regularUser);
  //       localStorage.setItem("userAuth", JSON.stringify(regularUser));
  //       return;
  //     }
      
  //     // If no match
  //     throw new Error("Invalid credentials");
  //   } catch (error) {
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      // In a real app, this would be an API call to register a new user
      // For demo purposes, we'll create a mock user

      // Check if email is already used
      if (email === "admin@dietitianbridge.com" || 
          email === "dietitian@example.com" || 
          email === "user@example.com") {
        throw new Error("Email already in use");
      }

      const newUser: User = {
        id: `user${Date.now()}`, // Generate a unique ID
        name,
        email,
        role: "user", // New registrations are always regular users
      };

      setUser(newUser);
      localStorage.setItem("userAuth", JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // Don't remove profile image on logout to keep it persistent
    localStorage.removeItem("userAuth");
  };

  const updateUserProfile = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("userAuth", JSON.stringify(updatedUser));
    
    // If updating profile image, store it separately too for persistence
    if (updatedUser.profileImage) {
      localStorage.setItem("userProfileImage", updatedUser.profileImage);
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const isDietitian = user?.role === "dietitian";

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isAdmin, 
      isDietitian, 
      loading,
      login, 
      logout,
      register,
      updateUserProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
