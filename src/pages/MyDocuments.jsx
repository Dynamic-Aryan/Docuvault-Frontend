import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import API from "../api/api";
import DocumentCard from "../components/DocumentCard";
import { useNavigate } from "react-router-dom";

export default function MyDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const fetchDocs = async () => {
    try {
      const res = await API.get("https://docuvault-4qyt.onrender.com/api/documents");
      setDocuments(res.data);
    } catch (error) {
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`https://docuvault-4qyt.onrender.com/api/documents/${id}`);
      setDocuments((docs) => docs.filter((doc) => doc._id !== id));
      setSuccessMessage("Document deleted successfully.");
    } catch (error) {
      setSuccessMessage("Failed to delete the document.");
    }
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const filteredDocuments = documents.filter((doc) => {
    const query = searchQuery.toLowerCase();
    return (
      doc.title?.toLowerCase().includes(query) ||
      doc.category?.toLowerCase().includes(query) ||
      doc.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <span className="text-lg animate-pulse">Loading documents...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-12 flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
        Your Uploaded Documents
      </h1>

      <button
        type="button"
        aria-label="Navigate to upload"
        className="mb-6 px-6 py-3 rounded-xl bg-gray-600 hover:bg-gray-700 transition font-semibold"
        onClick={() => navigate("/upload")}
      >
        Upload Documents
      </button>

      {/* Search Input */}
      <div className="relative w-full max-w-xl mb-6">
        <Search
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
          size={20}
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder="Search by title, category, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          aria-label="Search documents"
        />
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 text-green-400 font-medium">
          {successMessage}
        </div>
      )}

      {/* Document Grid */}
      {filteredDocuments.length === 0 ? (
        <p className="text-gray-400 text-lg animate-pulse">
          No documents match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {filteredDocuments.map((doc) => (
            <DocumentCard key={doc._id} doc={doc} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
