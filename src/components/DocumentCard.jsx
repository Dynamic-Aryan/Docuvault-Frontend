import { useState } from "react";

const DocumentCard = ({ doc, onDelete }) => {
  const [confirming, setConfirming] = useState(false);

  const handleDeleteClick = () => {
    setConfirming(true);
  };

  const handleConfirmDelete = () => {
    onDelete(doc._id);
    setConfirming(false);
  };

  const handleCancel = () => {
    setConfirming(false);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-700 hover:shadow-xl transition duration-300">
      <h2 className="font-semibold text-xl mb-1 text-white">{doc.title}</h2>
      <p className="text-sm text-gray-400">{doc.category}</p>

      <div className="text-xs text-gray-500 mt-2">
        Tags: {doc.tags.length > 0 ? doc.tags.join(", ") : "None"}
      </div>

      {doc.expiryDate && (
        <p className="text-xs text-red-400 mt-1">
          Expires on: {new Date(doc.expiryDate).toLocaleDateString()}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-3 items-center">
        <a
          href={doc.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition"
        >
          View
        </a>

        {!confirming ? (
          <button
            onClick={handleDeleteClick}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition"
          >
            Delete
          </button>
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-300">Are you sure?</span>
            <button
              onClick={handleConfirmDelete}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded"
            >
              Yes
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded"
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;
