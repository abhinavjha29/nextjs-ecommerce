"use client";
import { userLogin } from "@/app/api/user/route";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/lib/store";
import { login, setIsAdmin } from "@/app/lib/UserSlice";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./LoginForm.css";
const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.token);

  console.log(user);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.trim().length > 0;
  };

  const handleFormSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 5 characters long and contain at least one symbol."
      );
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const userData = { email, password };
    console.log("Form submitted with data:", userData);

    try {
      const response = await userLogin(userData);
      console.log(response);
      if (response) {
        Cookies.set("token", response.data.token, { expires: 7 });
        const token = response.data;

        if (response.data.user.isAdmin) {
          const isAdmin = Cookies.set("isAdmin", "true", { expires: 7 });
          dispatch(login());
          dispatch(setIsAdmin());
          toast.success("Login successful! Welcome Admin");
          router.push("/product");
        } else {
          dispatch(login());
          toast.success("Login successful!");
          router.push("/product");
        }
      } else {
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      console.log("error at login");
      console.error("Error logging in:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };
  const toggleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <form
      onSubmit={handleFormSubmission}
      className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
    >
      <div className="form-floating mb-3">
        <input
          type="email"
          className={`form-control ${emailError ? "is-invalid" : ""}`}
          id="floatingInput"
          placeholder="name@example.com"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <label htmlFor="floatingInput">Email address</label>
        {emailError && <div className="invalid-feedback">{emailError}</div>}
      </div>
      <div className="form-floating mb-3 password-input-container">
        <input
          type={showPassword ? "text" : "password"}
          className={`form-control password-input ${
            passwordError ? "is-invalid" : ""
          }`}
          id="floatingPassword"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button className="toggle-password-button" onClick={toggleShowPassword}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        <label htmlFor="floatingPassword">Password</label>
        {passwordError && (
          <div className="invalid-feedback">{passwordError}</div>
        )}
      </div>
      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Login
      </button>
      <hr className="my-4" />
      <Link href="/signup">
        <small className="text-body-secondary">New User ,Click Here</small>
      </Link>
    </form>
  );
};

export default LoginForm;
