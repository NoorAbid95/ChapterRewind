import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSummary } from "../context/SummaryCotext";
import VideoCarousel from "../components/VideoCarousel";
import BowAnimation from "../components/BowAnimation";

const SearchPage = () => {
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

  const handleHomeClick = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/");
      setTimeout(() => {
        setSummary("");
        setVideos([]);
        setFormData({ title: "", author: "" });
      }, 100);
    }, 300); // Duration of  bow animation
  };

  return (
    <div className="flex  justify-center min-h-screen py-10 transition-all duration-700 ">
      <div className="h-70% w-auto flex flex-row items-center justify-center px-8 py-2 rounded-3xl bg-black/10 transition-all duration-700">
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
              <div className="text-white w-full flex justify-center mt-8  ">
                <VideoCarousel videos={videos} />
              </div>
            )}

            <Link
              to="/"
              onClick={handleHomeClick}
              className="cursor-pointer flex flex-row justify-center"
            >
              <BowAnimation />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

//Todo: I dont think the div from the homepage came with the search.
