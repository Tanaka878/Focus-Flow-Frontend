"use client";
import React, { useState, useEffect } from "react";
import BASE_URL from "../../utils/api";
import NotesDTO from "@/app/Interfaces/NotesDTO";
import RequestData from "@/app/Interfaces/RequestData";

const MyNotesPage: React.FC = () => {
  const [notesList, setNotesList] = useState<NotesDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingNote, setEditingNote] = useState<NotesDTO | null>(null);

  const [newNote, setNewNote] = useState("");

  const [ownerEmail, setOwnerEmail] = useState("");

  //making sure that it run only on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOwnerEmail(localStorage.getItem("userEmail") || "");
    }
  }, []);

  // Fetch notes from backend
  const fetchMyNotes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/notes/getMyNotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  // Create new note
  const handleCreateNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const response = await fetch(`${BASE_URL}/api/notes/saveNotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerEmail, notes: newNote }),
      });

      if (!response.ok) throw new Error("Failed to create note.");

      setNewNote("");
      setShowCreateModal(false);
      await fetchMyNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    }
  };

  // Update existing note
  const handleUpdateNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingNote) return;

    try {
      const response = await fetch(`${BASE_URL}/api/notes/updateNote`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingNote,
          notes: newNote,
        }),
      });

      if (!response.ok) throw new Error("Failed to update note.");

      setShowEditModal(false);
      setEditingNote(null);
      setNewNote("");
      await fetchMyNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    }
  };

  // Delete note
  const handleDeleteNote = async (note: NotesDTO) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      const response = await fetch(`${BASE_URL}/api/notes/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });

      if (!response.ok) throw new Error("Failed to delete note.");

      await fetchMyNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    }
  };

  // Open edit modal
  const openEditModal = (note: NotesDTO) => {
    setEditingNote(note);
    setNewNote(note.notes);
    setShowEditModal(true);
  };

  useEffect(() => {
    fetchMyNotes();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
                <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow"
                >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
                </button>
              <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">My Notes</h1>
              <p className="text-slate-600 mt-1">Organize your thoughts and ideas</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Note
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>
              <p className="text-slate-600 font-medium">Loading your notes...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        {notesList.length > 0 ? (
          <div className="grid gap-4">
            {notesList.map((note) => (
              <div
                key={note.id}
                className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => openEditModal(note)}
                  >
                    <p className="text-slate-800 leading-relaxed text-base whitespace-pre-wrap">
                      {note.notes}
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                        ID: {note.id}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteNote(note)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    aria-label="Delete note"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 text-slate-300">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No notes yet</h3>
              <p className="text-slate-500 mb-6">Get started by creating your first note</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Note
              </button>
            </div>
          )
        )}
      </div>

      {/* Create Note Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-semibold text-slate-900">Create New Note</h2>
              <p className="text-slate-600 text-sm mt-1">Write down your thoughts and ideas</p>
            </div>
            <form onSubmit={handleCreateNote} className="p-6 space-y-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Start writing your note..."
                className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none text-base"
                rows={6}
                autoFocus
              />
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 text-slate-600 hover:text-slate-800 hover:bg-slate-50 font-medium rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Note Modal */}
      {showEditModal && editingNote && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-semibold text-slate-900">Edit Note</h2>
              <p className="text-slate-600 text-sm mt-1">Make changes to your note</p>
            </div>
            <form onSubmit={handleUpdateNote} className="p-6 space-y-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Edit your note..."
                className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none text-base"
                rows={6}
                autoFocus
              />
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingNote(null);
                    setNewNote("");
                  }}
                  className="px-4 py-2.5 text-slate-600 hover:text-slate-800 hover:bg-slate-50 font-medium rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Update Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* <div className="fixed bottom-0 left-0 w-full z-40">
        <Navbar onSelectPage={function (): void { }} />
      </div> */}
     
    </div>
  );
};


export default MyNotesPage;