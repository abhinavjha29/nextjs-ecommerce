"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/lib/store";
import { logout } from "@/app/lib/UserSlice";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
const LogoutBtn = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    Cookies.remove("token");
    dispatch(logout());
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
