"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.user.token);
  console.log(token);
  useEffect(() => {
    const token = Cookies.get("token");
    const admin = Cookies.get("isAdmin");
    if (token) {
      setIsLoggedIn(true);
      if (admin === "true") {
        setIsAdmin(true);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, [token]);
  return (
    <>
      <nav className="py-2 bg-body-tertiary border-bottom">
        <div className="container d-flex flex-wrap">
          <ul className="nav me-auto">
            <li className="nav-item">
              <Link
                href="/"
                className="nav-link link-body-emphasis px-2 active"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link
                  href="/product"
                  className="nav-link link-body-emphasis px-2"
                >
                  Prodcts
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link href="/about" className="nav-link link-body-emphasis px-2">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/faq" className="nav-link link-body-emphasis px-2">
                FAQs
              </Link>
            </li>
            {isLoggedIn && isAdmin && (
              <li className="nav-item">
                <Link
                  href="/admin"
                  className="nav-link link-body-emphasis px-2"
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
          <ul className="nav">
            <li className="nav-item">
              {isLoggedIn ? (
                <LogoutBtn />
              ) : (
                <Link
                  href="/login"
                  className="nav-link link-body-emphasis px-2"
                >
                  Login
                </Link>
              )}
            </li>
            {!isLoggedIn && (
              <li className="nav-item">
                <Link
                  href="/signup"
                  className="nav-link link-body-emphasis px-2"
                >
                  Sign up
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link href="/cart" className="nav-link link-body-emphasis px-2">
                  Cart
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
