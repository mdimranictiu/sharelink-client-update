import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthProvider";

const axiosSecure = axios.create({
  baseURL: 'https://task-flow-server-two.vercel.app/',
});

const UseAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  // Request interceptor to add authorization header for every secure call to the API
  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  // Intercepts 401 and 403 status codes
  axiosSecure.interceptors.response.use(function (response) {
    return response;
  }, async (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      try {
        await logOut();
        navigate('/');
      } catch (err) {
        console.error("Logout failed:", err);
        // Optionally, display an error message to the user
      }
    }
    return Promise.reject(error);
  });

  return axiosSecure;
};

export default UseAxiosSecure;
