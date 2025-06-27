import { useNavigate, Link } from "react-router-dom";
import { useSummary } from "../context/SummaryCotext";
import VideoCarousel from "../components/VideoCarousel";
import BowAnimation from "../components/BowAnimation";
import SearchHeroSection from "../components/SearchHeroSection";
import { useEffect } from "react";

const SearchPage = ({ setFadeNavItems }) => {
  const navigate = useNavigate();
  const { summary, videos, formData, setSummary, setVideos, setFormData } =
    useSummary();

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

    // Initialize state on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setFadeNavItems]);

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
          <div className="w-full max-w-6xl bg-black/30 rounded-3xl p-8 backdrop-blur-sm">
            <div className="p-8">
              {(summary || videos.length > 0) && (
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
                  <div id="return" className="flex flex-col  items-center mt-6">
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
