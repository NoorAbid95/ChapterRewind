import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import SignupHero from "../components/SignupHero";
import { EyeOff, Eye, CheckCircle } from "lucide-react";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/auth/signup", formData, {
        withCredentials: true,
      });
      setSignupSuccess(true);
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <SignupHero />
      </div>

      <div
        id="main"
        className="relative z-10 flex items-center justify-center min-h-screen pt-16 py-10 sm:px-10 md:px-14"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="w-full max-w-3xl bg-linear-to-br from-[#E1E5E2]/30 to-[#485F2A]/30 rounded-3xl p-8 backdrop-blur-sm"
        >
          {signupSuccess ? (
            <div className="text-center text-black h-full flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-green-600 mb-6"
              >
                <CheckCircle size={48} />
              </motion.div>
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Signup successful!
              </h2>
              <Link
                to="/"
                className="mt-4 text-sm text-white hover:text-gray-300 "
              >
                Return Home
              </Link>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center space-x-4 space-y-6 md:text-base leading-relaxed flex flex-col md:flex-row reverse">
              <div className="flex-1 mb-8 md:mb-0 flex flex-col items-center justify-center text-[#FAF9F6]">
                <h3 id="brand-header" className="mb-4 font-bold text-4xl ">
                  Signup!
                </h3>
                <p className="text-lg  leading-8.5">
                  Save your book recaps and write your own personal notes to
                  highlight key moments or your favourite quotes.
                </p>
              </div>

              <div className="flex-1">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 bg-white/10 p-6 rounded-xl text-left"
                >
                  {/* Full Name */}
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-white">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`px-4 py-2 rounded-md bg-white/80 text-black focus:outline-none ${
                        errors.fullName
                          ? "border-red-500 ring-red-300 ring-2"
                          : "focus:ring-2 focus:ring-amber-300"
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-sm text-red-500 mt-1">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`px-4 py-2 rounded-md bg-white/80 text-black focus:outline-none ${
                        errors.email
                          ? "border-red-500 ring-red-300 ring-2"
                          : "focus:ring-2 focus:ring-amber-300"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-sm text-red-500 mt-1">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pr-10 px-4 py-2 rounded-md bg-white/80 text-black focus:outline-none  ${
                          errors.password
                            ? "border-red-500 ring-red-300 ring-2"
                            : "focus:ring-2 focus:ring-amber-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex items-center px-3"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                      {errors.password && (
                        <span className="text-sm text-red-500 mt-1">
                          {errors.password}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-4 bg-[#C69161] text-white py-2 px-4 rounded-lg hover:bg-[#b07b4d] cursor-pointer transition"
                  >
                    Sign Up
                  </button>

                  {/* Login Link */}
                  <p className="text-sm text-white mt-2">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="underline text-amber-200 hover:text-amber-300"
                    >
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
