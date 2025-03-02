import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthContext/AuthProvider";


const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { email, password } = data;
    signInUser(email, password)
      .then(() => {
        reset();
        navigate("/");
        console.log("login success")
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: error.message,
        });
        reset();
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        navigate("/");
        console.log("login success")
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: error.message,
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-sm p-10">
        {/* Logo and Welcome Message */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-[#566A7F]">
            Welcome To LinkShare
          </h3>
          <p className="py-2 text-[#566A7F]">Log In to Continue</p>
        </div>

        {/* Login Form  */}
        <form className="mt-4"  onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8AA4] focus:outline-none"
              placeholder="Enter your email" 
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">
              Password
            </label>
            <input
              type="password" 
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message:
                    "Password must include uppercase, lowercase, and a number",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8AA4] focus:outline-none"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 cursor-pointer text-white bg-[#2A8AA4] rounded-lg hover:bg-white hover:text-[#2A8AA4] border border-[#2A8AA4] text-lg font-semibold transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="px-4 text-gray-500 font-semibold">OR</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-gray-300 rounded-lg shadow-md text-gray-700 hover:bg-gray-100 transition-all duration-300"
        >
          <FcGoogle size={24} />
          <span className="font-semibold cursor-pointer">
            Continue with Google
          </span>
        </button>
        <p className="text-center px-4 text-gray-500">
          Are You New?{" "}
          <Link className="text-black" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
