"use client";
import React, { useState, useEffect } from "react";
import BASE_URL from "../../utils/api";

interface NotesDTO {
  ownerEmail: string;
  notes: string;
}

interface RequestData {
  email: string;
}

const MyNotesPage: React.FC = () => {
  const [notesList, setNotesList] = useState<NotesDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newNote, setNewNote] = useState("");

  const ownerEmail = localStorage.getItem("userEmail") || "";

  const fetchMyNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/projects/getMyNotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: ownerEmail } as RequestData),
      });
      if (!response.ok) throw new Error("Failed to fetch notes.");

      const data: NotesDTO[] = await response.json();
      setNotesList(data);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const response = await fetch(`${BASE_URL}/api/projects/saveNotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerEmail,
          notes: newNote,
        }),
      });

      if (!response.ok) throw new Error("Failed to create note.");

      setNewNote("");
      setShowForm(false);
      await fetchMyNotes(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    }
  };

  useEffect(() => {
    fetchMyNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Notes</h1>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-600">Loading notes...</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {notesList.length > 0 ? (
            notesList.map((note, index) => (
              <div
                key={index}
                className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm"
              >
                <p className="text-gray-800 leading-relaxed mb-3">
                  {note.notes}
                </p>
                <div className="text-sm text-gray-500">
                  Owner: {note.ownerEmail}
                </div>
              </div>
            ))
          ) : (
            !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500">No notes found.</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Floating Create Note Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Create new note"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {/* Note Creation Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Create Note</h2>
            <form onSubmit={handleCreateNote} className="space-y-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Write your note..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                rows={4}
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNotesPage;
