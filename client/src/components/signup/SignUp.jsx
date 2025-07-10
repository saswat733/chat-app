import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Form validation schema
const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  gender: yup.string().required("Gender is required"),
});

const SignUp = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", data);
      const userData = response.data.data;

      localStorage.setItem("chat-user", JSON.stringify(userData));
      setAuthUser(userData);

      toast.success("Registration successful!");
      navigate("/chats")
      reset();
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Illustration and text */}
          <motion.div
            className="hidden lg:block"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-100 rounded-full opacity-20 mix-blend-multiply filter blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-purple-100 rounded-full opacity-20 mix-blend-multiply filter blur-xl"></div>

              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <img
                  src="https://assets-global.website-files.com/5f4ec532319820f7c2ccd7a3/62e3e8a5b7b6b8a1b5e3c3b4_undraw_secure_login_pdn4.svg"
                  alt="Secure login illustration"
                  className="w-full max-w-md mx-auto"
                />
              </motion.div>

              <motion.div
                className="mt-8 text-center lg:text-left"
                variants={itemVariants}
              >
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  Join <span className="text-indigo-600">ChatiFy</span> Today
                </h1>
                <p className="text-lg text-gray-600">
                  Connect with friends, family, and colleagues in a secure,
                  private environment.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div variants={cardVariants} className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-100 rounded-full opacity-20 mix-blend-multiply filter blur-xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-100 rounded-full opacity-20 mix-blend-multiply filter blur-xl"></div>

            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative z-10"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-8">
                <div className="text-center mb-8">
                  <motion.h2
                    className="text-3xl font-bold text-gray-800 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Create Account
                  </motion.h2>
                  <p className="text-gray-600">Join our community today</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                    variants={containerVariants}
                  >
                    {/* Full Name */}
                    <motion.div className="form-group" variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        {...register("fullName")}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.fullName ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition`}
                        placeholder="John Doe"
                      />
                      {errors.fullName && (
                        <motion.p
                          className="text-red-500 text-xs mt-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {errors.fullName.message}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Username */}
                    <motion.div className="form-group" variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        {...register("username")}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.username ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition`}
                        placeholder="johndoe123"
                      />
                      {errors.username && (
                        <motion.p className="text-red-500 text-xs mt-1">
                          {errors.username.message}
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Email */}
                  <motion.div className="mb-6" variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <motion.p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                    variants={containerVariants}
                  >
                    {/* Password */}
                    <motion.div className="form-group" variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        {...register("password")}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition`}
                        placeholder="••••••••"
                      />
                      {errors.password && (
                        <motion.p className="text-red-500 text-xs mt-1">
                          {errors.password.message}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Confirm Password */}
                    <motion.div className="form-group" variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        {...register("confirmPassword")}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition`}
                        placeholder="••••••••"
                      />
                      {errors.confirmPassword && (
                        <motion.p className="text-red-500 text-xs mt-1">
                          {errors.confirmPassword.message}
                        </motion.p>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Gender */}
                  <motion.div className="mb-8" variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Gender
                    </label>
                    <div className="flex space-x-6">
                      {["male", "female"].map((gender) => (
                        <motion.div
                          key={gender}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center"
                        >
                          <input
                            type="radio"
                            id={gender}
                            value={gender}
                            {...register("gender")}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          />
                          <label
                            htmlFor={gender}
                            className="ml-2 block text-sm text-gray-700 capitalize"
                          >
                            {gender}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                    {errors.gender && (
                      <motion.p className="text-red-500 text-xs mt-1">
                        {errors.gender.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </motion.div>
                </form>

                <motion.div
                  className="mt-6 text-center"
                  variants={itemVariants}
                >
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline transition"
                    >
                      Log in
                    </Link>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
