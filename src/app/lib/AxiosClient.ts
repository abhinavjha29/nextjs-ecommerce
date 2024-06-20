import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { errorMessage } from "@/utils/constants";
const axiosClient = axios.create({
  // baseURL: "https://next-js-ecommerce-backend.vercel.app/",
  baseURL: "http://localhost:3004",
  timeout: 50000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    console.error(error);
    throw new Error();
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          toast.error(errorMessage[400]);
          break;
        case 401:
          toast.error(errorMessage[401]);

          break;
        case 403:
          toast.error(errorMessage[403]);
          break;
        case 404:
          toast.error(errorMessage[404]);
          break;
        case 500:
          toast.error(errorMessage[500]);
          break;
        default:
          toast.error(data.message || "An error occurred, please try again.");
          break;
      }
    } else if (error.request) {
      toast.error(errorMessage.noResponse);
    } else {
      toast.error(errorMessage.generalError);
    }

    console.error("API Error:", error);

    return Promise.reject(error);
  }
);

export default axiosClient;
