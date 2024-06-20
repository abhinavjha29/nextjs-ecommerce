"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LogoutBtn from "./LogoutBtn";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store/store";
import { Routes } from "@/utils/Routes";
import ProfileModal from "@/component/modals/ProfileModal";
import { PROFILE } from "@/utils/constants";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const profile = Cookies.get(PROFILE);
  console.log("profile is", profile);
  const token = useSelector((state: RootState) => state.user.token);

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
        <div className="container d-flex justify-content-between align-items-center">
          <ul className="nav me-auto">
            <li className="nav-item">
              <Link
                href={Routes.Home}
                className="nav-link link-body-emphasis px-2 active"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link
                  href={Routes.Product}
                  className="nav-link link-body-emphasis px-2"
                >
                  Products
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                href={Routes.About}
                className="nav-link link-body-emphasis px-2"
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href={Routes.FAQ}
                className="nav-link link-body-emphasis px-2"
              >
                FAQs
              </Link>
            </li>
            {isLoggedIn && isAdmin && (
              <li className="nav-item">
                <Link
                  href={Routes.ADMIN}
                  className="nav-link link-body-emphasis px-2"
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
          {!profile && isLoggedIn && (
            <div className="text-center" style={{ marginRight: "22rem" }}>
              <span
                className="text-warning cursor-pointer"
                onClick={() => setShowModal(true)}
                style={{ cursor: "pointer" }}
              >
                Please complete your profile
              </span>
            </div>
          )}
          <ul className="nav">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <LogoutBtn setIsLoggedIn={setIsLoggedIn} />
                </li>
                <li className="nav-item">
                  <Link
                    href={Routes.cart}
                    className="nav-link link-body-emphasis px-2"
                  >
                    Cart
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    href={Routes.Login}
                    className="nav-link link-body-emphasis px-2"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    href={Routes.signup}
                    className="nav-link link-body-emphasis px-2"
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {showModal && (
        <ProfileModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </>
  );
};

export default Navbar;
