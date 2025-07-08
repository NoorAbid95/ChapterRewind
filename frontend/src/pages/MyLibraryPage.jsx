import MyLibraryHero from "../components/MyLibraryHero";
import { useState, useEffect } from "react";
import axios from "axios";

const MyLibraryPage = () => {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/books/mylibrary",
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
    fetchLibrary();
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <MyLibraryHero />
      </div>

      <div className="relative z-10 px-4 py-10 mt-10">
        <div className="flex justify-center">
          <div className="w-full max-w-6xl bg-black/30 rounded-3xl p-8 backdrop-blur-sm">
            <div className="w-full flex p-2 gap-x-15 justify-between">
              {library.map((book) => (
                <img
                  key={book._id}
                  src={book.coverUrl}
                  alt={`${book.title} cover`}
                  className="h-35 w-28 rounded-sm"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLibraryPage;
