import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { EyeOff, Eye, CheckCircle } from "lucide-react";
import LoginHero from "../components/LoginHero";
import useAuthStore from "../store/useAuthStore.js";

const LoginPage = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginErrorKey, setLoginErrorKey] = useState(0);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

   
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
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
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );

      setUser(res.data.data);
      console.log("res:", res.data.data);
      setLoginSuccess(true);
      setLoginError("");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setLoginError(message);
      setLoginErrorKey((prev) => prev + 1);
      console.error("Login failed", err);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <LoginHero />
      </div>

      <div
        id="main"
        className="relative z-10 flex items-center justify-center min-h-screen pt-16 py-10 sm:px-10 md:px-14"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="w-full max-w-2xl bg-linear-to-br from-[#9C7969]/30 to-[#DBAE58]/30 rounded-3xl p-6  backdrop-blur-sm"
        >
          {loginSuccess ? (
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
                Login successful!
              </h2>

              <Link to={"/mylibrary"} className="mt-4 text-sm text-white hover:text-gray-300">My Library</Link>
              <Link
                to="/"
                className="mt-6 mb-2 text-xs text-white hover:text-gray-300 font-extralight "
              >
                Return Home
              </Link>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center space-x-4 space-y-6 md:text-base leading-relaxed flex flex-col mb-4">
              <div className="flex-1 mb-8 md:mb-0 flex flex-col items-center justify-center text-[#FAF9F6]">
                <h3 id="brand-header" className="mb-4 font-bold text-4xl ">
                  Login
                </h3>
              </div>

              <div className="flex justify-center">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col justify-center gap-4 bg-white/10 p-6 rounded-xl text-left w-3/4 "
                >
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

                  {loginError && (
                    <motion.div
                      key={loginErrorKey}
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [0, 1.1, 0.95, 1.05, 1], // bouncy keyframes
                      }}
                      exit={{ scale: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        times: [0, 0.3, 0.5, 0.7, 1],
                      }}
                      className="w-3/4 mx-auto bg-red-600/60 rounded-xl px-4 py-2 flex justify-center"
                    >
                      <p className="text-white text-sm font-semibold text-center">
                        {loginError}
                      </p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-4 bg-[#C69161] text-white py-2 px-4 rounded-lg hover:bg-[#b07b4d] cursor-pointer transition"
                  >
                    Login
                  </button>

                  {/* Login Link */}
                  <p className="text-sm text-white mt-2">
                    Don't have an account yet?{" "}
                    <Link
                      to="/signup"
                      className="underline text-amber-200 hover:text-amber-300"
                    >
                      Sign Up
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

export default LoginPage;
