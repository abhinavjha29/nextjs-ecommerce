"use client";
import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import Cookies from "js-cookie";
import { login, logout } from "@/app/lib/UserSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";

const Hero = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginToken = useSelector((state: RootState) => state.user.token);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch(login(token));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [loginToken]);

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
            Vertically centered hero sign-up form
          </h1>
          <p className="col-lg-10 fs-4">
            Below is an example form built entirely with Bootstrap’s form
            controls. Each required form group has a validation state that can
            be triggered by attempting to submit the form without completing it.
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          {!isLoggedIn && <LoginForm />}
          {isLoggedIn && <h1>Welcome Back , Please Continue shopping</h1>}
        </div>
      </div>
    </div>
  );
};

export default Hero;
