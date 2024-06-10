import { UserDetail } from "@/types";
import axios from "axios";
import Cookies from "js-cookie";

export const userLogin = async (userData: UserDetail) => {
  try {
    const response = await axios.post(
      "http://localhost:3004/user/login",
      userData
    );
    if (response.status === 200) {
      return response;
    } else {
      throw new Error();
    }
  } catch (error: any) {
    console.log("error is", error);
    // alert(error.response?.data.message);
  }
};

export const userSignUp = async (userData: UserDetail) => {
  try {
    const response = await axios.post(
      "http://localhost:3004/user/signup",
      userData
    );
    if (response) {
      return response;
    }
  } catch (error: any) {
    console.log(error);
    // alert(error.response.data.message);
  }
};
