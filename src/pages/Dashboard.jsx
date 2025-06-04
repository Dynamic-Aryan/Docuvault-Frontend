import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import DocumentCard from "../components/DocumentCard";
import API_ENDPOINTS from "../api/endpoint";

function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const fetchDocuments = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;

      const res = await API.get(API_ENDPOINTS.dashboardDocs, { params });
      setDocuments(res.data);
    } catch (err) {
      alert("Failed to fetch documents");
    }
  };

  const deleteDocument = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;
    try {
      await API.delete(API_ENDPOINTS.deleteDocuments(id));
      fetchDocuments();
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [search, category]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-4 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
          />
          <select
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option>Government IDs</option>
            <option>Financial Docs</option>
            <option>Academic Certificates</option>
            <option>Job-related</option>
            <option>Travel Docs</option>
            <option>Others</option>
          </select>
        </div>

        {documents.length === 0 ? (
          <p>No documents found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <DocumentCard key={doc._id} doc={doc} onDelete={deleteDocument} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
