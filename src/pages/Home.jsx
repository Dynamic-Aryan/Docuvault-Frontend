import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const storedName = localStorage.getItem("name");
      setUserName(storedName || "User");
    } else {
      setUserName(null);
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setUserName(null);
    navigate("/login");
  };

  if (!token) {
    return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-6 animate-fadeIn">
  <header className="w-full max-w-4xl mx-auto text-center py-16">
    <h1 className="text-3xl md:text-6xl font-extrabold mb-6 tracking-tighter">
      Welcome to <span className="text-indigo-400">Docuvault</span>
    </h1>
    <p className="text-md md:text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
      Your digital sanctuary for secure document storage. Upload, manage,
      and access your files anytime, anywhere—with peace of mind.
    </p>
    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      <button
        onClick={() => navigate("/signup")}
        className="py-2 md:px-8 md:py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl font-semibold text-white shadow-lg hover:from-indigo-600 hover:to-purple-700 transition duration-300 flex items-center justify-center gap-3"
        aria-label="Get Started"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Get Started
      </button>
      <button
        onClick={() => navigate("/login")}
        className="py-2 md:px-8 md:py-4 border border-indigo-600 rounded-2xl font-semibold hover:bg-indigo-700 hover:text-white transition duration-300 flex items-center justify-center gap-3"
        aria-label="Login"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H3m12 0l-4-4m4 4l-4 4" />
        </svg>
        Login
      </button>
    </div>
  </header>

  <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4 md:px-8 px-2">
    {[
      {
        title: "All Formats Welcome",
        desc: "Upload PDFs, DOCs, Images, ZIPs—you name it. Docuvault doesn’t discriminate.",
      },
      {
        title: "Military-grade Security",
        desc: "We use encryption standards that even your secrets approve of.",
      },
      {
        title: "Access Anywhere",
        desc: "Log in from any device and access your docs seamlessly—cloud freedom at its best.",
      },
      {
        title: "Organized Like a Pro",
        desc: "Your files, neatly categorized and easy to retrieve. Chaos is not welcome.",
      },
    ].map(({ title, desc }, i) => (
      <div
        key={i}
        className="bg-gradient-to-tr from-gray-800 to-gray-700 p-8 rounded-3xl shadow-xl border border-gray-600"
      >
        <h2 className="text-lg md:text-2xl font-bold mb-3 text-indigo-400">{title}</h2>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
      </div>
    ))}
  </section>

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

  // Authenticated user view
  return (
   <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-6 animate-fadeIn">
  <header className="w-full max-w-4xl mx-auto text-center py-16">
    <h1 className="text-3xl md:text-5xl font-extrabold mb-2 tracking-wide text-indigo-400 drop-shadow-lg">
      Hey, Welcome Back!
    </h1>
    <p className="text-gray-300 mb-8 text-sm md:text-lg italic">
      We're glad to see you again. Ready to manage your documents?
    </p>
    <button
      onClick={logout}
      className="mt-6 px-10 py-4 bg-gray-800 rounded-3xl font-semibold hover:bg-gray-700 shadow-lg transition duration-300 flex items-center justify-center gap-3"
      aria-label="Logout"
    >
      <svg
        className="w-6 h-6 text-indigo-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
      </svg>
      Logout
    </button>
  </header>

  <section className="w-full max-w-md flex flex-col gap-8 mt-8">
    <button
      onClick={() => navigate("/upload")}
      className="px-8 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl font-semibold hover:from-indigo-600 hover:to-purple-700 shadow-lg transition duration-300 flex items-center justify-center gap-3"
      aria-label="Upload New Documents"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0 0l-3-3m3 3l3-3M8 12l4-4 4 4" />
      </svg>
      Upload New Documents
    </button>

    <button
      onClick={() => navigate("/my-documents")}
      className="px-8 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl font-semibold hover:from-indigo-600 hover:to-purple-700 shadow-lg transition duration-300 flex items-center justify-center gap-3"
      aria-label="View Your Uploaded Documents"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16h8M8 12h8m-6 8v-4a4 4 0 014-4h4" />
      </svg>
      View Your Uploaded Documents
    </button>

    <div className="px-8 py-5 bg-gray-700 rounded-3xl font-semibold text-center text-gray-400 select-none shadow-inner">
      Feature Coming Soon 🚀
    </div>
  </section>

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
