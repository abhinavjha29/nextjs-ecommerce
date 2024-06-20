"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/lib/store/store";
import { logout } from "@/app/lib/store/UserSlice";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
interface LogoutBtnProps {
  setIsLoggedIn: (value: boolean) => void;
}
const LogoutBtn: React.FC<LogoutBtnProps> = ({ setIsLoggedIn }) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    Cookies.remove("token");
    dispatch(logout());
    setIsLoggedIn(false);
    router.replace("/");
  };
  return (
    <button
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        handleLogOut(e);
      }}
      className="nav-link link-body-emphasis px-2"
    >
      Log out
    </button>
  );
};

export default LogoutBtn;
