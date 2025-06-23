import React, { useState } from "react";
import axios from "axios";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { useSummary } from "../context/SummaryCotext";
import HeroSectionOne from "../components/HomeHeroSectionOne";
import Navbar from "../components/Navbar";
import HeroSectionTwo from "../components/HomeHeroSectionTwo";

const HomePage = () => {
  const navigate = useNavigate();

  const { summary, setSummary, videos, setVideos, formData, setFormData } =
    useSummary();
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

      navigate("/search");
    } catch (error) {
      console.log("Error fetching data", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <HeroSectionOne />
      <div
        id="separator"
        className="h-[10px] bg-[#585059]/70 flex justify-center items-center z-50"
      />
      <div className="snap-start h-screen relative">
        <HeroSectionTwo />

        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="w-full max-w-2xl flex flex-row items-center justify-center gap-10 px-8 py-8 rounded-3xl bg-black/10 transition-all duration-700">
            <form onSubmit={handleSearch}>
              {!(summary || videos.length > 0) && (
                <div className="flex flex-wrap items-center justify-center gap-4 w-full">
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
                    className="w-[140px] sm:w-[160px] text-center bg-gray-50/20 rounded-full focus:outline-0 text-black/70 px-4"
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
                    className="w-[140px] sm:w-[160px] text-center bg-gray-50/20 rounded-full focus:outline-0 text-black/70"
                  />
                  <div className="flex h-14 w-14 items-center justify-center">
                    <button className="w-full h-full">
                      {loading ? (
                        <img
                          src="/assets/book-flip.gif"
                          alt="loading"
                          className="w-full h-full"
                        />
                      ) : (
                        <img
                          src="/assets/book-flip.png"
                          alt="search"
                          className="w-full h-full"
                        />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
