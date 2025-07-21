import MyLibraryHero from "../components/HeroSections/MyLibraryHero.jsx";
import BookDetailModal from "../components/Book/BookDetailModal.jsx";
import { useState, useEffect } from "react";
import castleHome from "../assets/castle-home.svg";
import axios from "../utils/axios.js";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore.js";

const MyLibraryPage = () => {
  const [library, setLibrary] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const navigate = useNavigate();
  const noBooks = library.length === 0;

  const fetchLibrary = async () => {
    try {
      const response = await axios.get(
        "/books/mylibrary",
        {
          withCredentials: true,
        }
      );
      setLibrary(response.data.data);
      console.log("Library Response", response.data);
    } catch (error) {
      console.error("Error fetching library:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLibrary();
    }
  }, [isAuthenticated]);

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <MyLibraryHero />
      </div>

      <div className="relative z-10 px-4 py-10 mt-10">
        <div className="flex justify-center">
          <div className="w-auto max-w-6xl  bg-linear-to-b from-[#521A15]/30 to-[#741C27]/30 rounded-3xl p-8 backdrop-blur-sm">
            {!isAuthenticated ? (
              <div className="text-center text-white space-y-4 h-auto">
                <p className="text-xl font-medium">
                  <Link
                    to={"/signup"}
                    className="underline hover:text-gray-300"
                  >
                    Create an account
                  </Link>{" "}
                  or{" "}
                  <Link to={"/login"} className="underline hover:text-gray-300">
                    {" "}
                    login
                  </Link>{" "}
                  to save books to your library!
                </p>
                <div className="mt-8">
                  <Link to={"/"}>
                    <span className="text-xs font-extralight">HOME</span>
                    <img
                      src={castleHome}
                      alt="Home button"
                      title="Homepage"
                      className="w-10 h-10 mx-auto opacity-80 hover:opacity-70 hover:scale-103 active:scale-97 transition  cursor-pointer  "
                    />
                  </Link>
                </div>
              </div>
            ) : noBooks ? (
              <div className="text-center text-white py-10">
                <p className="text-2xl font-semibold">
                  No books saved to your library yet.
                </p>
                <div className="mt-8 hover:underline">
                  <Link to="/" className="text-sm">
                    Search a book and add it to your library.
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="max-h-[500px] px-2 ">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
                    {library.map((book) => (
                      <img
                        key={book._id}
                        src={book.coverUrl}
                        alt={`${book.title} cover`}
                        className="h-37 w-30 rounded-sm cursor-pointer hover:scale-103 active:scale-97 shadow shadow-black"
                        onClick={() => setSelectedBook(book)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center mt-50">
                  <Link to={"/"}>
                    <span className="text-xs text-white font-extralight mb-1 ml-1">HOME</span>
                    <img
                      src={castleHome}
                      alt="Home button"
                      title="Homepage"
                      className="w-10 h-10 mx-auto opacity-80 hover:opacity-70 hover:scale-103 active:scale-97 transition  cursor-pointer  "
                    />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* {Modal Section} */}
      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          isOpen={true}
          onClose={() => setSelectedBook(null)}
          onUpdateLibrary={fetchLibrary}
        />
      )}
    </div>
  );
};

export default MyLibraryPage;
