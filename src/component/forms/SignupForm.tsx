"use client";
import { userSignUp } from "@/app/api/user/route";
import { login } from "@/app/lib/store/UserSlice";
import { AppDispatch } from "@/app/lib/store/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./LoginForm.css";

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Name should only contain English alphabets.")
    .required("Name is required."),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters long.")
    .matches(
      /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,}$/,
      "Password must contain at least one symbol."
    )
    .required("Password is required."),
});

interface IFormInputs {
  name: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setLoading(true);
    try {
      const response = await userSignUp(data);
      if (response) {
        toast.success("Signup Successful");
        Cookies.set("token", response.data.token);
        dispatch(login());
        router.push("/");
      } else {
        toast.error("Signup Unsuccessful");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Signup Unsuccessful");
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
    >
      <div className="form-floating mb-3">
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          id="floatingName"
          placeholder="Abhinav"
          {...register("name")}
        />
        <label htmlFor="floatingName">Name</label>
        {errors.name && (
          <div className="invalid-feedback">{errors.name.message}</div>
        )}
      </div>
      <div className="form-floating mb-3">
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          id="floatingInput"
          placeholder="name@example.com"
          {...register("email")}
        />
        <label htmlFor="floatingInput">Email address</label>
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>
      <div className="form-floating mb-3">
        <input
          type={showPassword ? "text" : "password"}
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          id="floatingPassword"
          placeholder="Password"
          {...register("password")}
        />
        <button
          className="toggle-password-button"
          type="button"
          onClick={toggleShowPassword}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        <label htmlFor="floatingPassword">Password</label>
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>
      <button
        className="w-100 btn btn-lg btn-primary"
        type="submit"
        disabled={loading}
      >
        {loading ? "Submitting..." : "SignUp"}
      </button>
      <hr className="my-4" />
      <small className="text-body-secondary">
        By clicking SignUp, you agree to the terms of use.
      </small>
    </form>
  );
};

export default SignupForm;
