import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import API_ENDPOINTS from "../api/endpoint";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [notification, setNotification] = useState(null); // State for notification
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(API_ENDPOINTS.loginUser, form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setNotification("Login failed. Please check your credentials.");
      setTimeout(() => {
        setNotification(null);
      }, 3000); // Clear notification after 3 seconds
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white animate-fadeIn">
      {notification && (
        <div className="absolute top-0 mt-5 w-full flex justify-center">
          <div className="bg-red-500 py-2 px-4 rounded-md text-white">
            {notification}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-md"
        aria-label="Login form"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center tracking-tight">
          Welcome Back to Vault
        </h2>

        {/* Email Input */}
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="w-full mb-5 px-5 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          onChange={handleChange}
          required
        />

        {/* Password Input with Toggle */}
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className="relative w-full mb-8">
          <input
            id="password"
            name="password"
            type={showPassword ? "password" : "text"}
            placeholder="Password"
            className="w-full px-5 py-3 pr-12 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              // Eye with slash (hide)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.675-6.825m2.978 1.952A7.957 7.957 0 0012 5c4.418 0 8 3.582 8 8a7.97 7.97 0 01-.958 3.958m-1.694 1.548L4.222 4.222" />
              </svg>
            ) : (
              // Eye (show)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl py-3 font-semibold text-white shadow-lg hover:from-indigo-600 hover:to-purple-700 transition duration-300 flex justify-center items-center gap-3"
          aria-label="Login"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H3m12 0l-4-4m4 4l-4 4"
            />
          </svg>
          Login
        </button>

        {/* Sign Up Redirect */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-white underline hover:text-gray-300 transition"
          >
            Signup
          </Link>
        </p>
      </form>

      {/* Fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default Login;
