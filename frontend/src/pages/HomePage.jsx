import React, { useState } from "react";
import axios from "axios";
import loadingGif from "../assets/book-flip.gif";
import rewindSVG from "../assets/rewind.svg";

function toPascalCase(str) {
  return str
    .split(/[\s_-]+/)
    .map((word) => {
      if (word.length === 0) return "";
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

const HomePage = () => {
  const [formData, setFormData] = useState({ title: "", author: "" });
  const [summary, setSummary] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const [summaryRes, videoRes] = await Promise.all([
        axios.post("http://localhost:3000/api/books/openai-summary", formData),
        axios.post("http://localhost:3000/api/books/youtube-recaps", formData),
      ]);

      setSummary(summaryRes.data.summary);
      setVideos(videoRes.data.data);
    } catch (error) {
      console.log("Error fetching data", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen py-10 transition-all duration-700  ">
        <div
          className={`flex flex-col items-center justify-start gap-10 w-1/3 px-8 py-8 rounded-3xl transition-all duration-700 bg-black/10 ${
            summary || videos.length > 0 ? "h-auto" : "h-[100px]"
          }`}
        >
          <form onSubmit={handleSearch}>
            {!(summary || videos.length > 0) && (
              <div className="flex flex-row item-center gap-4">
                <label htmlFor="book-title" className="sr-only">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Book Title"
                  id="book-title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className=" text-center bg-gray-50/20 rounded-full focus:outline-0 text-black/70"
                />
                <label htmlFor="book-author" className="sr-only">
                  Author
                </label>
                <input
                  type="text"
                  placeholder="Book Author"
                  id="book-author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="text-center bg-gray-50/20 rounded-full focus:outline-0 "
                />
                <button>
                  {loading ? (
                    <img
                      src={loadingGif}
                      alt="loading"
                      className="w-10 h-10 flex items-center"
                    />
                  ) : (
                    <img
                      src={rewindSVG}
                      alt="search"
                      className="w-8 h-8 flex items-center"
                    />
                  )}
                </button>
              </div>
            )}
          </form>

          {summary && (
            <div className="text-white">
              <a href="/"><img src={rewindSVG} alt="search" className="w-8 h-8" /></a>
              <h2 className="text-amber-100 mb-3 font-bold">
                Rewind: {toPascalCase(formData.title)}
              </h2>
              <p className="text-white text-lg/8 font-extralight">
                {summary}
                </p>
            </div>
          )}

          {videos.length > 0 && (
            <div className="text-white w-full">
              <h2 className="text-amber-100 mb-3 font-bold"></h2>
              <ul>
                {videos.map((video) => (
                  <div className="mb-4" key={video.id.videoId}>
                    <iframe
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${video.id.videoId}`}
                      title={video.snippet.title}
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg border border-purple-300/20 shadow-md shadow-purple-500/50"
                    ></iframe>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

//TODO: When you click into the input field, it highlights blue and white. How to stop this
