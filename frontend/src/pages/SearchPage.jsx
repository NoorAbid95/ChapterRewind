import { useNavigate, Link } from "react-router-dom";
import useSummaryStore from "../store/useSummaryStore";
import VideoCarousel from "../components/VideoCarousel";
import BowAnimation from "../components/BowAnimation";
import SearchHeroSection from "../components/SearchHeroSection";
import { useEffect } from "react";
import { sendError } from "../../../backend/src/utils/sendResponse";
import axios from "axios";
import useAuthStore from "../store/useAuthStore.js";

const SearchPage = ({ setFadeNavItems }) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const { summary, setSummary, videos, setVideos, formData, setFormData } =
    useSummaryStore();

  const noSearchData =
    (!summary || summary.length == 0) && (!videos || videos.length == 0);

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
    const handleScroll = () => {
      setFadeNavItems(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setFadeNavItems]);

  const handleAddToLibrary = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/books/mylibrary",
        {
          title: formData.title,
          author: formData.author,
          summary,
          videos,
        },
        { withCredentials: true }
      );
      console.log("Added to lib");
    } catch (error) {
      console.log("Error sending to library", error.message);
      sendError(res);
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/");
      setTimeout(() => {
        setSummary("");
        setVideos([]);
        setFormData({ title: "", author: "" });
      }, 100);
    }, 300);
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <SearchHeroSection />
      </div>

      <div className="relative z-10 px-4 py-10 mt-10">
        <div className="flex justify-center">
          <div className="w-auto max-w-6xl bg-black/30 rounded-3xl p-8 backdrop-blur-sm">
            <div className="p-8">
              {noSearchData ? (
                <div className="text-white text-center">
                  <p className="text-4xl mb-6">Nothing to recap just yet.</p>
                  <p className="text-xs text-gray-400">
                    Go back to home page to search for a book.
                  </p>
                  <div className="flex justify-center">
                    <div
                      id="return"
                      className="flex flex-col  items-center mt-20"
                    >
                      <span className="text-xs font-extralight">HOME</span>

                      <Link
                        to="/"
                        title="Homepage"
                        onClick={handleHomeClick}
                        className=" w-[70px] h-[70px] cursor-pointer flex flex-row justify-center bg-[#F3E9D2]  rounded-full  hover:shadow-md transition mt-1"
                      >
                        <BowAnimation />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-8 mt-10 w-full max-w-6xl">
                  {summary && (
                    <div className="text-white">
                      <h2 className="text-amber-100 mb-3 font-bold">
                        Rewind: {toPascalCase(formData.title)}
                      </h2>
                      <p className="text-white text-lg/8 font-extralight">
                        {summary}
                      </p>
                    </div>
                  )}

                  {videos.length > 0 && (
                    <div className="text-white w-full flex justify-center mt-8">
                      <VideoCarousel videos={videos} />
                    </div>
                  )}
                  {isAuthenticated && (
                    <div className="flex justify-center items-center">
                      <button
                        className="px-6 py-2 bg-[#F3E9D2]/90 text-[#46281E] font-medium rounded-full 
             shadow-md shadow-[#3B3648]/30 border border-[#BC7647]/40 
             hover:bg-[#FAF4E7] hover:shadow-lg hover:scale-105 
             active:scale-95 transition-all duration-200 cursor-pointer"
                        onClick={handleAddToLibrary}
                      >
                        ✧ Add to My Library ✧
                      </button>
                    </div>
                  )}

                  <div id="return" className="flex flex-col  items-center mt-6">
                    <span className="text-xs  text-white mb-1 font-extralight">HOME</span>
                    <Link
                      to="/"
                      title="Homepage"
                      onClick={handleHomeClick}
                      className=" w-[70px] h-[70px] cursor-pointer flex flex-row justify-center bg-[#F3E9D2]  rounded-full  hover:shadow-md transition"
                    >
                      <BowAnimation />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
