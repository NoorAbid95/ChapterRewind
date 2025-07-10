import { useState, useEffect } from "react";
import axios from "axios";

const BookDetailModal = ({ book, isOpen, onClose, onUpdateLibrary }) => {
  const [note, setNote] = useState("");
  const [originalNote, setOriginalNote] = useState("");
  const [editing, setEditing] = useState(false);

  function toPascalCase(str) {
    return str
      .split(/[\s_-]+/)
      .map((word) => {
        if (word.length === 0) return "";
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }

  useEffect(() => {
    if (!book) return;

    const fetchNote = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/books/mylibrary/${book._id}/notes`,
          { withCredentials: true }
        );
        const fetchedNote = res.data.data || "";
        setNote(fetchedNote);
        setOriginalNote(fetchedNote);
        setEditing(false);
      } catch (error) {
        console.error("Error fetching book note:", error.message);
      }
    };

    fetchNote();
  }, [book]);

  const saveNote = async () => {
    try {
      const method = originalNote.trim() ? "patch" : "post";
      await axios[method](
        `http://localhost:3000/api/books/mylibrary/${book._id}/notes`,
        { note },
        { withCredentials: true }
      );
      alert("Note saved");
      setOriginalNote(note);
      setEditing(false);
    } catch (error) {
      console.error("Error saving note:", error.message);
      alert("Failed to save note");
    }
  };

  const deleteNote = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/books/mylibrary/${book._id}/notes`,
        { withCredentials: true }
      );
      setNote("");
      setOriginalNote("");
      setEditing(false);
      alert("Note deleted");
    } catch (error) {
      console.error("Error deleting note:", error.message);
      alert("Failed to delete note");
    }
  };

  const deleteBook = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/books/mylibrary/${book._id}`,
        { withCredentials: true }
      );

      alert("Book deleted from library");
      onUpdateLibrary();
      onClose();
    } catch (error) {
      console.error("Error deleting book:", error.message);
      alert("Failed to delete book");
    }
  };

  if (!isOpen || !book) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/70 z-50 flex justify-center items-center ${
        isOpen ? "hover:cursor-pointer" : "hover:cursor-alias"
      }`}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-2xl h-[90vh] overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div id="custom-scroll" className="p-6 overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xl font-bold text-gray-600 hover:text-black cursor-pointer"
          >
            &times;
          </button>

          {/* Book Details */}
          <div className="text-center flex flex-col justify-center items-center hover:cursor-default">
            <h2 className="text-2xl font-bold">{toPascalCase(book.title)}</h2>
            <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-40 my-4 rounded"
            />
            <p className="mt-4 text-gray-800">{book.summary}</p>
          </div>

          {/* Notes Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              {note?.trim() ? "Your Notes" : "Add notes for this book?"}
            </h3>

            {!editing ? (
              <div
                className={`text-gray-800 whitespace-pre-wrap p-3 rounded relative text-center ${
                  note?.trim() ? "bg-gray-100" : "bg-transparent"
                }`}
              >
                {note?.trim() ? note : ""}
                <div className="mt-2">
                  <button
                    onClick={() => setEditing(true)}
                    className="cursor-pointer hover:scale-104 active:scale-97"
                  >
                    {note?.trim() ? "✍️" : "➕"}
                  </button>
                </div>
                <button
                  onClick={deleteBook}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove Book from Library
                </button>
              </div>
            ) : (
              <>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={5}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={saveNote}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                  >
                    Save Note
                  </button>
                  <button
                    onClick={() => {
                      setNote(originalNote);
                      setEditing(false);
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 cursor-pointer"
                  >
                    Cancel
                  </button>
                  {originalNote && (
                    <button
                      onClick={deleteNote}
                      className="ml-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete Note
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
