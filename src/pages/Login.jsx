import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("https://docuvault-4qyt.onrender.com/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white animate-fadeIn">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-md"
        aria-label="Login form"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center tracking-tight">
          Welcome Back to Vault
        </h2>

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

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-8 px-5 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          onChange={handleChange}
          required
        />

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
