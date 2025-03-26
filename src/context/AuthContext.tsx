import { createContext, useContext, useState, ReactNode, useEffect } from "react";

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
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile?: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check if user data exists in localStorage
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
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call to verify credentials
      // For demo purposes, we'll use mock data
      
      // Admin credentials
      if (email === "admin@dietitianbridge.com" && password === "admin123") {
        const adminUser: User = {
          id: "admin1",
          name: "Admin User",
          email: "admin@dietitianbridge.com",
          role: "admin",
        };
        setUser(adminUser);
        localStorage.setItem("userAuth", JSON.stringify(adminUser));
        return;
      }
      
      // Dietitian credentials
      if (email === "dietitian@example.com" && password === "dietitian123") {
        const dietitianUser: User = {
          id: "dietitian1",
          name: "Dr. Ayesha Ahmed",
          email: "dietitian@example.com",
          role: "dietitian",
        };
        setUser(dietitianUser);
        localStorage.setItem("userAuth", JSON.stringify(dietitianUser));
        return;
      }
      
      // Regular user credentials
      if (email === "user@example.com" && password === "user123") {
        const regularUser: User = {
          id: "user1",
          name: "Sarah Khan",
          email: "user@example.com",
          role: "user",
        };
        setUser(regularUser);
        localStorage.setItem("userAuth", JSON.stringify(regularUser));
        return;
      }
      
      // If no match
      throw new Error("Invalid credentials");
    } catch (error) {
      throw error;
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
      login, 
      logout,
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
