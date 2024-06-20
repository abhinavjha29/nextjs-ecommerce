"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAuth } from "../app/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  // const [isAuth, setIsAuth] = useState(false);

  const router = useRouter();
  useLayoutEffect(() => {
    if (!isAuthenticated) {
      toast.error("You are not logged in");
      router.push("/login");
    }
  }, [isAuthenticated]);
  console.log("authentication", isAuthenticated);

  console.log("inside authentication");
  {
    isAuthenticated && <> {children}</>;
  }
};

export default ProtectedRoute;
