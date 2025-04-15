import { createContext, useContext, useState, ReactNode, useEffect } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

interface User {
  id: string;
  _id?: string;  // Added optional _id
  name: string;
  email: string;
  role: "admin" | "user" | "dietitian";
  profilePicture?: string;
  phone?: string;  // Added optional phone
  gender?: "male" | "female" | "other";  // Added optional gender
  age?: number;  // Added optional age
  weight?: number;  // Added optional weight
  height?: number;  // Added optional height
  healthConditions?: string[];  // Added optional healthConditions
  bio?: string;  // Added optional bio
  dietaryPreferences?: string[] | string;  // Added optional dietaryPreferences
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
  register: (name: string, email: string, password: string) => Promise<void>;
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
          if (storedProfileImage && !parsedUser.profilePicture) {
            parsedUser.profilePicture = storedProfileImage;
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

  const register = async (name: string, email: string, password: string, role: string = "user") => {
    try {
      setLoading(true);
      
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
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
    
    if (updatedUser.profilePicture) {
      localStorage.setItem("userProfileImage", updatedUser.profilePicture);
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
