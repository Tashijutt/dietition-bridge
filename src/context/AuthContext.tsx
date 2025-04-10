import { createContext, useContext, useState, ReactNode, useEffect } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

interface User {
  _id?: string;
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "dietitian";
  profileImage?: string;
  phone?: string;
  gender?: "male" | "female" | "other";
  age?: number;
  weight?: number;
  height?: number;
  healthConditions?: string[];
  bio?: string;
  dietaryPreferences?: string;
}

interface AuthContextType {
  user: User | null;
  token: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isDietitian: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role?: "user" | "dietitian") => Promise<void>;
  updateUserProfile?: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  
  useEffect(() => {
    const storedUser = localStorage.getItem("userAuth");
    const storedProfileImage = localStorage.getItem("userProfileImage");
    
    if (storedUser) {
      try {
        const parsedData = JSON.parse(storedUser);
        const parsedUser = parsedData.user;
        
        if (parsedUser) {
          if (storedProfileImage && !parsedUser.profileImage) {
            parsedUser.profileImage = storedProfileImage;
          }
          
          setUser(parsedUser);
          
          if (parsedData.token) {
            setToken(parsedData.token);
          }
        } else {
          setUser(parsedData);
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("userAuth");
      }
    }
    
    setLoading(false);
  }, []);

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
      const { user: userObject, token: authToken } = userData;
      
      setUser(userObject);
      setToken(authToken);
      
      localStorage.setItem("userAuth", JSON.stringify(userData));
      
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const mockLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      if (email === "admin@dietitianbridge.com" && password === "admin123") {
        const adminUser: User = {
          id: "admin1",
          name: "Admin User",
          email: "admin@dietitianbridge.com",
          role: "admin",
        };
        setUser(adminUser);
        const userData = { user: adminUser, token: "mock-token-admin" };
        localStorage.setItem("userAuth", JSON.stringify(userData));
        return;
      }
      
      if (email === "dietitian@example.com" && password === "dietitian123") {
        const dietitianUser: User = {
          id: "dietitian1",
          name: "Dr. Ayesha Ahmed",
          email: "dietitian@example.com",
          role: "dietitian",
        };
        setUser(dietitianUser);
        const userData = { user: dietitianUser, token: "mock-token-dietitian" };
        localStorage.setItem("userAuth", JSON.stringify(userData));
        return;
      }
      
      if (email === "user@example.com" && password === "user123") {
        const regularUser: User = {
          id: "user1",
          name: "Sarah Khan",
          email: "user@example.com",
          role: "user",
        };
        setUser(regularUser);
        const userData = { user: regularUser, token: "mock-token-user" };
        localStorage.setItem("userAuth", JSON.stringify(userData));
        return;
      }
      
      throw new Error("Invalid credentials");
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: "user" | "dietitian" = "user") => {
    try {
      setLoading(true);
      
      const newUser: User = {
        id: `user${Date.now()}`,
        name,
        email,
        role: role,
      };

      setUser(newUser);
      const userData = { user: newUser, token: `mock-token-${role}-${Date.now()}` };
      localStorage.setItem("userAuth", JSON.stringify(userData));
      
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("userAuth");
  };

  const updateUserProfile = (updatedUser: User) => {
    setUser(updatedUser);
    
    const storedAuth = localStorage.getItem("userAuth");
    let authData = { user: updatedUser, token };
    
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        authData = { ...parsedAuth, user: updatedUser };
      } catch (error) {
        console.error("Error parsing stored auth data:", error);
      }
    }
    
    localStorage.setItem("userAuth", JSON.stringify(authData));
    
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
      token,
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
