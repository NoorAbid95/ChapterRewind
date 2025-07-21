import { useState, useEffect } from "react";
import axios from "../../utils/axios.js";
import { toast } from "react-toastify";
import editIcon from "../../assets/edit_icon.svg";

const BookDetailModal = ({ book, isOpen, onClose, onUpdateLibrary }) => {
  const [note, setNote] = useState("");
  const [originalNote, setOriginalNote] = useState("");
  const [editing, setEditing] = useState(false);
  const [confirmDeleteNote, setConfirmDeleteNote] = useState(false);
  const [confirmDeleteBook, setConfirmDeleteBook] = useState(false);

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
          `/books/mylibrary/${book._id}/notes`,
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
        `/books/mylibrary/${book._id}/notes`,
        { note },
        { withCredentials: true }
      );
      toast.success("Note Saved");
      setOriginalNote(note);
      setEditing(false);
    } catch (error) {
      console.error("Error saving note:", error.message);
      toast.error("Failed to Save Note");
    }
  };

  const deleteNote = async () => {
    try {
      await axios.delete(
        `/books/mylibrary/${book._id}/notes`,
        { withCredentials: true }
      );
      setNote("");
      setOriginalNote("");
      setEditing(false);
      toast.success("Note Deleted");
    } catch (error) {
      console.error("Error deleting note:", error.message);
      toast.error("Failed to Delete Note");
    }
  };

  const deleteBook = async () => {
    try {
      await axios.delete(
        `/books/mylibrary/${book._id}`,
        { withCredentials: true }
      );

      toast.success("Book deleted from library");
      onUpdateLibrary();
      onClose();
    } catch (error) {
      console.error("Error deleting book:", error.message);
      toast.error("Failed to delete book");
    }
  };

  if (!isOpen || !book) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/70 z-50 flex justify-center items-center
      }`}
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-t from-gray-800/80 to-black/90 rounded-xl w-full max-w-3xl h-[90vh] overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div id="custom-scroll" className="p-6 overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xl font-bold text-gray-100 hover:text-gray-300 cursor-pointer"
          >
            &times;
          </button>
          {/* Book Details */}
          <div className="text-center flex flex-col justify-center items-center hover:cursor-default">
            <h2 className="text-2xl text-white font-bold">
              {toPascalCase(book.title)}
            </h2>
            <p className="text-sm text-gray-300 mb-2">by {book.author}</p>
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-40 my-4 rounded shadow shadow-black"
            />
            <p className="mt-4 text-white">{book.summary}</p>
          </div>
          {/* Notes Section */}
          <div className=" flex flex-col justify-center items-center mt-8">
            {!editing ? (
              <div
                className={`text-gray-800 whitespace-pre-wrap p-3 rounded-xl relative text-center ${
                  note?.trim()
                    ? "bg-linear-to-b from-white/70 to-gray-400/90 w-3/4"
                    : "bg-transparent"
                }`}
              >
                <h3 className=" font-semibold ">
                  {note?.trim() ? (
                    <>
                      <button
                        className="cursor-pointer hover:scale-103"
                        onClick={() => setEditing(true)}
                      >
                        {" "}
                        My Notes
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="cursor-pointer text-gray-200 hover:scale-102"
                        onClick={() => setEditing(true)}
                      >
                        {" "}
                        Add Book Notes
                      </button>
                    </>
                  )}
                </h3>
                <div className="p-4 mx-4 text-sm">
                  {note?.trim() ? note : ""}
                </div>
                {note?.trim() && (
                  <button className="cursor-pointer  hover:scale-107">
                    <img
                      src={editIcon}
                      alt="Edit Icon"
                      onClick={() => setEditing(true)}
                      style={{ height: "25px", width: "28px" }}
                    />
                  </button>
                )}
              </div>
            ) : (
              <>
                <textarea
                  className="w-full p-2  border-gray-100/50 border-2 rounded-xl focus:outline-none focus:border-gray-100/80 text-white"
                  rows={5}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />

                <div className="flex gap-2 mt-2 px-4">
                  <button
                    onClick={saveNote}
                    className="px-3 py-1 bg-green-800/80 text-white rounded-full hover:bg-green-800/90 cursor-pointer text-sm hover:font-semibold "
                  >
                    Save Note
                  </button>
                  <button
                    onClick={() => {
                      setNote(originalNote);
                      setEditing(false);
                    }}
                    className="px-4 py-1 bg-black/70 text-white rounded-full hover:bg-black/80 cursor-pointer text-sm hover:font-semibold"
                  >
                    Cancel
                  </button>
                  {/* {Delete Note Section} */}
                  {originalNote && !confirmDeleteNote && (
                    <button
                      onClick={() => setConfirmDeleteNote(true)}
                      className="px-4 py-1 bg-red-800/70 text-white rounded-full hover:bg-red-800/80 cursor-pointer text-sm hover:font-semibold"
                    >
                      Delete Note
                    </button>
                  )}
                  {confirmDeleteNote && (
                    <div className="flex gap-2 ml-auto">
                      <p>Are you sure you want to delete this note?</p>
                      <button
                        onClick={() => {
                          deleteNote();
                          setConfirmDeleteNote(false);
                        }}
                        className="px-3 py-1 bg-red-700 text-white rounded-full hover:bg-red-800 text-sm cursor-pointer"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDeleteNote(false)}
                        className="px-3 py-1 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 text-sm cursor-pointer"
                      >
                        Keep Note
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {/* {Delete Book Section} */}
          <div className="flex justify-center items-center mt-8">
            {!confirmDeleteBook ? (
              <button
                onClick={() => setConfirmDeleteBook(true)}
                className="px-1 py-1 mt-8  text-red-700/80 text-[12px] font-semibold  rounded hover:text-red-600 hover:scale-102 cursor-pointer"
              >
                Remove Book From Library
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    deleteBook();
                    setConfirmDeleteBook(false);
                  }}
                  className="px-3 py-1 bg-red-700 text-white rounded-full hover:bg-red-800 text-sm cursor-pointer"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setConfirmDeleteBook(false)}
                  className="px-3 py-1 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 text-sm cursor-pointer"
                >
                  Keep Book
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
