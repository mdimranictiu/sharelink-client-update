import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthContext/AuthProvider";
const Register = () => {
  const { createuser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
document.title="Register"
  const onSubmit = (data) => {
    const { email, name, password, photoURL } = data;
    createuser(email, password)
      .then((res) => {
        updateProfile(res.user, { displayName: name, photoURL })
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Hi, ${res.user.displayName}`,
              text: "Registration Created Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            reset();
            navigate("/");
            console.log("login success")
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        Swal.fire({ icon: "error", title: "Error", text: error.message });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => navigate("/"))
      .catch((error) => {
        Swal.fire({ icon: "error", title: "Error", text: error.message });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-sm p-6">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-[#566A7F]">Create a new account</h3>
          <p className="py-2 text-[#566A7F]">Register to Continue</p>
        </div>

        <form className="mt-4"          onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8AA4] focus:outline-none"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8AA4] focus:outline-none"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">Your Photo URL</label>
            <input
              type="text"
              {...register("photoURL")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8AA4] focus:outline-none"
              placeholder="Photo URL"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A8AA4] focus:outline-none"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 cursor-pointer text-white bg-[#2A8AA4] rounded-lg hover:bg-white hover:text-[#2A8AA4] border border-[#0C65E3] text-lg font-semibold transition-all duration-300"
          >
            Register
          </button>
        </form>

        <div className="flex items-center my-5">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="px-4 text-gray-500 font-semibold">OR</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-gray-300 rounded-lg shadow-md text-gray-700 hover:bg-gray-100 transition-all duration-300"
        >
          <FcGoogle size={24} />
          <span className="font-semibold cursor-pointer">Continue with Google</span>
        </button>
        <p className="text-center px-4 text-gray-500">Already Have An Account? <Link className="text-black" to='/login'>Login</Link></p>
      </div>
    </div>
  );
};

export default Register;