import axiosClient from "@/app/lib/AxiosClient";
import { UserDetail } from "@/types";
import axios from "axios";
import { error } from "console";
import Cookies from "js-cookie";

// export const userLogin = async (userData: UserDetail) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:3004/user/login",
//       userData
//     );
//     if (response.status === 200) {
//       return response;
//     } else {
//       throw new Error();
//     }
//   } catch (error: any) {
//     console.log("error is", error);
//     // alert(error.response?.data.message);
//   }
// };

export const userLogin = async (userData: UserDetail) => {
  if (!userData) {
    throw new Error("User data is undefined");
  }

  try {
    const response = await axiosClient.post("/user/login", userData);
    if (response.status === 200) {
      return response.data; // return the data instead of the entire response
    } else {
      throw new Error(response.data.message || "Login failed"); // use the response message if available
    }
  } catch (error: any) {
    console.error("Error in userLogin:", error);
    throw new Error(error.response?.data?.message || "Login request failed");
  }
};
export const userSignUp = async (userData: UserDetail) => {
  try {
    const response = await axiosClient.post("/user/signup", userData);
    if (response) {
      return response;
    }
  } catch (error: any) {
    console.log(error);
  }
};

export const updateProfile = async (userData: any) => {
  try {
    const response = await axiosClient.patch("/user/updateprofile", userData);
    if (response) {
      return response;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const updateContact = async (userContact: any) => {
  try {
    const response = await axiosClient.patch(
      "/user/contactupdate",
      userContact
    );
    if (response) {
      return response;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};
