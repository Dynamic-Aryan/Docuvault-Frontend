import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { ChevronDown, ChevronRight } from "lucide-react";

function Upload() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    tags: "",
    expiryDate: "",
  });
  const [file, setFile] = useState(null);
  const [fileKey, setFileKey] = useState(Date.now());
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadTime, setUploadTime] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(null);
  const navigate = useNavigate();

  const categories = [
    "Government IDs",
    "Financial Docs",
    "Academic Certificates",
    "Job-related",
    "Travel Docs",
    "Others",
  ];

  const fetchExistingDocs = async () => {
    try {
      const res = await API.get("https://docuvault-4qyt.onrender.com/api/documents");
      setUploadedDocs(res.data);
    } catch (err) {
      console.error("Failed to fetch documents", err);
    }
  };

  useEffect(() => {
    fetchExistingDocs();
  }, []);

  useEffect(() => {
    let timer;
    if (uploading) {
      timer = setInterval(() => setUploadTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [uploading]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrorPopup("Please select a file to upload");
      setTimeout(() => setErrorPopup(null), 3000);
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("title", form.title);
    data.append("category", form.category);
    data.append("tags", form.tags);
    data.append("expiryDate", form.expiryDate);

    try {
      setUploading(true);
      setUploadTime(0);
      await API.post("https://docuvault-4qyt.onrender.com/api/documents/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchExistingDocs();
      setForm({ title: "", category: "", tags: "", expiryDate: "" });
      setFile(null);
      setFileKey(Date.now()); // reset file input
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      setErrorPopup(
        "Upload failed: " + (err.response?.data?.error || err.message)
      );
      setTimeout(() => setErrorPopup(null), 3000);
    } finally {
      setUploading(false);
    }
  };

  const toggleCategory = (cat) => {
    setExpandedCategory(expandedCategory === cat ? null : cat);
    setTimeout(() => {
      const el = document.getElementById(`category-${cat}`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 to-black text-white p-8 gap-8 relative">
      {/* Success Popup */}
      {showPopup && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg z-50">
          Document uploaded successfully.
        </div>
      )}

      {/* Error Popup */}
      {errorPopup && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-md shadow-lg z-50">
          {errorPopup}
        </div>
      )}

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
        aria-label="Upload document form"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Upload Document
        </h2>

        {uploading && (
          <p className="text-sm text-green-400 text-center mb-2">
            Uploading... Elapsed: {uploadTime} seconds
          </p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Document Title"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
            value={form.title}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="tags"
            placeholder="Tags (comma-separated)"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
            value={form.tags}
            onChange={handleChange}
          />

          <input
            type="date"
            name="expiryDate"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
            value={form.expiryDate}
            onChange={handleChange}
          />

          <input
            key={fileKey}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>

        <div className="flex gap-4 justify-center md:justify-end pt-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            disabled={uploading}
            className={`px-5 py-2 rounded-md ${
              uploading ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={uploading}
            className={`px-5 py-2 rounded-md ${
              uploading ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Upload
          </button>
        </div>

        <div className="flex gap-4 justify-center pt-6">
          <button
            type="button"
            onClick={() => navigate("/my-documents")}
            className="px-10 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition"
          >
            Your Documents
          </button>
        </div>
      </form>

      {/* Uploaded Docs List */}
      <div className="flex-1 bg-gray-800 p-6 rounded-2xl shadow-xl overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Uploaded Documents
        </h2>

        {categories.map((cat) => {
          const docs = uploadedDocs.filter((d) => d.category === cat);
          return (
            <div key={cat} id={`category-${cat}`} className="mb-4">
              <button
                onClick={() => toggleCategory(cat)}
                className="flex justify-between items-center w-full bg-gray-700 px-4 py-2 rounded-md"
              >
                <span className="font-semibold">
                  {cat} ({docs.length})
                </span>
                {expandedCategory === cat ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
              {expandedCategory === cat && (
                <div className="mt-2 space-y-2">
                  {docs.length === 0 ? (
                    <p className="text-gray-400 pl-2">No documents uploaded</p>
                  ) : (
                    docs.map((doc) => (
                      <div
                        key={doc._id}
                        className="bg-gray-600 p-3 rounded-md shadow-sm"
                      >
                        <p className="text-sm font-semibold">{doc.title}</p>
                        <p className="text-xs text-gray-300">
                          Tags: {doc.tags || "None"}
                        </p>
                        <p className="text-xs text-gray-400">
                          Expiry:{" "}
                          {doc.expiryDate
                            ? new Date(doc.expiryDate).toLocaleDateString()
                            : "None"}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Upload;
