"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
interface AuthContextProps {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      console.log(token);
      setIsAuthenticated(true);
    }
  }, []);
  console.log(isAuthenticated);
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log(context);
  if (context === undefined) {
    throw new Error("useAuth bot inside provier");
  }
  return context;
};
