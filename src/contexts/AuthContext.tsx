
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "@/components/ui/sonner";

// Define the admin credentials
const ADMIN_USERNAME = "Admin123";
const ADMIN_PASSWORD = "Admin@123";

// Define the auth context type
type AuthContextType = {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
});

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const login = (username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      toast.success("Admin login successful");
      return true;
    } else {
      toast.error("Invalid username or password");
      return false;
    }
  };

  const logout = () => {
    setIsAdmin(false);
    toast.info("Admin logged out");
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using this context
export const useAuth = () => useContext(AuthContext);
