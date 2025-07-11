import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // Auto-refresh authentication state on token change
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    // Check auth every second (helps in same-tab updates)
    const interval = setInterval(checkAuth, 1000);

    // Sync across tabs
    const onStorageChange = () => checkAuth();
    window.addEventListener("storage", onStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">DocuVault</Link>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Links (Desktop) */}
        <div className="hidden lg:flex gap-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/my-documents" className="hover:underline">
            My Documents
          </Link>
          <Link to="/upload" className="hover:underline">
            Upload
          </Link>
          {!isAuthenticated && (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-4 flex flex-col gap-4 px-2">
          <Link to="/" className="hover:underline" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/my-documents" className="hover:underline" onClick={() => setIsOpen(false)}>
            My Documents
          </Link>
          <Link to="/upload" className="hover:underline" onClick={() => setIsOpen(false)}>
            Upload
          </Link>
          {!isAuthenticated && (
            <Link to="/login" className="hover:underline" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
