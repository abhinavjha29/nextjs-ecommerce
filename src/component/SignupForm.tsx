"use client";
import { userSignUp } from "@/app/api/user/route";
import { login } from "@/app/lib/UserSlice";
import { AppDispatch } from "@/app/lib/store";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./LoginForm.css";
const SignupForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const validateEmail = (email: string): boolean => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,}$/;
    return passwordRegex.test(password);
  };

  const validateName = (name: string): boolean => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const handleFormSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setNameError("");

    let isValid = true;

    if (!validateName(name)) {
      setNameError("Name should only contain English alphabets.");
      isValid = false;
    }

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

    const userData = { email, password, name };

    try {
      const response = await userSignUp(userData);
      console.log(response);
      if (response) {
        toast.success("Signup Successful");
        const token = Cookies.set("token", response.data.token);
        dispatch(login());
        router.push("/");
      } else {
        toast.error("SignUp Unsuccseful");
      }
      // Redirect or handle success response
    } catch (error) {
      console.error("Error signing up:", error);
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
          type="text"
          className={`form-control ${nameError ? "is-invalid" : ""}`}
          id="floatingName"
          placeholder="Abhinav"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <label htmlFor="floatingName">Name</label>
        {nameError && <div className="invalid-feedback">{nameError}</div>}
      </div>
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
      <div className="form-floating mb-3">
        <input
          type={showPassword ? "text" : "password"}
          className={`form-control ${passwordError ? "is-invalid" : ""}`}
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
        SignUp
      </button>
      <hr className="my-4" />
      <small className="text-body-secondary">
        By clicking SignUp, you agree to the terms of use.
      </small>
    </form>
  );
};

export default SignupForm;
