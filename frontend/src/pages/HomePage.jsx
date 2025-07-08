import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSummaryStore from "../store/useSummaryStore";
import { motion } from "framer-motion";
import LoadingAnimation from "../components/LoadingAnimation";
import HeroSectionOne from "../components/HomeHeroSectionOne";
import HeroSectionTwo from "../components/HomeHeroSectionTwo";

const HomePage = ({ setFadeNavItems }) => {
  const navigate = useNavigate();

  const { summary, setSummary, videos, setVideos, formData, setFormData } =
    useSummaryStore();

  const [loading, setLoading] = useState(false);

  const [animationKey, setAnimationKey] = useState(0);
  const containerRef = useRef(null);

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

      setSummary(summaryRes.data.data.summary);
      setVideos(videoRes.data.data);

      navigate("/search");
    } catch (error) {
      console.log("Error fetching data", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0.5;
        setAnimationKey((prev) => prev + 1);
        setFadeNavItems(isVisible);
      },
      {
        threshold: 0.5,
      }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setFormData({ title: "", author: "" });
  }, []);

  return (
    <div
      id="scroll-container"
      className=" h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      <div className="h-screen snap-start">
        <HeroSectionOne />
      </div>

      <div
        id="separator"
        className="h-[10px] bg-gradient-to-r from-[#C69161]/65  via-[#C69161]/80 to-[#444450]/90 backdrop-blur-xs  flex justify-center items-center z-50"
      />
      <div className="h-screen relative snap-start" id="hero-two">
        <HeroSectionTwo />

        <div
          className="absolute inset-0 flex items-center justify-center z-30"
          style={{ transform: "rotateX(25deg)", transformStyle: "preserve-3d" }}
          ref={containerRef}
        >
          <motion.div
            key={animationKey}
            className="w-[450px] md:w-[470px]  py-6 px-6 sm:px-10 mt-6 sm:mt-10 rounded-xl mb-30
            bg-gradient-to-r from-[#5d5d5d]/40 to-[#FFFFE4]/40 
            shadow-xs shadow-[#FAF4E7]/50 backdrop-blur-sm
            flex flex-col items-center gap-4 transition-all duration-700 "
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            <p className="text-white font-semibold text-center py-4 mb-9">
              Search the Book Title You Want to Recap
            </p>

            <form
              onSubmit={handleSearch}
              className="flex flex-col items-center gap-4 w-full"
            >
              <div className="flex gap-4">
                <input
                  id="title"
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="bg-transparent placeholder-white text-white border-b border-white/40 
                  focus:outline-none text-center text-md w-[140px]"
                />
                <input
                  id="author"
                  type="text"
                  placeholder="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="bg-transparent placeholder-white text-white border-b border-white/40 
                  focus:outline-none text-md text-center w-[140px]"
                />
              </div>

              <div className="flex flex-col items-center mt-12">
                <button
                  type="submit"
                  title="Search"
                  className="flex flex-col items-center justify-center border-none focus:outline-none rounded-full bg-[#FDFDF6]/90
                   hover:scale-102 active:scale-95 shadow-md shadow-[#3B3648] cursor-pointer w-[70px] h-[70px] "
                >
                  <span className="text-black/70 mt-[12px] text-[10px] leading-none">
                    SEARCH
                  </span>
                  <LoadingAnimation playing={loading} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
