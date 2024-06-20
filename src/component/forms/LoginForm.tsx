"use client";
import { userLogin } from "@/app/api/user/route";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store/store";
import { login, setIsAdmin } from "@/app/lib/store/UserSlice";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./LoginForm.css";
import { useMutation } from "react-query";
import { Routes } from "@/utils/Routes";
import { PROFILE } from "@/utils/constants";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters long.")
    .required("Password is required."),
});

interface IFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const { mutate, isLoading } = useMutation(userLogin, {
    onSuccess: (data) => {
      console.log("login data is=>", data);
      Cookies.set("token", data.token);
      console.log(data.user);
      if (data.user.phoneNumber) {
        localStorage.setItem(PROFILE, "true");
        Cookies.set(PROFILE, "true");
      }
      if (data.user.isAdmin) {
        Cookies.set("isAdmin", "true");

        dispatch(login());
        dispatch(setIsAdmin());
        toast.success("Welcome Admin");
      } else {
        dispatch(login());
        toast.success("Succesful login");
      }
      router.replace(Routes.Product);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Inavlid Credentials");
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    mutate(data);
    // setLoading(true);

    // try {
    //   const response = await userLogin(data);
    //   if (response) {
    //     Cookies.set("token", response.data.token, { expires: 7 });
    //     if (response.data.user.isAdmin) {
    //       Cookies.set("isAdmin", "true", { expires: 7 });
    //       dispatch(login());
    //       dispatch(setIsAdmin());
    //       toast.success("Login successful! Welcome Admin");
    //       router.push("/product");
    //     } else {
    //       dispatch(login());
    //       toast.success("Login successful!");
    //       router.push("/product");
    //     }
    //   } else {
    //     toast.error(
    //       "Login failed. Please check your credentials and try again."
    //     );
    //   }
    // } catch (error) {
    //   console.error("Error logging in:", error);
    //   toast.error("Login failed. Please check your credentials and try again.");
    // } finally {
    //   setLoading(false);
    // }
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
      <div className="form-floating mb-3 password-input-container">
        <input
          type={showPassword ? "text" : "password"}
          className={`form-control password-input ${
            errors.password ? "is-invalid" : ""
          }`}
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
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Login"}
      </button>
      <hr className="my-4" />
      <Link href={Routes.signup}>
        <small className="text-body-secondary">New User, Click Here</small>
      </Link>
    </form>
  );
};

export default LoginForm;
